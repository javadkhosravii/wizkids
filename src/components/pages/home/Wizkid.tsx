import type { Wizkid } from "@/@types/wizkids.type";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface IProps {
  wizkid: Wizkid;
}

export default function WizkidComponent(props: IProps) {
  const { wizkid } = props;
  return (
    <Card className="px-4">
      <div className="prose" key={wizkid.email}>
        <div className="flex items-center gap-2">
          <Image
            width="50"
            height="50"
            className="rounded-full !my-0"
            src={wizkid.profilePicture}
            alt={wizkid.name}
          />
          <h3 className="!m-0">{wizkid.name}</h3>
        </div>
        <p>
          <b>Email:</b> {wizkid.email}
        </p>
        <p>
          <b>Role:</b> {wizkid.role}
        </p>

        <p>
          <b>Phone Number:</b> {wizkid.phoneNumber}
        </p>
      </div>
    </Card>
  );
}
