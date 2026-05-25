// "use client"
// import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";
// import { useState } from "react";

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "CEO, TechCorp",
//     message:
//       "Next Byte transformed our digital presence. Their designs are modern, clean, and truly user-friendly.",
//   },
//   {
//     name: "Michael Chen",
//     role: "Product Manager, InnovateX",
//     message:
//       "Working with Next Byte was seamless. They delivered our app on time with incredible attention to detail.",
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Founder, CreatiSolutions",
//     message:
//       "Their team understands UX deeply. Our website engagement has doubled since launch!",
//   },
// ];

// const ClientsSay = () => {
//   const [current, setCurrent] = useState(0);

//   const nextTestimonial = () => {
//     setCurrent((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="bg-[#F7F1E8] py-20" id="testimonials">
//       <div className="max-w-5xl mx-auto px-6 text-center">
//         <p className="text-sm tracking-wide text-[#C9A24D] mb-2">TESTIMONIALS</p>
//         <h2 className={`${CyGroteskmed.className} text-3xl md:text-4xl mb-8`}>
//           What Our Clients Say
//         </h2>

//         <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg relative">
//           <p className={`${CyGroteskreg.className} text-gray-700 text-base md:text-lg mb-6`}>
//             "{testimonials[current].message}"
//           </p>
//           <h4 className={`${CyGroteskmed.className} text-lg md:text-xl text-[#C9A24D]`}>
//             {testimonials[current].name}
//           </h4>
//           <p className={`${CyGroteskreg.className} text-gray-500 text-sm md:text-base`}>
//             {testimonials[current].role}
//           </p>

//           {/* Navigation Arrows */}
//           <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-10 cursor-pointer text-[#C9A24D]" onClick={prevTestimonial}>
//             &#8592;
//           </div>
//           <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-10 cursor-pointer text-[#C9A24D]" onClick={nextTestimonial}>
//             &#8594;
//           </div>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-6 space-x-2">
//           {testimonials.map((_, idx) => (
//             <span
//               key={idx}
//               className={`w-3 h-3 rounded-full ${
//                 current === idx ? "bg-[#C9A24D]" : "bg-gray-300"
//               } cursor-pointer`}
//               onClick={() => setCurrent(idx)}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ClientsSay;
"use client";
import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    message:
      "Next Byte transformed our digital presence. Their designs are modern, clean, and truly user-friendly.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, InnovateX",
    message:
      "Working with Next Byte was seamless. They delivered our app on time with incredible attention to detail.",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, CreatiSolutions",
    message:
      "Their team understands UX deeply. Our website engagement has doubled since launch!",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const ClientsSay = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const { ref, inView } = useInView(0.2);

  const go = (dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 320);
  };

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[#F7F1E8] py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p
          className={`text-sm tracking-wide text-[#C9A24D] mb-2 transition-all duration-600 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          TESTIMONIALS
        </p>
        <h2
          className={`${CyGroteskmed.className} text-3xl md:text-4xl mb-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          What Our Clients Say
        </h2>

        <div
          className={`bg-white rounded-3xl p-8 md:p-12 shadow-lg relative transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Quote mark */}
          <span className="absolute top-6 left-10 text-6xl text-[#C9A24D]/15 font-serif leading-none select-none">
            "
          </span>

          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === "right" ? "-20px" : "20px"})`
                : "translateX(0)",
            }}
          >
            <p
              className={`${CyGroteskreg.className} text-gray-700 text-base md:text-lg mb-6`}
            >
              "{testimonials[current].message}"
            </p>
            <h4
              className={`${CyGroteskmed.className} text-lg md:text-xl text-[#C9A24D]`}
            >
              {testimonials[current].name}
            </h4>
            <p
              className={`${CyGroteskreg.className} text-gray-500 text-sm md:text-base`}
            >
              {testimonials[current].role}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => go("left")}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center text-[#C9A24D] border border-[#C9A24D]/30 hover:bg-[#C9A24D] hover:text-black transition-all duration-300 hover:scale-110"
          >
            ←
          </button>
          <button
            onClick={() => go("right")}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 w-10 h-10 rounded-full flex items-center justify-center text-[#C9A24D] border border-[#C9A24D]/30 hover:bg-[#C9A24D] hover:text-black transition-all duration-300 hover:scale-110"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`transition-all duration-300 rounded-full ${
                current === idx
                  ? "w-6 h-3 bg-[#C9A24D]"
                  : "w-3 h-3 bg-gray-300 hover:bg-[#C9A24D]/50"
              }`}
              onClick={() => {
                setDirection(idx > current ? "right" : "left");
                go(idx > current ? "right" : "left");
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSay;