/**
 * Layout principal du dashboard de l'application
 */

import SideNav from "@/app/ui/dashboard/sidenav";

// Pre-rendu partiel experimental
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* Sidenav du dashboard */}
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
