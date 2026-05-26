'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80",
        overlay: "rgba(15,20,50,0.65)",
        tag: "🚀 Innovation starts here",
        title: "Turn your boldest ideas into reality",
        desc: "The next unicorn startup begins with a single thought. Vault yours before the moment passes.",
    },
    {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
        overlay: "rgba(10,35,25,0.68)",
        tag: "💡 Build together",
        title: "Great teams are built on shared vision",
        desc: "Collaborate with like-minded innovators. Share ideas, get feedback, and build products that matter.",
    },
    {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
        overlay: "rgba(40,15,5,0.68)",
        tag: "📈 Scale your startup",
        title: "From zero to product — faster than ever",
        desc: "Validate, iterate, and launch. Idea Vault keeps your roadmap organised so you can move fast.",
    },
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);

    const goTo = (n) => setCurrent((n + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(() => goTo(current + 1), 4500);
        return () => clearInterval(timer);
    }, [current]);

    return (
        <div className="relative w-full min-h-125 overflow-hidden">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                >
                    <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('${slide.image}')` }} />
                    <div className="absolute inset-0 z-10" style={{ background: slide.overlay }} />
                    <div className="relative z-20 text-center px-8 py-16 max-w-2xl">
                        <span className="inline-block bg-white/15 border border-white/30 text-white text-xs px-4 py-1 rounded-full mb-5 tracking-wide">
                            {slide.tag}
                        </span>
                        <h1 className="text-5xl font-medium text-white leading-tight mb-4">{slide.title}</h1>
                        <p className="text-base text-white/78 leading-relaxed mb-8">{slide.desc}</p>
                        <Link href="/ideas" className="btn bg-white text-black border-none hover:opacity-90">
                            Explore Ideas →
                        </Link>
                    </div>
                </div>
            ))}
            <button onClick={() => goTo(current - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center hover:bg-white/28">‹</button>
            <button onClick={() => goTo(current + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center hover:bg-white/28">›</button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/40"}`} />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;