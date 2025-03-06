"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, usePathname } from "next/navigation";

export default function Aunthenticate() {
  const router = useRouter();
  const pathname = usePathname();
  const accountType = useSelector((state: RootState) => state.auth.accountType);
  //   prevent unauthenticated users from accessing pages other than the login page
  useEffect(() => {
    if (accountType === "notAuthenticated" && pathname !== "/login") {
      router.push("/login");
    }
  }, [accountType, pathname, router]);
  return <></>;
}
