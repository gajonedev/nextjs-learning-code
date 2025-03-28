import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { 
    query?: string; 
    page?: string 
  };
}) {
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);

  return (
    <section>
      <Suspense key={query} fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </section>
  );
}
