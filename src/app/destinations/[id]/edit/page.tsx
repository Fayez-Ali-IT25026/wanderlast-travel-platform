import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EditDestinationForm from "./EditForm";
import type { Destination } from "@/data/destinations";

const getDestination = async (id: string): Promise<Destination> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`);
  if (!res.ok) throw new Error("Failed to load destination");
  return res.json();
};

const DestinationEditor = async ({ id }: { id: string }) => {
  const destination = await getDestination(id);
  return <EditDestinationForm destination={destination} />;
};

const EditPageSkeleton = () => (
  <div className="mx-auto w-full px-4 py-8 sm:px-6">
    <div className="mx-auto max-w-[560px]">
      <Skeleton className="h-4 w-40 bg-zinc-200" />
      <Skeleton className="mt-4 h-8 w-72 max-w-full bg-zinc-200" />
      <Skeleton className="mt-3 h-4 w-full max-w-[420px] bg-zinc-200" />

      <div className="mt-6 space-y-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-32 bg-zinc-200" />
            <Skeleton className="h-10 w-full rounded-md bg-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AwaitDestination = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <DestinationEditor id={id} />;
};

const EditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<EditPageSkeleton />}>
      <AwaitDestination params={params} />
    </Suspense>
  );
};

export default EditPage;
