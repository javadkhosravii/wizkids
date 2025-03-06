"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeToggler";
import { Button } from "@/components/ui/button";
import UserType from "@/app/userType";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const accountType =
    useSelector((state: RootState) => state.auth.accountType) ??
    "notAuthenticated";

  if (accountType === "notAuthenticated") {
    return null;
  }

  return (
    <header className="w-full bg-background h-[var(--header-height)] fixed top-0">
      <nav className="container flex justify-between h-full">
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
          </li>
        </ul>
        <div className="flex gap-6">
          <UserType />
          <Button onClick={handleLogout} variant="outline">
            Log out
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
