import { Metadata } from "next";
import css from "./page.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description:
    "Quickly create a new note in NoteHub - an efficient app for organizing your thoughts and ideas",
  openGraph: {
    title: "Create New Note | NoteHub",
    description:
      "Quickly create a new note in NoteHub - an efficient app for organizing your thoughts and ideas",
    url: "https://08-zustand-rho-vert.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
