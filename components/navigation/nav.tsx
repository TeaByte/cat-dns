import { Separator } from "@/components/ui/separator";
import SignInButton from "./auth-buttons";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 bg-background w-full flex flex-col gap-1 pt-1">
      <div className="flex items-center justify-between px-5 py-1">
        <Link href="/">
          <div className="flex items-center gap-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            DNS.nl
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
