// "use client"
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import design from "@/Assets/design.png";
// import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";

// const Why = () => {
//   const headingRef = useRef(null);
//   const [visible, setVisible] = useState(false);

// useEffect(() => {
//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       setVisible(entry.isIntersecting);
//     },
//     { threshold: 0.3 }
//   );

//   if (headingRef.current) {
//     observer.observe(headingRef.current);
//   }

//   return () => {
//     if (headingRef.current) {
//       observer.unobserve(headingRef.current);
//     }
//   };
// }, []);

//   return (
//     <section id="why" className="bg-black text-white py-32">
//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_2fr] gap-20">
//         {/* Heading with fade-in every time it scrolls into view */}
//         <h2
//           ref={headingRef}
//           className={`${CyGroteskmed.className} text-4xl md:text-5xl max-w-sm transition-opacity duration-700 ${
//             visible ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           Why our clients choose us as partners
//         </h2>

//         {/* Features grid */}
//         <div className={`${CyGroteskreg.className} grid sm:grid-cols-2 gap-x-16 gap-y-14`}>
//           {[
//             {
//               title: "Design-Focused",
//               desc: "We specialize only in web and UI/UX design, allowing us to stay sharp and intentional.",
//             },
//             {
//               title: "Modern Approach",
//               desc: "Every decision is informed by current design trends and real user behavior.",
//             },
//             {
//               title: "Scalable Thinking",
//               desc: "Our designs are built to evolve as your business grows.",
//             },
//             {
//               title: "Efficient & Transparent",
//               desc: "Studio-quality work without unnecessary complexity or overhead.",
//             },
//           ].map((item) => (
//             <div key={item.title} className="space-y-1">
//               <Image src={design} alt="bullet" className="w-20 h-20" />
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//               <p className="text-sm text-gray-400 max-w-xs">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Why;
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import design from "@/Assets/design.png";
import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
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

const Why = () => {
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section
      id="why"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-black text-white py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_2fr] gap-20">
        {/* Heading */}
        <h2
          className={`${CyGroteskmed.className} text-4xl md:text-5xl max-w-sm transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          Why our clients choose us as partners
        </h2>

        {/* Features grid */}
        <div
          className={`${CyGroteskreg.className} grid sm:grid-cols-2 gap-x-16 gap-y-14`}
        >
          {[
            {
              title: "Design-Focused",
              desc: "We specialize only in web and UI/UX design, allowing us to stay sharp and intentional.",
            },
            {
              title: "Modern Approach",
              desc: "Every decision is informed by current design trends and real user behavior.",
            },
            {
              title: "Scalable Thinking",
              desc: "Our designs are built to evolve as your business grows.",
            },
            {
              title: "Efficient & Transparent",
              desc: "Studio-quality work without unnecessary complexity or overhead.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`space-y-2 group transition-all duration-700 ease-out ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="transition-transform duration-300 group-hover:scale-105 origin-left">
                <Image src={design} alt="bullet" className="w-16 h-16" />
              </div>
              <h3 className="font-semibold text-lg text-white transition-colors duration-300 group-hover:text-[#C9A24D]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                {item.desc}
              </p>
              <div className="w-0 h-px bg-[#C9A24D]/50 transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;