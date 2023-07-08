import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, useUser, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const user = useUser();
  console.log(user);

  return (
    <>
      <Head>
        <title>T3 Marketplace</title>
        <meta name="description" content="T3 Marketplace to learn new skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {user.isSignedIn ? (
          <SignOutButton>
            <button className="btn text-white">Sign out</button>
          </SignOutButton>
        ) : (
          <SignInButton mode="modal">
            <button className="btn text-white">Sign in</button>
          </SignInButton>
        )}
      </main>
    </>
  );
}
