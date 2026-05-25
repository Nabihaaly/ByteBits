// // app/page.tsx
"use client"; // needed for useState

import Link from "next/link";
import { useState, useEffect } from "react";
import { CyGroteskmed } from "@/lib/fonts";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-black text-white flex flex-col items-center">
      {/* Floating Navbar */}
      <header
        className={`fixed top-4 z-50 bg-black rounded-4xl max-w-7xl w-[90%] mx-auto px-8 py-2 flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled
            ? "shadow-[0_0_40px_rgba(201,162,77,0.15)] border border-[#C9A24D]/20"
            : "shadow-lg border border-transparent"
        }`}
        style={{
          animation: "navSlideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`${CyGroteskmed.className} text-xl font-bold transition-all duration-300 hover:text-[#C9A24D]`}
        >
          ByteBits Studio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm items-center">
          {["Why Us", "About", "Services", "Portfolio"].map((item, i) => (
            <Link
              key={item}
              href={
                item === "Portfolio"
                  ? "/Portfolio"
                  : `#${item.toLowerCase().replace(" us", "")}`
              }
              className="relative hover:text-[#C9A24D] transition-colors duration-300 group"
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A24D] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-5 py-2 rounded-full font-medium border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,162,77,0.4)] hover:scale-105"
          >
            Book a call
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-800 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden fixed top-20 z-40 bg-black rounded-4xl w-[90%] mx-auto px-6 py-6 flex flex-col gap-4 shadow-lg border border-[#C9A24D]/10 transition-all duration-400 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {["Why Us", "About", "Services"].map((item, i) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(" us", "")}`}
            className="hover:text-[#C9A24D] transition-all duration-300 hover:pl-2"
            style={{
              transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateX(0)" : "translateX(-8px)",
            }}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}
        <Link
          href="/Portfolio"
          className="hover:text-[#C9A24D] transition-all duration-300 hover:pl-2"
          onClick={() => setIsOpen(false)}
        >
          Portfolio
        </Link>
        <Link
          href="#contact"
          className="px-5 py-2 rounded-full font-medium border border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-black transition-all duration-300 text-center"
          onClick={() => setIsOpen(false)}
        >
          Book a call
        </Link>
      </nav>

      <style jsx global>{`
        @keyframes navSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}