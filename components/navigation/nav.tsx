import { Separator } from "@/components/ui/separator";
import SignInButton from "./auth-buttons";

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 bg-background w-full flex flex-col gap-1 pt-1">
      <div className="flex items-center justify-between px-5 py-1">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/cat.png"
              alt="logo"
              width={68}
              height={68}
              className="rounded-lg"
            />
            catdns.in
          </div>
        </Link>
        <div className="flex items-center justify-center gap-3">
          <SignInButton />
        </div>
      </div>
      <Separator />
    </nav>
  );
}
