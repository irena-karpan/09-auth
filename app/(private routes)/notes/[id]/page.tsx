import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;

  const { title, content } = await fetchNoteById(id);

  return {
    title: `${title}`,
    description: `${content}`,
    openGraph: {
      title: `${title}`,
      description: `${content}`,
      url: `https://08-zustand-rho-vert.vercel.app/notes/${id}`,
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

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  // throw new Error("Error message");

  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
