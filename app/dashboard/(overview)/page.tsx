/**
 * Affichage de la page principale (home) du dashboard
 */

import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";

// Les métadonnées de la page
export const metadata: Metadata = {
  title: "Home",
}

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Les cards de revenus totaux avec affichage asynchrone */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Graphe de revenue avec affichae asynchrone */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* Dernières commandes avec affichage asynchrone */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
