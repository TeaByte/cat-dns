"use client";

import Form from "@/components/main/form-section";
import UserDomains from "@/components/main/user-domains";
import { useSubDomain } from "@/components/context/context";
import { useEffect } from "react";

interface SignInHeroProps {
  subdomains: {
    id: string;
    subdomain: string;
    record: string;
    content: string;
    ownerId: string;
  }[];
}
export default function SignInHero({ subdomains }: SignInHeroProps) {
  const { addSubdomains } = useSubDomain();
  useEffect(() => {
    addSubdomains(subdomains);
  }, []);

  return (
    <>
      <section>
        <h1 className="p-2 w-fit">Add New sub domain</h1>
        <Form />
      </section>
      <section>
        <UserDomains subdomainsData={subdomains} />
      </section>
    </>
  );
}
