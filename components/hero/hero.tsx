import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className="bg-secondary rounded-lg flex justify-between md:items-center gap-10 p-8">
        <div className="flex flex-col gap-2">
          <p className="opacity-80">SignIn to start using Cat DNS</p>
          Cat DNS: Your Purr-fect Dynamic DNS Solution Cat DNS is your
          feline-friendly, free dynamic DNS service that brings simplicity and
          convenience to managing your changing IP addresses. Just like a cat
          always finds its way home, Cat DNS ensures that your devices and
          services are easily accessible no matter where you roam.
          <a
            href="https://github.com/TeaByte/catdns"
            className="opacity-50 hover:underline"
            target="_blank"
          >
            Support us by giving us a ⭐ on GitHub
          </a>
        </div>

        <Image
          src="/cat.png"
          alt="logo"
          width={170}
          height={170}
          className="rounded-lg hidden md:block"
        />
      </div>
    </section>
  );
}
