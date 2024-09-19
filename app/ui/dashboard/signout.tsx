"use client";

import { logOut } from "@/app/lib/actions";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Loader } from "../components/Loader";

export default function SignOut() {
  const [state, formAction, isPending] = useActionState(logOut, undefined);

  return (
    <form action={formAction}>
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        {isPending ? <Loader /> : <PowerIcon className="w-6" />}
        <div className="hidden md:block">
          {isPending ? (
            <>
              <Loader />
            </>
          ) : (
            "Log Out"
          )}
        </div>
      </button>
    </form>
  );
}
