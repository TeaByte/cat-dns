"use client";

import Form from "@/components/main/form-section";
import UserDomains from "@/components/main/user-domains";
import { useSubDomain } from "@/components/context/context";
import { useEffect } from "react";

interface signInHeroProps {
  subdomains: {
    id: string;
    subdomain: string;
    record: string;
    content: string;
    ownerId: string;
  }[];
}
export default function SignInHero({ subdomains }: signInHeroProps) {
  const { addSubdomains } = useSubDomain();
  useEffect(() => {
    addSubdomains(subdomains);
  }, []);

  return (
    <>
      <section>
        <h1 className="px-2 w-fit">Add New sub domain</h1>
        <Form />
      </section>
      <section>
        <UserDomains subdomainsData={subdomains} />
      </section>
    </>
  );
}
