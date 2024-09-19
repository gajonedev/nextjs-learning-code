/**
 * Barre de recherche dynamique des invoices
 * !Client Component
 */

"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  // Logique pour effectuer les recherches dynamiquement lors de la saisie de la requête

  // On récupère les paramètres de recherche actuels dans l'URL
  const searchParams = useSearchParams();
  // On récupère l'adresse URL actuelle
  const pathname = usePathname();
  // On selectionne la methode "replace" de useRouter() pour changer l'URL dynamiquement
  const { replace } = useRouter();

  // Logique pour changer l'URL dynamiquement et effectuer les recherches 
  const handleSearch = useDebouncedCallback((input: string) => {
    const params = new URLSearchParams(searchParams);

    // On initie le paramètre "page" à "1"
    params.set("page", "1");

    if (input) {
      // Si le champ de saisie n'est pas vide, modifier le paramètre "query" à la valeur du champ de saise
      params.set("query", input);
    } else {
      // Sinon, supprimer le paramètre "query"
      params.delete("query");
    }

    // Changer l'adresse de l'URL actuelle par la nouvelle URL de recherche dynamiquement généré
    replace(`${pathname}?${params.toString()}`);
  }, 600);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
