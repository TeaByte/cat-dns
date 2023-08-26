import Hero from "@/components/hero/hero";
import SignInHero from "@/components/hero/signin-hero";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <Hero />;

  const subdomains = await prisma.subDomain.findMany({
    where: {
      owner: {
        email: session.user?.email,
      },
    },
  });

  return <SignInHero subdomains={subdomains} />;
}
