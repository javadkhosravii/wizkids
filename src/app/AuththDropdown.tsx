"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { login, logout } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function AuthDropdown() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  const handleSelectUser = () => {
    dispatch(login());
  };

  const handleSelectGuest = () => {
    dispatch(logout());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{isAuthenticated ? "User" : "Guest"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 transition-all duration-200 ease-in-out">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSelectUser}>User</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleSelectGuest}>Guest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
