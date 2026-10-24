import { cookies } from "next/headers";
import { nextServer } from "./api";
import { FetchNotesResponse, SessionRequest } from "./clientApi";
import { Note } from "@/types/note";

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export async function getMe() {}

export async function checkSession() {
  const cookieStore = await cookies();

  const response = await nextServer.get<SessionRequest>("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
}
