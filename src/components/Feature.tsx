"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`;

interface Destination {
  id: string | number;
  image: string;
  country: string;
  title: string;
  price: number | string;
  duration: string;
  rating?: number | string;
  link: string;
}

// Shape of one item from your API. Adjust these keys to match your backend.
interface ApiDestination {
  _id?: string;
  id?: string | number;
  image?: string;
  img?: string;
  thumbnail?: string;
  photo?: string;
  // CHANGED (2026-10-30): the backend's /featured-destinations sends the image as `imageUrl`.
  imageUrl?: string;
  country?: string;
  location?: string;
  region?: string;
  title?: string;
  name?: string;
  destination?: string;
  price?: number | string;
  cost?: number | string;
  duration?: string;
  days?: string;
  trip_duration?: string;
  rating?: number | string;
  ratings?: number | string;
  link?: string;
  url?: string;
}

type ApiResponse =
  | ApiDestination[]
  | { data?: ApiDestination[]; destinations?: ApiDestination[] };

const normalize = (d: ApiDestination, i: number): Destination => ({
  id: d._id ?? d.id ?? i,
  // CHANGED (2026-10-30): added `d.imageUrl` to the chain — the API's actual field name — so
  // cards show their image instead of rendering empty <img> tags.
  image: d.image ?? d.img ?? d.thumbnail ?? d.photo ?? d.imageUrl ?? "",
  country: d.country ?? d.location ?? d.region ?? "",
  title: d.title ?? d.name ?? d.destination ?? "",
  price: d.price ?? d.cost ?? "",
  duration: d.duration ?? d.days ?? d.trip_duration ?? "",
  rating: d.rating ?? d.ratings,
  // CHANGED (2026-10-30): the API has no link/url field, so every card's "Book now" was href="#".
  // Fall back to the real detail page route built from the Mongo `_id`.
  link: d.link ?? d.url ?? (d._id ? `/destinations/${d._id}` : "#"),
});

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

interface ArrowIconProps {
  dir?: "left" | "right";
  size?: number;
}

const ArrowIcon = ({ dir = "right", size = 14 }: ArrowIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={dir === "left" ? "rotate-180" : ""}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DestinationCard = ({ item }: { item: Destination }) => (
  <article className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(45%-12px)]">
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.title}
        className="h-[260px] w-full object-cover"
        loading="lazy"
      />
      {item.rating != null && (
        <span className="absolute right-3 top-3 flex items-center gap-1 bg-white px-2 py-1 text-xs font-medium">
          {item.rating}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3 6.9 7.4.6-5.6 4.8 1.7 7.2L12 17.8 5.5 21.5l1.7-7.2L1.6 9.5 9 8.9z" />
          </svg>
        </span>
      )}
    </div>

    <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
      <PinIcon />
      {item.country}
    </div>

    <div className="mt-1 flex items-baseline justify-between">
      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
      <p className="text-lg font-medium text-gray-900">
        ${item.price}
        <span className="text-[10px] font-normal text-gray-500">/Person</span>
      </p>
    </div>

    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
      <CalendarIcon />
      {item.duration}
    </div>

    <a
      href={item.link}
      className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase text-cyan-600 hover:underline"
    >
      Book now
      <ArrowIcon size={10} />
    </a>
  </article>
);

const FeaturedDestinations = () => {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data: ApiResponse = await res.json();
        const list: ApiDestination[] = Array.isArray(data)
          ? data
          : data.data ?? data.destinations ?? [];
        setItems(list.map(normalize));
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const getStep = (): number => {
    const card = trackRef.current?.firstElementChild;
    return card ? card.getBoundingClientRect().width + 24 : 0;
  };

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    const step = getStep();
    if (!track || !step) return;
    const index = Math.round(track.scrollLeft / step);
    setActive(Math.min(index, items.length - 1));
  };

  const total = items.length;
  const progress = total ? ((active + 1) / total) * 100 : 0;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-4xl text-gray-900">Featured Destinations</h2>
          <p className="mt-2 text-xs text-gray-600">
            Handpicked travel experiences for the adventure seekers.
          </p>
        </div>
        <Link
          href="/destinations"
          className="flex shrink-0 items-center gap-2 border border-cyan-500 px-4 py-2 text-[11px] uppercase text-cyan-600 transition hover:bg-cyan-50"
        >
          All destinations
          <ArrowIcon size={12} />
        </Link>
      </div>

      {loading && <p className="mt-10 text-sm text-gray-500">Loading destinations...</p>}
      {error && (
        <p className="mt-10 text-sm text-red-600">
          Could not load destinations: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-6">
            <span className="text-sm text-gray-700">
              {active + 1}/{total}
            </span>
            <div className="h-px flex-1 bg-gray-200">
              <div
                className="h-px bg-gray-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scrollByCard(-1)}
                disabled={active === 0}
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
              >
                <ArrowIcon dir="left" />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                disabled={active >= total - 1}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedDestinations;