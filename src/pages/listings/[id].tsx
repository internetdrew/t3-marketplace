import { Listing } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function ListingView() {
  const router = useRouter();

  const listing = api.listings.get.useQuery(
    {
      listingId: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );
  const listingItem = listing.data;

  if (!listingItem) {
    return;
  }

  return (
    <>
      <Head>
        <title>View Listing: {listingItem.name}</title>
        <meta name="description" content="T3 Marketplace to learn new skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gray-800">
        <div className="container mx-auto flex flex-col">
          <h1 className="mx-auto mb-6 mt-16 text-4xl font-semibold">
            {listingItem.name} - {listingItem.price}
          </h1>
          <div className="mx-auto text-lg">
            <p>{listingItem.description}</p>
          </div>
        </div>
      </main>
    </>
  );
}
