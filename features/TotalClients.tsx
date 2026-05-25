// import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";

// const TotalClients = () => {
//   return (
//     <div>
//         <div className="grid grid-cols-3 gap-6 bg-black p-10">
//             {[
//               { value: "50+", label: "Clients" },
//               { value: "120+", label: "Projects" },
//               { value: "5+", label: "Years Experience" },
//             ].map((stat) => (
//               <div
//                 key={stat.label}
//                 className="bg-black rounded-2xl p-6 text-center shadow-sm"
//               >
//                 <h3
//                   className={`${CyGroteskmed.className} text-3xl text-[#C9A24D]`}
//                 >
//                   {stat.value}
//                 </h3>
//                   <p
//                   className={`${CyGroteskreg.className} text-white text-sm mt-1`}
//                 >
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>

//     </div>
//   )
// }

// export default TotalClients

"use client";
import { useEffect, useRef, useState } from "react";
import { CyGroteskmed, CyGroteskreg } from "@/lib/fonts";

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

const stats = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 120, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

function StatCard({
  stat,
  delay,
  active,
}: {
  stat: (typeof stats)[0];
  delay: number;
  active: boolean;
}) {
  const count = useCountUp(stat.value, 1600, active);

  return (
    <div
      className={`bg-black rounded-2xl p-6 text-center transition-all duration-700 ease-out hover:bg-[#111] group ${
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <h3
        className={`${CyGroteskmed.className} text-3xl text-[#C9A24D] transition-all duration-300 group-hover:scale-110 inline-block`}
      >
        {active ? count : 0}
        {stat.suffix}
      </h3>
      <p className={`${CyGroteskreg.className} text-white text-sm mt-1`}>
        {stat.label}
      </p>
    </div>
  );
}

const TotalClients = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-3 gap-6 bg-black p-10 overflow-hidden">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            delay={0.1 + i * 0.15}
            active={inView}
          />
        ))}
      </div>
    </div>
  );
};

export default TotalClients;