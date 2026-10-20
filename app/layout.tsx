import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import React from "react";

const roboto = Roboto({
  variable: "--roboto-font",
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and efficient app for creating and organizing your notes",
  openGraph: {
    title: "NoteHub",
    description:
      "A simple and efficient app for creating and organizing your notes",
    url: "https://08-zustand-rho-vert.vercel.app/",
    siteName: "NoteHub",
    type: "article",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "NoteHub - A simple and efficient app for creating and organizing your notes",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
