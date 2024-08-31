/**
 * Page pour editer un invoice
 */

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Métadonnées de la page
export const metadata: Metadata = {
  title: "Edit Invoice",
}

// Fonction principale
export default async function Page({ params }: { params: { id: string } }) {
  // On récupère l'id du invoice concerné avec la prop native params de Nextjs
  const id = params.id;
  // On récupère l'invoice concerné et les customers disponibles dans une seule promesse
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // Si pas d'invoice, appeler la page not-found.tsx
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      {/* Breadcrumb pour le suivi du chemin */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoices",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* Formulaire d'édition pré-rempli de l'invoice */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
