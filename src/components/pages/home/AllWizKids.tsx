"use client";

// import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import WizkidComponent from "./Wizkid";

export default function HomePage() {
  const wizkids = useSelector((state: RootState) => state.wizkids.list);

  return (
      <div
        suppressHydrationWarning
        className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
      >
        {wizkids.map((wizkid) => (
          <WizkidComponent
            key={wizkid.email}
            wizkid={wizkid}
          />
        ))}
      </div>
  );
}
