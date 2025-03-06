"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated =
    useSelector((state: RootState) => state.auth.accountType) === "user";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let error = false;
    if (username !== "user") {
      setErrorUsername("Incorrect username");
      error = true;
    } else {
      setErrorUsername("");
    }
    if (password !== "user") {
      setErrorPassword("Incorrect password");
      error = true;
    } else {
      setErrorPassword("");
    }
    if (!error) {
      dispatch(login("user"));
      router.push("/");
    }
  };

  const handleContinueAsGuest = () => {
    dispatch(login("guest"));
    router.push("/");
  };

  return (
    <div className="min-h-[70svh] flex items-center justify-center bg-background ">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg dark:border-white/20 border">
        <p className="mb-4 text-center text-sm text-muted-foreground">
          You can login with this username and password: user
        </p>
        <h1 className="text-3xl font-bold text-center text-card-foreground mb-6">
          Welcome to Wizkid Manager 2000
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-card-foreground">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errorUsername && (
              <p className="mt-1 text-xs text-red-500">{errorUsername}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-card-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errorPassword && (
              <p className="mt-1 text-xs text-red-500">{errorPassword}</p>
            )}
          </div>
          <Button type="submit">Sign in as Wizkid</Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Or continue as a guest
          </p>
          <Button
            variant="outline"
            onClick={handleContinueAsGuest}
            className="mt-2"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
}
