import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "This page does not exist or has been moved",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "This page does not exist or has been moved",
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

export default function DefaultNotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
