'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center pt-20 md:pt-24 pb-20 md:pb-32 overflow-hidden bg-[#FAFAFA]">

            {/* HERO GRADIENT BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ECECED] to-[#FAFAFA]" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

                {/* Avatars */}
                <div className="flex flex-col items-center mb-6 md:mb-8">
                    <div className="flex -space-x-2 mb-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-[#ebd5c1] flex items-center justify-center text-lg shadow-sm z-40">👩🏽</div>
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-[#f1dfcd] flex items-center justify-center text-lg shadow-sm z-30">👦🏻</div>
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-[#e3c2ac] flex items-center justify-center text-lg shadow-sm z-20">👱🏻‍♀️</div>
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-[#422B22] flex items-center justify-center text-lg shadow-sm z-10">👨🏿</div>
                    </div>

                    <div className="px-4 py-1.5 rounded-full bg-[#E5F7ED] border border-[#d1f0df] text-[#00A854] text-sm font-medium">
                        4 profiles, 1 awesome solution!
                    </div>
                </div>

                {/* Heading */}
                <h1
                    className="text-[#070707] font-normal tracking-tight mb-6 md:mb-8"
                    style={{
                        fontFamily: '"Instrument Sans", sans-serif',
                        fontSize: 'clamp(40px, 8vw, 88px)',
                        lineHeight: '1.05',
                        maxWidth: '900px',
                    }}
                >
                    The first Social <br />
                    Credit
                    <span
                        style={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 600,
                            fontStyle: 'italic',
                        }}
                    >
                        {' '}Creation.
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-[16px] md:text-[22px] leading-relaxed text-[#555555] max-w-xl md:max-w-2xl mb-10 md:mb-12"
                    style={{ fontFamily: '"Instrument Sans", sans-serif' }}
                >
                    A premium ecosystem connecting <strong className="text-[#070707] font-semibold">creators</strong> and <strong className="text-[#070707] font-semibold">investors</strong>
                    <br className="hidden md:block" />
                    through Project Intelligence.
                </p>

                {/* CTA BUTTONS (SIDE BY SIDE) */}
                <div className="flex gap-4 mb-16 md:mb-20">

                    <button
                        className="px-8 py-3.5 md:px-10 md:py-4 bg-white text-[#070707] text-base md:text-lg font-medium rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                        style={{ fontFamily: '"Instrument Sans", sans-serif' }}
                    >
                        Get a Demo
                    </button>

                    <Link
                        href="/signup"
                        className="px-8 py-3.5 md:px-10 md:py-4 bg-[#3D63DD] text-white text-base md:text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition-colors inline-block"
                        style={{ fontFamily: '"Instrument Sans", sans-serif' }}
                    >
                        Join Free
                    </Link>

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