import { CyGroteskmed, CyGroteskreg, CyGrotesk } from "@/lib/fonts";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[#F7F1E8] pb-10" id="hero">
      <section className="max-w-5xl mx-auto px-6 text-center pt-48 pb-28">
        <p className="text-sm tracking-[0.2em] text-[#C9A24D] mb-4">
          WEB DESIGN & DEVELOPMENT STUDIO
        </p>

        <h1
          className={`${CyGrotesk.className} text-5xl md:text-6xl leading-tight`}
        >
          Crafting Websites and Apps That
          <span className="text-[#C9A24D]"> Drive Success</span>
        </h1>

        <p
          className={`${CyGroteskreg.className} mt-6 text-gray-600 max-w-2xl mx-auto`}
        >
          At NextByte Studio, we specialize in designing modern websites,
          mobile apps, and UI/UX solutions that are clean, scalable, and
          conversion-focused—helping your brand stand out and succeed online.
        </p>

        <div className="mt-10">
          <Link
            href="#contact"
            className="inline-block bg-[#C9A24D] px-7 py-3.5 rounded-full font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_8px_30px_rgba(201,162,77,0.4)]"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* What We Design / Services */}
      <section id="services" className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-black border border-[#E8DED3]/20 rounded-[48px] px-8 md:px-12 py-16 md:py-20">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <p className="text-sm tracking-wide text-[#C9A24D] mb-2">
                OUR SERVICES
              </p>

              <h2
                className={`${CyGroteskmed.className} text-3xl md:text-4xl text-white leading-snug`}
              >
                What we design
              </h2>

              <p
                className={`${CyGroteskreg.className} text-gray-600 mt-4`}
              >
                Comprehensive digital solutions designed to elevate your brand
                and grow your business.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Development",
                  desc: "Modern, fast, and scalable websites built with performance and clarity in mind.",
                },
                {
                  title: "Mobile Apps",
                  desc: "Clean and intuitive mobile app interfaces for iOS and Android platforms.",
                },
                {
                  title: "UI / UX Design",
                  desc: "User-focused designs that deliver seamless and engaging experiences.",
                },
                {
                  title: "E-commerce",
                  desc: "Conversion-optimized online stores with intuitive shopping flows.",
                },
                {
                  title: "SEO Optimization",
                  desc: "Search-friendly structures that help your website rank and convert better.",
                },
                {
                  title: "Maintenance & Support",
                  desc: "Ongoing support, updates, and performance monitoring for peace of mind.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group bg-white rounded-3xl p-8 md:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,77,0.15)] hover:-translate-y-1.5"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F7F1E8] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#C9A24D] group-hover:scale-110">
                    <span className="text-[#C9A24D] text-lg font-semibold transition-colors duration-300 group-hover:text-black">
                      ●
                    </span>
                  </div>

                  <h3
                    className={`${CyGroteskmed.className} text-xl md:text-2xl mb-3 transition-colors duration-300 group-hover:text-[#C9A24D]`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`${CyGroteskreg.className} text-gray-600 text-sm md:text-base leading-relaxed`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;