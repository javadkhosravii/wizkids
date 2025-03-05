"use client";

import type { Wizkid } from "@/@types/Wizkids.type";
import React, { use } from "react";
import WizkidComponent from "./Wizkid";

export default function AllWizKids() {
  const getAllWizKids = new Promise<Wizkid[]>((resolve) => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wizkids", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => resolve(data.wizkids));
  });
  const wizkids = use(getAllWizKids);

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
