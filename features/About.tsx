
// import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";
// import Image from "next/image";
// import about1 from "@/Assets/about1.png";

// const About = () => {
//   return (
//     <div className="bg-[#F7F1E8]">
//       {/* About / Who We Are */}
//       <section
//         id="about"
//         className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center"
//       >
//         {/* Image Side */}
//         <div className="relative">
//           <div className="rounded-3xl overflow-hidden shadow-lg">
//             {/* Replace src with your image */}
//             <Image
//               src={about1}
//               alt="Who we are"
//               width={600}
//               height={500}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>

//         {/* Content Side */}
//         <div>
//           <p className="text-sm tracking-wide text-[#C9A24D] mb-3">
//             WHO WE ARE
//           </p>

//           <h2 className={`${CyGroteskmed.className} text-4xl mb-6`}>
//             About Our Company
//           </h2>

//           <p className={`${CyGroteskreg.className} text-gray-600 mb-4`}>
//             NextByteStudio is a design-focused studio built for startups, founders,
//             and growing businesses who value clarity and quality.
//           </p>

//           <p className={`${CyGroteskreg.className} text-gray-600 mb-4`}>
//             We believe strong digital products start with thoughtful design.
//             Our work combines visual clarity, user-centered thinking,
//             and scalable systems.
//           </p>

//           <p className={`${CyGroteskreg.className} text-gray-600 mb-8`}>
//             As a growing studio, we treat every project as a long-term
//             partnership, focusing on outcomes, not just visuals.
//           </p>

//           {/* Feature Points (like screenshot) */}
//           <div className="grid sm:grid-cols-2 gap-4">
//             {[
//               "Design-led approach",
//               "Clear communication",
//               "Scalable systems",
//               "Long-term partnerships",
//             ].map((item) => (
//               <div
//                 key={item}
//                 className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
//               >

//                 <p className={`${CyGroteskreg.className} text-gray-700 text-sm`}>
//                   {item}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
"use client";
import { useEffect, useRef, useState } from "react";
import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";
import Image from "next/image";
import about1 from "@/Assets/about1.png";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const About = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <div className="bg-[#F7F1E8]">
      <section
        id="about"
        ref={ref}
        className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center overflow-hidden"
      >
        {/* Image Side */}
        <div
          className={`relative transition-all duration-800 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
          style={{ transitionDuration: "0.8s" }}
        >
          <div className="rounded-3xl overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-2xl group">
            <Image
              src={about1}
              alt="Who we are"
              width={600}
              height={500}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Decorative accent */}
          <div
            className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[#C9A24D]/10 border border-[#C9A24D]/20 transition-all duration-1000 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "0.4s" }}
          />
        </div>

        {/* Content Side */}
        <div
          className={`transition-all duration-800 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
          style={{ transitionDuration: "0.8s", transitionDelay: "0.1s" }}
        >
          <p
            className={`text-sm tracking-wide text-[#C9A24D] mb-3 transition-all duration-600 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            WHO WE ARE
          </p>

          <h2
            className={`${CyGroteskmed.className} text-4xl mb-6 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            About Our Company
          </h2>

          {[
            "NextByteStudio is a design-focused studio built for startups, founders, and growing businesses who value clarity and quality.",
            "We believe strong digital products start with thoughtful design. Our work combines visual clarity, user-centered thinking, and scalable systems.",
            "As a growing studio, we treat every project as a long-term partnership, focusing on outcomes, not just visuals.",
          ].map((text, i) => (
            <p
              key={i}
              className={`${CyGroteskreg.className} text-gray-600 mb-4 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${0.35 + i * 0.1}s` }}
            >
              {text}
            </p>
          ))}

          {/* Feature Points */}
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              "Design-led approach",
              "Clear communication",
              "Scalable systems",
              "Long-term partnerships",
            ].map((item, i) => (
              <div
                key={item}
                className={`flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm transition-all duration-600 hover:shadow-md hover:-translate-y-0.5 group ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${0.6 + i * 0.1}s` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-150" />
                <p
                  className={`${CyGroteskreg.className} text-gray-700 text-sm`}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;