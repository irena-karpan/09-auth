import Image from "next/image";
import css from "./Profile.module.css";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description:
    "A simple and efficient app for creating and organizing your notes",
  openGraph: {
    title: "Profile | NoteHub",
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

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
