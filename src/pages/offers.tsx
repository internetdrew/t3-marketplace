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

export default function Offers() {
  const messages = api.listings.getMessage.useQuery();

  return (
    <>
      <Head>
        <title>Offers</title>
        <meta name="description" content="T3 Marketplace to learn new skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gray-800">
        <div className="container mx-auto">
          <h1 className="my-16 text-center text-4xl font-semibold">
            Your Offers
          </h1>

          <div className="relative mx-auto w-1/2 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages?.data?.map((message) => (
                  <tr
                    key={message.id}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{message?.fromUserName}</td>
                    <td className="px-6 py-4">{message?.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
