import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#eafaff] px-5 py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-md bg-white p-6 shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                width={32}
                height={32}
                className="size-6"
              />
              <h3 className="mt-4 text-base font-medium text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;