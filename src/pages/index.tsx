import Head from "next/head";
// import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>T3 Marketplace</title>
        <meta name="description" content="T3 Marketplace to learn new skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800"></main>
    </>
  );
}
