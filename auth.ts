/**
 * Contient toute la logique d'authentification, de connexion et de déconnection d'utilisateur avec NextAuth
 */

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"

// Fonction pour récupérer l'utilisateur dans la base de données
async function getUser(email: string): Promise<User | undefined> {
  try {
    // On requête la base de données
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    // En cas de resultats, on retourne le resultat
    return user.rows[0];
  } catch (error) {
    // En cas d'erreur ....
    console.log("Failed to fecth user : ", error);
    throw new Error("Failed to fecth user.");
  }
}

// On exporte les méthodes d'authentification, de connexion et de déconnexion d'utilisateur de NextAuth
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
