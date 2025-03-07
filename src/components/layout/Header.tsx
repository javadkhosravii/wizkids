"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeToggler";
import { Button } from "@/components/ui/button";
import UserType from "@/app/userType";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/wizkidsSlice";
import { RootState } from "@/redux/store";

export default function Header() {
  const user = useSelector((state: RootState) => state.wizkids.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full bg-background h-[var(--header-height)] fixed top-0 z-50">
      <nav className="container flex justify-between h-full">
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-6">
          <UserType />
          {user ? (
            <Button onClick={handleLogout} variant="outline">
              Log out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
