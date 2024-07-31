import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Gajone Dashboard",
    default: "Gajone Dashboard",
  },
  description:
    "Gajone build, official Nextjs Course Dashboard, build with App Router.",
  metadataBase: new URL("https://gajonedev-nextjs-learning-code.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Gajone Nextjs Learning</title>
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
