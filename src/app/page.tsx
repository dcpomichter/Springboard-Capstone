import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start" style={{ background: "var(--gradient-bottom)" }}>
        <h1 className="text-black justify-center items-center felx flex-col align-center text-4xl" style={{ color: "var(--board-light-blue)" }}>Welcome to Board Bums</h1>
        <Image
          className="dark"
          src="/Board_Bums_logo.png"
          alt="Board Bums logo"
          width={1000}
          height={200}
          priority
        />
      </main>
    </div>
  );
}
