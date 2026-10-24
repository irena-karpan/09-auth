"use client";

import { useState } from "react";
import css from "./SignUpPage.module.css";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

export default function SingUp() {
  const [error, setError] = useState("");
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const formValues = Object.fromEntries(
      formData,
    ) as unknown as RegisterRequest;

    try {
      const response = await register(formValues);

      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as AxiosError<{ error: string }>).response?.data?.error ??
          (error as AxiosError<{ error: string }>).message ??
          "Ooops... Something went wrong",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
