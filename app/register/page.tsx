/**
 * Page d'inscription utilisateur de l'application
 */

import AcmeLogo from "@/app/ui/acme-logo";
import RegisteringForm from "@/app/ui/registering-form";
import { Metadata } from "next";

// Métadonnées de la page
export const metadata: Metadata = {
  title: "Login",
}

// Fonction principale de la page
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        
        {/* Logo de l'application */}
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>

        {/* Formulaire de connexion */}
        <RegisteringForm />
      </div>
    </main>
  )
}