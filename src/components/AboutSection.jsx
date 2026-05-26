import React from 'react';

const AboutSection = () => {
    return (
        <div>
            <div className="relative w-full min-h-130 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80')" }}
                />
                <div className="absolute inset-0 z-10" style={{ background: "rgba(10,30,60,0.72)" }} />
                <div className="relative z-20 grid grid-cols-2 gap-12 px-10 py-16 w-full max-w-4xl items-center">
                    <div>
                        <span className="inline-block bg-white/10 border border-white/25 text-white/85 text-xs px-4 py-1 rounded-full mb-5 tracking-wide">
                            About us
                        </span>
                        <h2 className="text-4xl font-medium text-white leading-tight mb-4">
                            Built by thinkers,<br />for thinkers
                        </h2>
                        <p className="text-sm text-white/70 leading-relaxed mb-7">
                            We believe every great product starts with a single idea. Idea Vault was created
                            to give curious minds a beautiful, organised space to capture their thoughts —
                            before they slip away.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/[0.07] p-6 text-center">
                            <p className="text-3xl font-medium text-white mb-1">12K+</p>
                            <p className="text-xs text-white/60">Ideas saved</p>
                        </div>
                        <div className="bg-white/[0.07] p-6 text-center">
                            <p className="text-3xl font-medium text-white mb-1">3.4K</p>
                            <p className="text-xs text-white/60">Active Users</p>
                        </div>
                        <div className="bg-white/[0.07] p-6 text-center">
                            <p className="text-3xl font-medium text-white mb-1">98%</p>
                            <p className="text-xs text-white/60">Satisfaction</p>
                        </div>
                        <div className="bg-white/[0.07] p-6 text-center">
                            <p className="text-3xl font-medium text-white mb-1">40+</p>
                            <p className="text-xs text-white/60">Categories</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutSection;