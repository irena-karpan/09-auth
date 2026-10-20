import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0] === "all" ? "All Tags" : slug[0];

  return {
    title: `Notes - ${tag}`,
    description: `Browse notes tagged with ${tag}. NoteHub allows you to filter and view notes based on specific tags.`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Browse notes tagged with ${tag}. NoteHub allows you to filter and view notes based on specific tags.`,
      url: `https://08-zustand-rho-vert.vercel.app/notes/filter/${slug[0] === "all" ? "all" : slug[0]}`,
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
}

interface NotesProps {
  searchParams: Promise<{ search: string; page: string }>;
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ searchParams, params }: NotesProps) {
  const { slug } = await params;

  const { search: searchQuery = "", page = "1" } = await searchParams;

  const tag = slug[0] === "all" ? undefined : slug[0];

  const currentPage = Number(page);

  const queryClient = new QueryClient();

  // const searchQuery = "";
  // const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
