"use client";

import Image from "next/image";
import css from "./EditProfile.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [userName, setUserName] = useState(user?.username ?? "");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    setError("");
    const updatedUser = await updateMe({ username: userName });
    if (updatedUser) {
      setUser(updatedUser);
      router.push("/profile");
    } else {
      setError("Oooops... Something went wrong.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleCancel = () => router.push("/profile");

  return (
    user && (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} action={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className={css.input}
                value={userName}
                onChange={handleChange}
              />
            </div>

            <p>Email: {user?.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </main>
    )
  );
}
