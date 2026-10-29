import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationActions from "@/components/DestinationActions";
import BookingCard from "@/components/booking/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import gettokenfromserver from "@/lib/gettokenfromserver";




// todo : const jwrToken = await auth.api.getToken({ headers :await headers()})     xxxxxxxxx     wrong



const DestinationDetail = async ({ id }: { id: string }) => {


// const jwrToken = await auth.api.getToken({ headers :await headers()})
// console.log(jwrToken?.token)


// const token = jwrToken?.token


const token = await gettokenfromserver()


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,{
    headers: {
      // authorization: 'user in'
      // authorization: jwrToken?.token
      authorization: `bearer ${token}`
    }
  });
  // CHANGED (2026-10-30): guard before parsing (same as the other pages) — a non-JSON reply
  // (HTML error/404 page) would otherwise throw the cryptic
  // "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" error instead of a clean message.
  if (!res.ok) throw new Error(`Failed to load destination (${res.status})`);
  const result = await res.json();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4  pt-24 pb-12 sm:pt-28">
        {/* Toolbar: back link + edit/delete actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <DestinationActions
            id={id}
            name={result.name}
            className="flex items-center gap-2"
          />
        </div>

        {/* Hero image */}
        <div className="relative mt-6 h-64 overflow-hidden rounded-2xl bg-zinc-100 sm:h-96">
          <Image
            src={result.imageUrl}
            alt={result.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
            <Badge className="gap-1.5 border-0 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25">
              <MapPin className="size-3" />
              {result.country}
            </Badge>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              {result.name}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left: overview + quick facts */}
          <div className="space-y-6 lg:col-span-2">
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
                Overview
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {result.description}
              </p>
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4">
                <div className="rounded-lg bg-[#1d9fc2]/10 p-3 text-[#1d9fc2]">
                  <Clock className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Duration
                  </p>
                  <p className="mt-0.5 font-semibold text-zinc-900">
                    {result.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4">
                <div className="rounded-lg bg-[#1d9fc2]/10 p-3 text-[#1d9fc2]">
                  <CalendarDays className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Departure Date
                  </p>
                  <p className="mt-0.5 font-semibold text-zinc-900">
                    {result.departureDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: sticky price card */}
         <BookingCard result={result}/>
        </div>
      </div>
    </div>
  );
};

const DestinationDetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-40 bg-zinc-200" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 bg-zinc-200" />
          <Skeleton className="h-9 w-24 bg-zinc-200" />
        </div>
      </div>

      <Skeleton className="mt-6 h-64 w-full rounded-2xl bg-zinc-200 sm:h-96" />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-3">
            <Skeleton className="h-6 w-32 bg-zinc-200" />
            <Skeleton className="h-4 w-full bg-zinc-200" />
            <Skeleton className="h-4 w-5/6 bg-zinc-200" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-xl bg-zinc-200" />
            <Skeleton className="h-24 rounded-xl bg-zinc-200" />
          </div>
        </div>

        <Skeleton className="h-80 rounded-xl bg-zinc-200" />
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
  return <DestinationDetail id={id} />;
};

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<DestinationDetailSkeleton />}>
      <AwaitDestination params={params} />
    </Suspense>
  );
};

export default DetailsPage;
