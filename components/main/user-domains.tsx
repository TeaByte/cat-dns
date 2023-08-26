"use client";

import SubDomain from "@/components/main/domains-section";
import { useSubDomain } from "@/components/context/context";

interface UserDomainsProps {
  subdomainsData: {
    id: string;
    subdomain: string;
    record: string;
    content: string;
    ownerId: string;
  }[];
}

export default function UserDomains({ subdomainsData }: UserDomainsProps) {
  const { subdomains } = useSubDomain();

  return (
    <>
      <h1 className="p-2 w-fit">Domains ({subdomains.length}/3)</h1>
      <div className="bg-secondary rounded-lg flex flex-col md:items-center gap-10 p-8">
        {!!subdomains.length
          ? subdomains.map((subdomain) => (
              <SubDomain
                key={subdomain.id}
                content={subdomain.content}
                subdomain={subdomain.subdomain}
                record={subdomain.record}
                id={subdomain.id}
              />
            ))
          : "You Don't Have Any Subdomains!"}
      </div>
    </>
  );
}
