import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeToggler";
import { Button } from "@/components/ui/button";
import AuthDropdown from "@/app/AuththDropdown";

export default function Header() {
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
          <AuthDropdown />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
