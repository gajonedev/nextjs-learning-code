/**
 * Page pour créer un nouvel invoice
 */

import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";
import { Metadata } from "next";

// Métadonnées de la page
export const metadata: Metadata = {
  title: "Create Invoice",
}

export default async function Page() {
  // On récupère la liste de customers déjà disponible
  const customers = await fetchCustomers();

  return (
    <main>
      {/* Breadcrumbs pour le suivi du chemin */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      {/* Formulaire de création du nouvel invoice */}
      <Form customers={customers} />
    </main>
  );
}
