/**
 * Breadcrumb pour le suivi du chemin d'invoice
 */

import { clsx } from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

// Types du "Breadcrumb"
interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

// La fonction prends en paramètres le tableau de Breadcrums qu'il mappera pour afficher le suivi du chemin
export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, "flex text-xl md:text-2xl")}>
        {/* on mappe les breadcrumds disponibles */}
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {/* On affiche le trait de sépparation dynamiquement */}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
