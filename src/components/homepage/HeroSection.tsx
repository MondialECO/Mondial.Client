'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center pt-24 pb-32 overflow-hidden bg-[#FAFAFA]">

            {/* Background Gradient */}
            <div
                className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(217,217,217,0) 0%, #ECECED 50%, #FAFAFA 100%)',
                }}
            ></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Avatars */}
                <div className="flex flex-col items-center mb-8">

                    <div className="flex -space-x-2 mb-3">
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[#ebd5c1] flex items-center justify-center text-xl shadow-sm z-40">👩🏽</div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[#f1dfcd] flex items-center justify-center text-xl shadow-sm z-30">👦🏻</div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[#e3c2ac] flex items-center justify-center text-xl shadow-sm z-20">👱🏻‍♀️</div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-[#422B22] flex items-center justify-center text-xl shadow-sm z-10">👨🏿</div>
                    </div>

                    <div
                        className="px-5 py-1.5 rounded-full bg-[#E5F7ED] border border-[#d1f0df] text-[#00A854] text-sm font-medium"
                        style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                    >
                        4 profiles, 1 awesome solution!
                    </div>

                </div>

                {/* Heading */}
                <h1
                    className="text-[#070707] tracking-tight mb-8"
                    style={{
                        fontFamily: 'Instrument Sans, sans-serif',
                        fontSize: '88px',
                        lineHeight: '88px',
                        maxWidth: '1000px',
                        fontWeight: 400,
                    }}
                >
                    The first Social <br />
                    Credit
                    <span
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: 600,
                            fontStyle: 'italic',
                            color: '#070707',
                        }}
                    >
                        {' '}Creation.
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    className="mt-2 text-[22px] leading-relaxed text-[#555555] max-w-2xl mb-12"
                    style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                >
                    A premium ecosystem connecting <strong className="text-[#070707] font-semibold">creators</strong> and <strong className="text-[#070707] font-semibold">investors</strong><br />
                    through Project Intelligence.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-20">

                    <button
                        className="px-10 py-4 bg-white text-[#070707] text-lg font-medium rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                        style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                    >
                        Get a Demo
                    </button>

                    <button
                        className="px-10 py-4 bg-[#3D63DD] text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition-colors"
                        style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                    >
                        Join Free
                    </button>

                </div>

                {/* Dashboard Image */}
                <div
                    className="w-full max-w-[1100px] border border-gray-200 rounded-[12px] shadow-xl flex overflow-hidden relative transition-transform duration-500 ease-out will-change-transform"
                    style={{
                        transform: `translateY(${scrollY * -0.05}px) scale(${1 + scrollY * 0.0001})`,
                    }}
                >
                    <Image
                        src="/dashboard-mockup.png"
                        alt="Dashboard Interface"
                        width={1100}
                        height={600}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>

            </div>
        </section>
    );
}