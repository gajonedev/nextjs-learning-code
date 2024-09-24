"use client";

import { useActionState } from "react";
import { register, RegistrationType } from "@/app/lib/actions";
import { lusitana } from "@/app/ui/fonts";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { Loader } from "@/app/ui/components/Loader";

const RegisteringForm = () => {
  const initialState: RegistrationType = { message: null, errors: {} };
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    initialState
  );

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pt-8">
        <h1 className={`${lusitana}`}>Create your account</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {/* Affichage d'erreur de soumission du formulaire au niveau du CustomerId si disponible */}
              {errorMessage.errors?.username &&
                errorMessage.errors.username.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {/* Affichage d'erreur de soumission du formulaire au niveau du CustomerId si disponible */}
              {errorMessage.errors?.email &&
                errorMessage.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {/* Affichage d'erreur de soumission du formulaire au niveau du CustomerId si disponible */}
              {errorMessage.errors?.password &&
                errorMessage.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <Button
          className={`mt-4 w-full ${
            isPending && "cursor-not-allowed pointer-events-none"
          }`}
        >
          {!isPending ? (
            <>
              Register{" "}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </>
          ) : (
            <div className="flex gap-6">
              <Loader />
              <span>Registering...</span>
            </div>
          )}
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage?.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisteringForm;
