// Les imports généraux du fichier
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

// Insertion des métadonnées de l'application
export const metadata: Metadata = {
  title: {
    template: "%s | Gajone Dashboard",
    default: "Gajone Dashboard",
  },
  description:
    "Gajone build, official Nextjs Course Dashboard, build with App Router.",
  metadataBase: new URL("https://gajonedev-nextjs-learning-code.vercel.app"),
};

// Mise en place du layout principal de l'application, qui ne contient que le html minimal de la page web
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
