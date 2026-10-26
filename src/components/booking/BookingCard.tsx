'use client';

import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { date } from 'better-auth';
import type { Destination } from '@/data/destinations';

const BookingCard = ({ result }: { result: Destination }) => {

   const { data: session, isPending } = authClient.useSession();

const user = session?.user;

const handleBooking = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isPending) {
    return;
  }

  if (!user) {
    alert("Please sign in before booking.");
    return;
  }

  const bookingData = {
    username: user.name,
    email: user.email,
    // destinationId: result._id,
    // destinationName: result.name,
    // country: result.country,
    // departureDate: result.departureDate,
    // duration: result.duration,
    // price: result.price,
  ...result,




    // bookingDate : new date()
     bookingDate : new Date()
  };

const response = await fetch("http://localhost:8000/booking",{
    // method ='post'
    method :'post',
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
     body: JSON.stringify(bookingData),
    
   });

const resultdata = await response.json()
  console.log('response from server',resultdata)






  console.log(bookingData);
};


    return (
        <div>
             <div>
            <Card className="sticky top-6 border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
                Starting from
              </p>

              <p className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
                ${Number(result.price).toLocaleString()}
              </p>
              <p className="text-sm text-zinc-500">per person</p>

              {/* <Separator className="my-5 bg-zinc-100" /> */}
              <div className="my-5 h-px w-full bg-zinc-100" />

              <div className="space-y-3 text-sm text-zinc-600">
                <p className="flex items-center gap-2.5">
                  <CalendarDays className="size-4 text-[#1d9fc2]" />
                  Departs {result.departureDate}
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="size-4 text-[#1d9fc2]" />
                  {result.duration}
                </p>
              </div>

             <form onSubmit={handleBooking}>
  <Button
    type="submit"
    className="mt-5 h-11 w-full gap-2 bg-[#1d9fc2] text-sm font-semibold hover:bg-[#1789a8]"
  >
    Book Now
    <ArrowRight />
  </Button>
</form>
            </Card>
          </div>
        </div>
    );
};

export default BookingCard;