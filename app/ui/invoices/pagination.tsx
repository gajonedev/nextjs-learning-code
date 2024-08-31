/**
 * Système de pagination de l'affichage filtré des invoices
 * !Client Component
 */

"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  // On récupère l'adresse de l'URL actuelle
  const pathname = usePathname();
  // On récupère les paramètres de recherche actuelles
  const searchParams = useSearchParams();
  // On définit la page de pagination courante
  const currentPage = Number(searchParams.get("page")) || 1;

  // On créé l'URL d'affichage de la page courante
  const createPageURL = (pageNumber: number | string) => {
    // On instancie un nouvel URLSearchParams
    const params = new URLSearchParams(searchParams);
    // On modifie la page de recherche par URL à la page courante
    params.set("page", pageNumber.toString());

    // On retourne l'expression d'URL courante mise à jour
    return `${pathname}?${params.toString()}`;
  };

  // On récupère toutes la pagination dynamiquement généréé
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="inline-flex">
        {/* Flèche de direction de la pagination */}
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        {/* Affichage des nombres de la pagination */}
        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            // Les positions possibles du nombre de la pagination
            let position: "first" | "last" | "single" | "middle" | undefined;

            // Logique pour modifier dynamiquement la popsition
            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            // On retourne le JSX pour afficher le nombre
            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        {/* Flèche de direction de la pagination */}
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

// Fonction pour gérer dynamiquement la positio du nombre de la pagination
function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  // Styles dynamiques pour le nombre
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  // On retourne dynamiquement le nombre sous forme de lien ou de texte
  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

// Composant de la flèche de direction de la pagination
function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  // Styles dynamiques de la flèche
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  // Icône pour afficher la flèche conditionnellement
  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  // On retourne la flèche dynamiquement sous forme de lien ou de texte
  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
