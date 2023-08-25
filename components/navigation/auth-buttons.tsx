"use client";

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import { useEffect, useState } from "react";

export default function SignInButton() {
  const [providers, setProviders] = useState<any>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (status === "loading") {
    <Button type="button">Loading...</Button>;
  }

  if (status === "authenticated") {
    return (
      <Button type="button" onClick={() => signOut()}>
        Sign out ( {session.user?.name} )
      </Button>
    );
  }

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <Button
            type="button"
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
          >
            Sign in
          </Button>
        ))}
    </div>
  );
}
