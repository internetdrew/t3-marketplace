import { useUser } from "@clerk/nextjs";
import { Listing } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

type Inputs = {
  message: string;
};

export default function ListingView() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const user = useUser();
  const sendMessage = api.listings.sendMessage.useMutation();

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
    return <div>Loading...</div>;
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
            {listingItem.name} - ${listingItem.price}
          </h1>
          <div className="mx-auto text-lg">
            <p>{listingItem.description}</p>
          </div>
        </div>
        {user.isSignedIn && (
          <div className="absolute bottom-10 right-20 w-1/5">
            <form
              onSubmit={handleSubmit((formData) => {
                sendMessage
                  .mutateAsync({
                    message: formData.message,
                    listingId: listingItem.id,
                  })
                  .then(() => reset());
              })}
              className="mx-auto mt-12 flex flex-col gap-4"
            >
              <div>
                <label htmlFor="message">Send a message to the seller</label>
                <textarea
                  id="message"
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Message the seller..."
                  {...register("message", { required: true })}
                  rows={5}
                />
                <button
                  type="submit"
                  className="mb-2 mr-2 mt-4 w-full rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 "
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
