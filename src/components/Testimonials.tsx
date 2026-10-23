import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
  {
    quote:
      "Our Trip To Santorini Was Flawless. The Hotel Was Stunning And Every Tour Started Right On Time. We Will Book Again.",
    name: "Emma Rossi",
    location: "Milan, Italy",
    image: "",
  },
  {
    quote:
      "The Safari Experience Was Beyond Words. Our Guide Knew Every Trail And Made The Whole Family Feel Safe.",
    name: "David Okafor",
    location: "Lagos, Nigeria",
    image: "",
  },
  {
    quote:
      "Booking Was Simple And Support Answered Within Minutes. The Kyoto Itinerary Was Perfectly Balanced.",
    name: "Aiko Tanaka",
    location: "Osaka, Japan",
    image: "",
  },
];

const arrowClass =
  "static! size-10 rounded-full border-zinc-300 text-zinc-500 hover:text-zinc-900";

const Testimonials = () => {
  return (
    <section className="bg-white px-5 py-16 lg:px-16 lg:py-20">
      <Carousel opts={{ align: "start" }} className="mx-auto max-w-[1100px]">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CarouselPrevious className={arrowClass} />
            <CarouselNext className={arrowClass} />
          </div>
        </div>

        <CarouselContent>
          {testimonials.map((item) => (
            <CarouselItem key={item.name} className="md:basis-1/2">
              <div className="flex h-full items-stretch justify-between gap-4 rounded-md border border-zinc-200 bg-white p-4">
                <div className="flex flex-col justify-between">
                  <p className="text-sm font-medium leading-6 text-zinc-900 capitalize">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-4 text-xs">
                    <p className="font-medium text-[#1d9fc2]">— {item.name}</p>
                    <p className="ml-3 text-zinc-500">{item.location}</p>
                  </div>
                </div>

                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={218}
                    height={264}
                    className="aspect-[218/264] w-28 shrink-0 object-cover sm:w-32"
                  />
                ) : (
                  <div className="aspect-[218/264] w-28 shrink-0 bg-zinc-200 sm:w-32" />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Testimonials;