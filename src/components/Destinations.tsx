"use client";

import { useMemo, useState } from "react";
import DestinationCard from "@/components/DestinationCard";
import type { Destination } from "@/data/destinations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DestinationsProps = {
  destinations: Destination[];
};

const ALL = "All";

const priceRanges: Record<string, (price: number) => boolean> = {
  [ALL]: () => true,
  "Under $1,000": (p) => p < 1000,
  "$1,000 - $3,000": (p) => p >= 1000 && p <= 3000,
  "$3,000 - $10,000": (p) => p > 3000 && p <= 10000,
  "Over $10,000": (p) => p > 10000,
};

const sorters: Record<string, (a: Destination, b: Destination) => number> = {
  "Price: Low to High": (a, b) => Number(a.price) - Number(b.price),
  "Price: High to Low": (a, b) => Number(b.price) - Number(a.price),
  "Name: A to Z": (a, b) => a.name.localeCompare(b.name),
  "Departure: Soonest": (a, b) =>
    a.departureDate.localeCompare(b.departureDate),
};

const triggerClass =
  "h-10! w-full! rounded-none! border-zinc-300! bg-white! px-4! text-sm! uppercase text-zinc-600";

const Destinations = ({ destinations }: DestinationsProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const categories = useMemo(
    () => [
      ALL,
      ...new Set(destinations.map((d) => d.category).filter(Boolean) as string[]),
    ],
    [destinations]
  );

  const visible = useMemo(() => {
    const inRange = priceRanges[priceRange ?? ALL];
    const list = destinations.filter(
      (d) =>
        (!category || category === ALL || d.category === category) &&
        inRange(Number(d.price))
    );
    const sorter = sortBy ? sorters[sortBy] : null;
    return sorter ? [...list].sort(sorter) : list;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <section className="bg-white px-5 pt-28 pb-20 lg:px-16">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-zinc-600">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-8 grid sm:grid-cols-3 [&>*:not(:first-child)]:sm:-ml-px">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(priceRanges).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(sorters).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-4 text-sm text-zinc-600">
          Showing {visible.length} destination{visible.length === 1 ? "" : "s"}
        </p>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-zinc-500">
            No destinations match your filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Destinations;