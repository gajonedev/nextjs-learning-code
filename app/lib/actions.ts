/**
 * Contient toute la logique d'interactions entre l'utilisateur et la base de données de l'application
 * ?Server Component
 */

"use server";

import { signIn, signOut } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

// Fonction pour gérer la connexion et authentifier l'utilisateur
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // Connecter l'utilisateur avec la méthode signIn() de NextAuth
    await signIn("credentials", formData);
  } catch (error) {
    // En cas d'erreur ......
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

// Schéma pour les données du formulaire d'inscription
const RegistrationSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit conetenir aun moins 3 caractères"),
  email: z.string({}).email("Addresse email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

// Type des données de renvoie de l'inscription
export type RegistrationType = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

// Fonction pour enregistrer un utilisateur
export async function register(
  prevState: RegistrationType,
  formData: FormData
) {
  // On valide les données du formulaire avec zod
  const validatedFields = RegistrationSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Inscription échouée, les données entrées sont invalides",
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;

    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/dashboard",
    });

    return { message: "Inscription et connexion réussie" };
  } catch (error) {
    console.log(error);
    return {
      message: "Echec de l'inscription, une erreur inattendue s'est produite.",
    };
  }
}

export async function logOut() {
  await signOut();
}

// On définit le schéma du contenu du fomulaire de création ou d'édition d'invoice avec Zod
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0" }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

// Logique pour créer un nouvel invoice
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Définition du type pour le contenu du formulaire
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Fonction pour créer un nouvel invoice
export async function createInvoice(prevState: State, formData: FormData) {
  // On valide le formulaire avec zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // Si la validation du formulaire échoue, on retourne une erreur, dans le cas contraire, on continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // On reinitialise le chache de la page et on redirecte l'utilisateur
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

/* ========================================================================================== */

// Logique pour mettre à jour un invoice
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  // On valide le formulaire avec zod
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // Si la validation du formulaire échoue, on retourne une erreur, dans le cas contraire, on continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fileds. Failed to Update Invoice.",
    };
  }

  // On prepare les donées pour leur modification dans la base de données
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: "Database error: Failed to Update invoice.",
    };
  }

  // On reinitialise le chache de la page et on redirecte l'utilisateur
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// Fonction pour supprimer un invoice
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
