"use client";

import { login, RegisterRequest } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";

export default function SingIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const formValues = Object.fromEntries(
      formData,
    ) as unknown as RegisterRequest;

    try {
      const response = await login(formValues);

      if (response) {
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as AxiosError<{ error: string }>).response?.data.error ??
          (error as AxiosError<{ error: string }>).message ??
          "Oooops... Something went wrong",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
