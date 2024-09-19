/**
 * Page d'affichage des commandes, avec pagination
 */ 

import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { Metadata } from "next";

// Métadonnées de la page
export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Récupération des différentes paramètres de recherche
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Récupération du nombre total de pages à afficher
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* Barre de recherche des invoices */}
        <Search placeholder="Search invoices..." />
        {/* Bouton d'ajout d'un nouveau invoice */}
        <CreateInvoice />
      </div>
      {/* Tableau d'affichage des invoices avec affichage asynchrone */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* Pagination d'affichage des invoices */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
