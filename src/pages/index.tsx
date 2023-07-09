import { Listing } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export function Card({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {listing.name}
      </h2>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {listing.description}
      </p>
    </Link>
  );
}

export default function Home() {
  const listings = api.listings.list.useQuery();
  return (
    <>
      <Head>
        <title>T3 Marketplace</title>
        <meta name="description" content="T3 Marketplace to learn new skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gray-800">
        <h1 className="mx-auto my-16 text-4xl font-semibold">Items for Sale</h1>
        <div className="mx-auto grid w-3/4 grid-cols-4 gap-12">
          {listings?.data?.map((listing) => (
            <Card key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
    </>
  );
}
