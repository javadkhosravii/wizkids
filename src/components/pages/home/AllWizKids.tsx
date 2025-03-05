"use client";

import type { Wizkid } from "@/@types/Wizkids.type";
import React, { useEffect } from "react";
import WizkidComponent from "./Wizkid";

export default function AllWizKids() {
  const [wizkids, setWizkids] = React.useState<Wizkid[]>([]);
  // fetch wizkids from the server in client side for simplicity
  useEffect(() => {
    fetch("/api/wizkids")
      .then((res) => res.json())
      .then((data) => setWizkids(data.wizkids));
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {wizkids.map((wizkid) => (
          <WizkidComponent key={wizkid.email} wizkid={wizkid} />
        ))}
      </div>
    </>
  );
}
