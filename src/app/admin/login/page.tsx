"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") || "");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (!response.ok) {
      const body = await response.json();
      setError(body.error || "Unable to sign in.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  };

  return <main className="admin-login"><form onSubmit={submit}><p>// PRIVATE ACCESS</p><h1>Admin sign in.</h1><label>Password<input name="password" type="password" required autoFocus /></label>{error && <span className="admin-login-error">{error}</span>}<button>Enter dashboard</button></form></main>;
}