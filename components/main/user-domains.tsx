"use client";

import SubDomain from "@/components/main/domains-section";
import { useSubDomain } from "@/components/context/context";

interface userDomainsProps {
  subdomainsData: {
    id: string;
    subdomain: string;
    record: string;
    content: string;
    ownerId: string;
  }[];
}

export default function UserDomains({ subdomainsData }: userDomainsProps) {
  const { subdomains } = useSubDomain();

  return (
    <section className="w-full">
      <h1 className="px-2 w-fit">Domains ({subdomains.length}/3)</h1>
      <div className="bg-secondary border border-primary rounded-lg flex flex-col md:items-center gap-10 p-8">
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
          : "You Don't Have Any Subdomains Yet!"}
      </div>
    </section>
  );
}
