"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronDown,
    MapPin,
    Users,
    Calendar,
    ArrowRight,
    Sparkles,
} from "lucide-react";

import iosLogo from "../assets/logo/ios.png";
import playstoreLogo from "../assets/logo/playstore.png";

export default function NearWeLandingPage() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        setIsVisible(true);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-[#0a0e1a] text-white font-sans overflow-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-cyan-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            NearWe
                        </span>
                    </div>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full transition-all duration-300"
                    >
                        Get Started
                    </button>

                </div>
            </nav>

            {/* HERO */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
            >

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                    <div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div
                        className={`transition-all duration-1000 transform ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                            }`}
                    >
                        <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                            <span className="text-cyan-400 text-sm font-semibold">
                                ✨ Discover Your Community
                            </span>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                                Connect. Explore. Belong.
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Discover nearby events, meet like-minded people, and build
                            meaningful connections in your community.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-center mb-16">
                            <button
                                onClick={() => window.open("https://play.google.com/store/apps/details?id=YOUR_APP_ID", "_blank")}
                                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-2"
                            >
                                Download App
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>


                            <button className="px-8 py-4 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 hover:text-white font-bold rounded-full transition-all duration-300 hover:bg-cyan-500/10">
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex justify-center animate-bounce">
                            <ChevronDown className="w-6 h-6 text-cyan-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 px-6 bg-[#0a0e1a]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>
                    <p className="text-gray-400 text-center mb-20">
                        Everything you need to discover and connect
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: "Find Local Events",
                                desc: "Discover events happening near you in real time with advanced filtering.",
                            },
                            {
                                icon: Users,
                                title: "Connect with People",
                                desc: "Meet like-minded individuals and expand your community network.",
                            },
                            {
                                icon: Calendar,
                                title: "Create Events",
                                desc: "Host gatherings and share moments with your local community.",
                            },
                            {
                                icon: Sparkles,
                                title: "Smart Recommendations",
                                desc: "AI-powered suggestions based on your interests and location.",
                            },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="group p-8 bg-[#11141c] border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                                    <f.icon className="w-7 h-7 text-cyan-400" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-white">
                                    {f.title}
                                </h3>
                                <p className="text-gray-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-r from-[#0a0e1a] via-[#1a1f2e] to-[#0a0e1a]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        Join NearWe Today
                    </h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Start discovering your community and connecting with amazing people.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => window.open("https://play.google.com/store/apps/details?id=YOUR_APP_ID", "_blank")}
                            className="flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full shadow-lg hover:shadow-cyan-500/40 transition"
                        >
                            <img src={iosLogo} className="w-6 h-6" />
                            App Store
                        </button>

                        <button
                            onClick={() => window.open("https://play.google.com/store/apps/details?id=YOUR_APP_ID", "_blank")}
                            className="flex items-center gap-3 px-8 py-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition rounded-full"
                        >
                            <img src={playstoreLogo} className="w-6 h-6" />
                            Google Play
                        </button>

                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-6 bg-[#0a0e1a] border-t border-cyan-500/10 text-center text-gray-400">
                <p>© {new Date().getFullYear()} NearWe. Connecting communities worldwide.</p>
                <p className="mt-2 text-sm">hello@NearWe.app</p>
            </footer>
        </div>
    );
}
