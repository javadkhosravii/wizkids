import AllWizKids from "@/components/pages/home/AllWizKids";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container">
      <div className="prose mb-4">
        <h1>Wizkids</h1>
        <Button size="sm">
          Add new Wizkid
        </Button>
        <p>
          This is a page that displays a list of Wizkids. Each Wizkid has a
          name, email, role, profile picture, and phone number.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AllWizKids />
      </Suspense>
    </div>
  );
}
