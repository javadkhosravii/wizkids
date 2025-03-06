"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/wizkidsSlice";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated =
    useSelector((state: RootState) => state.wizkids.currentUser) !== null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch login action
    dispatch(login({ email: email, password }));
  };

  const handleContinueAsGuest = () => {
    router.push("/");
  };

  return (
    <div className="min-h-[70svh] flex flex-col items-center justify-center bg-background ">
      <p className="mb-4 text-center text-sm text-muted-foreground">
        You can login with this: <br />
        email: <b> johnDoe@example.com</b>
        <br />
        password: <b>password</b>
      </p>
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg dark:border-white/20 border">
        <h1 className="text-3xl font-bold text-center text-card-foreground mb-6">
          Welcome to Wizkid Manager 2000
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 flex flex-col justify-center"
        >
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-card-foreground">
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
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
          </div>
          <Button className="mx-auto" type="submit">
            Sign in as Wizkid
          </Button>
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
