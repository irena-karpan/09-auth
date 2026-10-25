// import axios from "axios";

import { User } from "@/types/user";
import type { Note, NewNote } from "../../types/note";
import { nextServer } from "./api";

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// axios.defaults.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface SessionRequest {
  success: boolean;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(newNoteText: NewNote): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", newNoteText);
  return response.data;
}

export async function deleteNote(noteID: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${noteID}`);
  return response.data;
}

export async function register(userData: RegisterRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/register", userData);
  return response.data;
}

export async function login(userData: RegisterRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/login", userData);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  const response = await nextServer.get<SessionRequest>("/auth/session");
  return response.data.success;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}

export async function updateMe(newUsername: {
  username: string;
}): Promise<User> {
  const response = await nextServer.patch<User>("/users/me", newUsername);
  return response.data;
}
