import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { name: "duration", label: "Date/Duration", placeholder: "Anytime 3 Days" },
  { name: "budget", label: "Budget", placeholder: "$0-$3000" },
  { name: "people", label: "People", placeholder: "5-10" },
];

const HeroSection = () => {
    return (
        <div>
            <section className="relative flex min-h-[640px] h-svh max-h-[900px] flex-col overflow-hidden text-white">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-14 pb-24 text-center">
        <h1 className="max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-6xl md:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-5 max-w-lg text-sm text-white/90 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/destinations" />}
            className="h-11 rounded-none bg-[#1d9fc2] px-6 text-sm font-medium text-white hover:bg-[#1789a8]"
          >
            EXPLORE NOW
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/destinations" />}
            className="h-11 rounded-none bg-zinc-500/70 px-6 text-sm font-medium text-white hover:bg-zinc-500/90"
          >
            VIEW DESTINATION
          </Button>
        </div>
      </div>

      <form
        action="/destinations"
        method="GET"
        className="relative z-10 grid grid-cols-2 md:grid-cols-5"
      >
        {searchFields.map((field) => (
          <label
            key={field.name}
            className="flex cursor-text flex-col gap-1 border-r border-white/20 bg-zinc-600/60 px-5 py-4 backdrop-blur-sm"
          >
            <span className="text-xs font-medium">{field.label}</span>
            <input
              name={field.name}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-[11px] text-white/70 outline-none placeholder:text-white/70"
            />
          </label>
        ))}
        <button
          type="submit"
          className="col-span-2 bg-[#1d9fc2] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#1789a8] md:col-span-1"
        >
          Search
        </button>
      </form>
    </section>
        </div>
    );
};

export default HeroSection;