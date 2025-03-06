import type { Wizkid } from "@/types/wizkids.type";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface IProps {
  wizkid: Wizkid;
}

export default function WizkidComponent(props: IProps) {
  const { wizkid } = props;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Card className="px-4 dark:border-white">
      <div className="prose " key={wizkid.email}>
        <div className="flex justify-between">
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
          <Link href={`/wizkid/${wizkid.id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
        {isAuthenticated ? (
          <>
            <p>
              <b>Email:</b> {wizkid.email}
            </p>
            <p>
              <b>Phone Number:</b> {wizkid.phoneNumber}
            </p>
          </>
        ) : (
          <>
            <p>
              <b>Email:</b> Hidden
            </p>
            <p>
              <b>Phone Number:</b> Hidden
            </p>
          </>
        )}
        <p>
          <b>Role:</b> {wizkid.role}
        </p>
      </div>
    </Card>
  );
}
