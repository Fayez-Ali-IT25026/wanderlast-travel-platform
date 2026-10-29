import { Suspense } from "react";
import Destinations from "@/components/Destinations";
import { Skeleton } from "@/components/ui/skeleton";
import type { Destination } from "@/data/destinations";

const getDestinations = async (): Promise<Destination[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch destinations");
  return res.json();
};

const DestinationResults = async () => {
  const destinations = await getDestinations();
  return <Destinations destinations={destinations} />;
};

const CardSkeleton = () => (
  <article>
    <Skeleton className="aspect-[16/9] w-full rounded-none bg-zinc-200" />
    <Skeleton className="mt-3 h-3 w-24 bg-zinc-200" />
    <div className="mt-1 flex items-baseline justify-between gap-3">
      <Skeleton className="h-4 w-28 bg-zinc-200" />
      <Skeleton className="h-4 w-16 bg-zinc-200" />
    </div>
    <Skeleton className="mt-2 h-3 w-20 bg-zinc-200" />
    <Skeleton className="mt-3 h-3 w-24 bg-zinc-200" />
  </article>
);

const DestinationsSkeleton = () => (
  <section className="bg-white px-5 pt-28 pb-20 lg:px-16">
    <div className="mx-auto max-w-[1100px]">
      <Skeleton className="h-10 w-72 bg-zinc-200" />
      <Skeleton className="mt-4 h-4 w-80 max-w-full bg-zinc-200" />

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-10 w-full rounded-none bg-zinc-200" />
        <Skeleton className="h-10 w-full rounded-none bg-zinc-200" />
        <Skeleton className="h-10 w-full rounded-none bg-zinc-200" />
      </div>

      <Skeleton className="mt-4 h-4 w-40 bg-zinc-200" />

      <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

const DestinationsPage = () => {
  return (
    // CHANGED (2026-10-30): `mt-5` was a bare JSX attribute, which React tried to render as an
    // actual mt-5="true" DOM attribute (console warning). It belongs in className.
    <main className="relative mt-5" >
      <Suspense fallback={<DestinationsSkeleton />}>
        <DestinationResults />
      </Suspense>
    </main>
  );
};

export default DestinationsPage;
