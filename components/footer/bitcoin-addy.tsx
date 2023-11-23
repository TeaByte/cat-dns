"use client";

import { useState } from "react";

export default function BitcoinAddy() {
  const [addy, setAddy] = useState(
    "bc1qdaj3mcww8ryr3vnyy9sy83yggafl762lquz56z"
  );

  function copyAddy() {
    navigator.clipboard.writeText(addy);
  }

  return (
    <span
      onClick={copyAddy}
      title="TeaByte Bitcoin Address"
      className="hover:underline text-ellipsis overflow-hidden truncate text-sm max-w-[150px] md:max-w-[2000px]"
    >
      {addy}
    </span>
  );
}
