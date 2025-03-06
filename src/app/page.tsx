"use client";
// import AllWizKids from "@/components/pages/home/AllWizKids";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AllWizKids = dynamic(() => import("@/components/pages/home/AllWizKids"), {
  ssr: false,
});

export default function Home() {
  const accountType =
    useSelector((state: RootState) => state.auth.accountType) ??
    "notAuthenticated";

  if (accountType === "notAuthenticated") {
    return null;
  }

  return (
    <div className="container">
      <div className="prose mb-4">
        <h1>Wizkids</h1>
        <Link
          className="bg-foreground text-background p-4 rounded-2xl no-underline
"
          href="/add-wizkid"
        >
          Add new Wizkid
        </Link>
        <p>
          This is a page that displays a list of Wizkids. Each Wizkid has a
          name, email, role, profile picture, and phone number.
        </p>
      </div>
      <AllWizKids />
    </div>
  );
}
