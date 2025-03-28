/**
 * Contient tout les skeletons de chargement des différents composants et pages
 */

import { PlusIcon } from "@heroicons/react/24/outline";

// Animation shimmer
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Skeleton d'un Card
export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

// Skeleton de tout les Cards
export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

// Skeleton du Chart des revenues
export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoicesPageSkeleton() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {/* Skeleton du titre */}
        <div className={`${shimmer} relative h-8 w-36 rounded-md bg-gray-100`} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* Skeleton de la barre de recherche */}
        <div className={`${shimmer} relative flex flex-1 flex-shrink-0 h-10 rounded-md bg-gray-100`} />
        {/* Skeleton du bouton Create Invoice */}
        <div className={`${shimmer} relative h-10 rounded-md bg-gray-100 px-4`}>
          <div className="invisible flex">
            <span className="">Create Invoice</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </div>
        </div>
      </div>

      {/* Skeleton du tableau des invoices */}
      <InvoicesTableSkeleton />

      {/* Skeleton de la pagination */}
      <InvoicesPaginationSkeleton />
    </div>
  );
}

export function InvoicesPaginationSkeleton() {
  return (
    <div className="mt-5 flex relative justify-center">
      <div className={`${shimmer} relative h-10 w-72 rounded-md bg-gray-100`} />
    </div>
  )
}

// Skeleton d'un invoice
export function InvoiceSkeleton() {
  return (
    <div className={`${shimmer} relative flex flex-row items-center justify-between border-b border-gray-100 py-4`}>
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

// Skeleton des derniers invoices
export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// Skeleton du dashboard
export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

// Skeleton du tableau d'affichage des customers
export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className={`${shimmer} relative h-8 w-8 rounded-full bg-gray-100`} />
          <div className={`${shimmer} relative h-6 w-24 rounded bg-gray-100`} />
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`${shimmer} relative h-6 w-32 rounded bg-gray-100`} />
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-100`} />
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-100`} />
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-100`} />
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className={`${shimmer} relative h-[38px] w-[38px] rounded bg-gray-100`} />
          <div className={`${shimmer} relative h-[38px] w-[38px] rounded bg-gray-100`} />
        </div>
      </td>
    </tr>
  );
}

// Skeleton des invoices sur Mobile
export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className={`${shimmer} relative mr-2 h-8 w-8 rounded-full bg-gray-100`} />
          <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-100`} />
        </div>
        <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-100`} />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-100`} />
          <div className={`${shimmer} relative mt-2 h-6 w-24 rounded bg-gray-100`} />
        </div>
        <div className="flex justify-end gap-2">
          <div className={`${shimmer} relative h-10 w-10 rounded bg-gray-100`} />
          <div className={`${shimmer} relative h-10 w-10 rounded bg-gray-100`} />
        </div>
      </div>
    </div>
  );
}

// Skeleton du tableau des invoices
export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="relative rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export function CustomerMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <div className="flex items-center gap-3">
              <div className={`${shimmer} relative h-8 w-8 rounded-full bg-gray-100`} />
              <div className={`${shimmer} relative h-5 w-24 rounded-md bg-gray-100`} />
            </div>
          </div>
          <div className={`${shimmer} relative h-4 w-32 rounded-md bg-gray-100`} />
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b py-5">
        <div className="flex w-1/2 flex-col">
          <div className={`${shimmer} relative h-4 w-10 rounded-md bg-gray-100`} />
          <div className={`${shimmer} relative mt-1 h-5 w-16 rounded-md bg-gray-100`} />
        </div>
        <div className="flex w-1/2 flex-col">
          <div className={`${shimmer} relative h-4 w-10 rounded-md bg-gray-100`} />
          <div className={`${shimmer} relative mt-1 h-5 w-16 rounded-md bg-gray-100`} />
        </div>
      </div>
      <div className="pt-4">
        <div className={`${shimmer} relative h-5 w-24 rounded-md bg-gray-100`} />
      </div>
    </div>
  );
}

// Skeleton pour une ligne du tableau des clients
export function CustomerRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm">
        <div className="flex items-center gap-3">
          <div className={`${shimmer} relative h-8 w-8 rounded-full bg-gray-100`} />
          <div className={`${shimmer} relative h-5 w-24 rounded-md bg-gray-100`} />
        </div>
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <div className={`${shimmer} relative h-5 w-32 rounded-md bg-gray-100`} />
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <div className={`${shimmer} relative h-5 w-10 rounded-md bg-gray-100`} />
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <div className={`${shimmer} relative h-5 w-16 rounded-md bg-gray-100`} />
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <div className={`${shimmer} relative h-5 w-16 rounded-md bg-gray-100`} />
      </td>
    </tr>
  );
}

// Skeleton de la table des clients
export function CustomersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              <CustomerMobileSkeleton />
              <CustomerMobileSkeleton />
              <CustomerMobileSkeleton />
              <CustomerMobileSkeleton />
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Invoices
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Pending
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total Paid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-900">
                <CustomerRowSkeleton />
                <CustomerRowSkeleton />
                <CustomerRowSkeleton />
                <CustomerRowSkeleton />
                <CustomerRowSkeleton />
                <CustomerRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton complet de la page des clients
export function CustomersPageSkeleton() {
  return (
    <div className="w-full">
      <div className={`${shimmer} relative mb-8 h-8 w-36 rounded-md bg-gray-100`} />
      <div className={`${shimmer} relative flex flex-1 h-10 rounded-md bg-gray-100`} />
      <CustomersTableSkeleton />
    </div>
  );
}