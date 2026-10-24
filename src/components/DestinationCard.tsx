import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import type { Destination } from "@/data/destinations";

type DestinationCardProps = {
  destination: Destination;
};

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const { _id, name, country, price, duration, imageUrl, rating } = destination;

  return (
    <article>
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200">
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {rating != null && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 text-xs text-zinc-900">
            {rating}
            <Star className="size-3.5 fill-black" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-600">
        <MapPin className="size-3.5" />
        {country}
      </div>

      <div className="mt-1 flex items-baseline justify-between gap-3">
        <h3 className="text-base font-light text-zinc-900">{name}</h3>
        <p className="text-base text-zinc-900">
          ${Number(price).toLocaleString()}
          <span className="text-[10px] text-zinc-500">/Person</span>
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-600">
        <CalendarDays className="size-3.5" />
        {duration}
      </div>

      <Link
        href={`/destinations/${_id}`}
        className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#1d9fc2] underline underline-offset-4"
      >
        BOOK NOW
        <ArrowUpRight className="size-3.5 no-underline" />
      </Link>
    </article>
  );
};

export default DestinationCard;