import Image from 'next/image';

export default function TrustedBy() {
  return (
    <section className="w-full pt-8 md:pt-10 pb-8 md:pb-10">
      <div className="w-full px-8 md:px-12 lg:px-16">
        <h2 className="text-center text-gray-600 text-xs md:text-sm font-medium mb-6 md:mb-8 tracking-wide uppercase">
          Trusted by teams from:
        </h2>
        
        <div className="grid grid-cols-5 items-center gap-4 md:gap-6">
          {/* NASDAQ */}
          <div className="flex items-center justify-center group">
            <Image
              src="/nasdaq.png"
              alt="NASDAQ"
              width={200}
              height={60}
              className="h-10 md:h-12 w-auto max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Y Combinator */}
          <div className="flex items-center justify-center group">
            <Image
              src="/y-combinator.png"
              alt="Y Combinator"
              width={200}
              height={60}
              className="h-16 md:h-20 lg:h-24 w-auto max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Creative Destruction Lab */}
          <div className="flex items-center justify-center group">
            <Image
              src="/creative-destruction-lab.png"
              alt="Creative Destruction Lab"
              width={200}
              height={60}
              className="h-10 md:h-12 w-auto max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* betaworks */}
          <div className="flex items-center justify-center group">
            <Image
              src="/betaworks.png"
              alt="betaworks"
              width={200}
              height={60}
              className="h-10 md:h-12 w-auto max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* LEAGUE of INNOVATORS */}
          <div className="flex items-center justify-center group">
            <Image
              src="/league-of-innovators.webp"
              alt="LEAGUE of INNOVATORS"
              width={200}
              height={60}
              className="h-10 md:h-12 w-auto max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

