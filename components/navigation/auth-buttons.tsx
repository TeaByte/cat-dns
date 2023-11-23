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
    return (
      <Button type="button" className="flex gap-2 items-start justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          className="animate-spin w-5 h-5"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1.85 7.5c0-2.835 2.21-5.65 5.65-5.65 2.778 0 4.152 2.056 4.737 3.15H10.5a.5.5 0 000 1h3a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0v1.813C12.296 3.071 10.666.85 7.5.85 3.437.85.85 4.185.85 7.5c0 3.315 2.587 6.65 6.65 6.65 1.944 0 3.562-.77 4.714-1.942a6.77 6.77 0 001.428-2.167.5.5 0 10-.925-.38 5.77 5.77 0 01-1.216 1.846c-.971.99-2.336 1.643-4.001 1.643-3.44 0-5.65-2.815-5.65-5.65z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Loading</span>
      </Button>
    );
  }

  if (status === "authenticated") {
    return (
      <Button
        className="flex gap-2 items-center"
        type="button"
        onClick={() => signOut()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3 1a1 1 0 00-1 1v11a1 1 0 001 1h7.5a.5.5 0 000-1H3V2h7.5a.5.5 0 000-1H3zm9.604 3.896a.5.5 0 00-.708.708L13.293 7H6.5a.5.5 0 000 1h6.793l-1.397 1.396a.5.5 0 00.708.708l2.25-2.25a.5.5 0 000-.708l-2.25-2.25z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Sign out ( {session.user?.name} )</span>
      </Button>
    );
  }

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <Button
            type="button"
            className="flex items-center gap-2"
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5.25a7.25 7.25 0 00-2.292 14.13c.363.066.495-.158.495-.35 0-.172-.006-.628-.01-1.233-2.016.438-2.442-.972-2.442-.972-.33-.838-.805-1.06-.805-1.06-.658-.45.05-.441.05-.441.728.051 1.11.747 1.11.747.647 1.108 1.697.788 2.11.602.066-.468.254-.788.46-.969-1.61-.183-3.302-.805-3.302-3.583 0-.792.283-1.438.747-1.945-.075-.184-.324-.92.07-1.92 0 0 .61-.194 1.994.744A6.963 6.963 0 017.5 3.756 6.97 6.97 0 019.315 4c1.384-.938 1.992-.743 1.992-.743.396.998.147 1.735.072 1.919.465.507.745 1.153.745 1.945 0 2.785-1.695 3.398-3.31 3.577.26.224.492.667.492 1.343 0 .97-.009 1.751-.009 1.989 0 .194.131.42.499.349A7.25 7.25 0 007.499.25z"
                clipRule="evenodd"
              ></path>
            </svg>
            Sign in
          </Button>
        ))}
    </div>
  );
}
