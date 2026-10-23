import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden px-5 py-16 text-center text-white">
      <Image
        src="/images/CTA.png"
        alt="Airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-2 text-sm text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/destinations" />}
          className="mt-6 h-10 rounded-none bg-white px-5 text-xs font-medium text-zinc-900 hover:bg-zinc-100"
        >
          BOOK YOUR TRIP TODAY
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
};

export default CTA;