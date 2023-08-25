import SubDomain from "@/components/main/domains-section";
import Form from "@/components/main/form-section";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <section>
        <h1 className="p-2 w-fit">Add New sub domain</h1>
        <div className="bg-secondary rounded-lg flex flex-col md:items-center gap-10 p-8">
          <h1>You Must Be Logged In</h1>
        </div>
      </section>
    );
  }

  const subdomains = await prisma.subDomain.findMany({
    where: {
      owner: {
        email: session.user?.email,
      },
    },
  });

  return (
    <>
      <section>
        <h1 className="p-2 w-fit">Add New sub domain</h1>
        <Form />
      </section>

      <section>
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
      </section>
    </>
  );
}
