"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import WizkidComponent from "./Wizkid";
import { roles } from "@/types/wizkids.type";
import { removeFiredWizkids } from "@/redux/wizkidsSlice";
import { toast } from "sonner";

export default function HomePage() {
  const dispatch = useDispatch();
  const wizkids = useSelector((state: RootState) => state.wizkids.list);
  const isAuthenticated = useSelector(
    (state: RootState) =>
      state.wizkids.currentUser && !state.wizkids.currentUser.fired
  );
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  // Dispatch the remove action when the component mounts
  useEffect(() => {
    dispatch(removeFiredWizkids());
  }, [dispatch]);

  // Optionally, dispatch the remove action periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(removeFiredWizkids());
    }, 10 * 1000); // every 10 seconds for testing
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Show toast message "Sign in to use all features" once after 20 seconds if not authenticated
  useEffect(() => {
    // Only set the timeout if the user is not authenticated.
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        toast("Sign in to use all features");
      }, 20000); // 20 seconds

      // Cleanup the timer if the component unmounts or if authentication status changes.
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const filteredWizkids = wizkids.filter((wizkid) => {
    // Filter based on search terms and role
    const matchesSearchAndRole =
      (wizkid.name.toLowerCase().includes(search.toLowerCase()) ||
        wizkid.email.toLowerCase().includes(search.toLowerCase())) &&
      (role === "" || wizkid.role === role);

    // If not authenticated, filter out fired wizkids
    if (!isAuthenticated && wizkid.fired) {
      return false;
    }
    // If not authenticated, filter out unfired wizkids
    if (!isAuthenticated && wizkid.unfired) {
      return false;
    }

    return matchesSearchAndRole;
  });

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search your Wizkid"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-[300px]"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-2 border border-gray-300 rounded"
        >
          <option value="">
            All Roles
          </option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div
        suppressHydrationWarning
        className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
      >
        {filteredWizkids.map((wizkid) => (
          <WizkidComponent key={wizkid.email} wizkid={wizkid} />
        ))}
      </div>
    </div>
  );
}
