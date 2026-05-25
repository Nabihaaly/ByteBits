"use client";
import { CyGrotesk, CyGroteskmed, CyGroteskreg } from "@/lib/fonts";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import cryptoss from "@/Assets/cryptoss.png";
import rikoss from "@/Assets/rikoss.png";
import blogss from "@/Assets/blogss.png";
import pastelthriftsss from "@/Assets/pastelthriftsss.png";
import fooddelivss from "@/Assets/fooddelivss.png";
import link from "@/Assets/link.png";
import Navbar from "@/features/Navbar";

const Allprojects = () => {
  const [projects, setprojects] = useState<any[]>([]);

  const projectimg = [rikoss, pastelthriftsss, blogss, cryptoss, fooddelivss];

  const fetchprojects = async () => {
    try {
      const { data } = await axios.get("/api/projects");
      setprojects(data?.projects?.[0].projects || []);
    } catch (error) {
      console.log("Failed to fetch", error);
      setprojects([]);
    }
  };

  useEffect(() => {
    fetchprojects();
  }, []);

  return (
    <>
      <Navbar />

      <div id="projects" className="bg-[#F7F1E8] min-h-screen">
        {/* Page heading */}
        <div className="pt-24 sm:pt-28 pb-10 px-4 text-center">
          <p
            className={`${CyGrotesk.className} text-3xl sm:text-4xl md:text-5xl text-[#C9A24D]`}
          >
            Projects we have built
          </p>
          <p className={`${CyGroteskreg.className} text-gray-500 text-sm sm:text-base mt-3 max-w-xl mx-auto`}>
            A selection of work we're proud of — from design to deployment.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                  <Image
                    src={projectimg[index % projectimg.length]}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay with link icon */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl flex items-center justify-center">
                    <a
                      href={item.projecturl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-2.5 rounded-full hover:bg-[#C9A24D] transition-colors duration-200"
                    >
                      <Image src={link} alt="see live" width={18} height={18} />
                    </a>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-5 py-4">
                  <h2 className={`${CyGroteskmed.className} text-lg sm:text-xl mb-1.5 text-gray-900`}>
                    {item.name}
                  </h2>
                  <p className={`${CyGroteskreg.className} text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2`}>
                    {item.description}
                  </p>

                  {/* Tech Stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="bg-[#F7F1E8] text-gray-700 text-xs px-2.5 py-1 rounded-full border border-[#e8ddd0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {projects.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p className={`${CyGroteskreg.className} text-base`}>Loading projects…</p>
            </div>
          )}
        </div>

        <footer className="text-center text-sm text-gray-400 py-8 border-t border-[#e8ddd0]">
          © {new Date().getFullYear()} NextByte Studio. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Allprojects;