"use client";
import me from '../assets/team/piyush.jpeg'
import aniket from '../assets/team/aniket.jpeg'
import React from "react";
import { Users } from "lucide-react";

export default function AboutUs() {
  const team = [
    {
      name: "Aniket Abnave",
      role: "Co-Founder",
      img: aniket,
    },
    {
      name: "Sneh Gour",
      role: "Co-Founder",
      img: "https://i.pravatar.cc/300?img=5",
    },
    {
      name: "Piyush Patel",
      role: "Co-Founder",
      img: me,
    },
    {
      name: "Karan Johar",
      role: "Co-Founder",
      img: "https://i.pravatar.cc/300?img=15",
    },
    {
      name: "Aniket Gupta",
      role: "Co-Founder",
      img: "https://i.pravatar.cc/300?img=20",
    },
  ];

  return (
    <div className="bg-[#0a0e1a] text-white font-sans min-h-screen pt-28 px-6">

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
          <Users className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold text-sm">About NearWe</span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Our Mission is to Connect People.
          </span>
        </h1>

        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          NearWe was created with a vision to bring communities closer.
          We help people discover events, meet like-minded friends, and build
          real human connections in the digital era. Our mission is simple —
          make the world feel smaller, warmer, and more connected.
        </p>
      </section>


      {/* TEAM SECTION */}
      {/* <section className="max-w-7xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
          Meet Our Team
        </h2> */}
{/* 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4">

          {team.map((member, i) => (
            <div
              key={i}
              className="p-6 bg-[#11141c] border border-cyan-500/20 rounded-2xl shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-cyan-500/40 mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-cyan-400 text-sm font-medium">{member.role}</p>
            </div>
          ))}

        </div> */}
      {/* </section> */}


      {/* FOOTER */}
      <footer className="py-8 border-t border-cyan-500/10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} NearWe. Connecting people everywhere.</p>
      </footer>
    </div>
  );
}
