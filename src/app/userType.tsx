"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AuthDropdown() {
  const accountType =
    useSelector((state: RootState) => state.wizkids.currentUser
      ? "user"
      : state.wizkids.currentUser === null
      ? "guest"
      : "none");

  const GetAccountTypeTitle = () => {
    if (accountType === "user") {
      return "User";
    }

    if (accountType === "guest") {
      return "Guest";
    }

    return "Not Authenticated";
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-600 max-sm:hidden">
        Logged in as:
      </span>
      <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
        {GetAccountTypeTitle()}
      </span>
    </div>
  );
}
