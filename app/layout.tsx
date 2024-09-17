import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntraNext App",
  description: "Generated by codeWithAimeric",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <NavBar />
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-gray-900 text-white mt-10 py-4">
          <div className="container mx-auto text-center">
            © 2024 IntraNext App. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
