import React from 'react';
import { Suspense } from "react";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyBookingCard from '@/components/booking/MyBookingCard';
import type { Booking } from '@/components/booking/MyBookingCard';
import { Skeleton } from "@/components/ui/skeleton";

const getBookings = async (): Promise<Booking[]> => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });

    const email = session?.user?.email;
    if (!email) redirect("/signin");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${encodeURIComponent(email)}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
};

const MyBookingsList = async () => {
    const booking = await getBookings();

    return (
        <>
            {booking.map((b) => (
                <MyBookingCard key={b._id} booking={b} />
            ))}
        </>
    );
};

const BookingsSkeleton = () => (
    <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl bg-zinc-200" />
        ))}
    </div>
);

const MyBookingPage = () => {
    return (
        <main className="mx-auto w-full max-w-3xl px-4 pt-24 pb-16">
            <Suspense fallback={<BookingsSkeleton />}>
                <MyBookingsList />
            </Suspense>
        </main>
    );
};

export default MyBookingPage;
