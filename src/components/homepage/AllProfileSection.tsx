"use client";

import Image from "next/image";

const profiles = [
    { name: "Creator", image: "/profiles/creator.png" },
    { name: "Investor", image: "/profiles/investor.png" },
    { name: "Entrepreneur", image: "/profiles/entrepreneur.png" },
    { name: "Service Provider", image: "/profiles/service.png" },
];

export default function AllProfileSection() {
    return (
        <section className="w-full bg-white flex justify-center">
            <div className="w-full max-w-[1200px] px-4 md:px-6 flex flex-col items-center gap-5 py-16 md:py-24">

                {/* Heading Container */}
                <div className="flex flex-col items-center gap-3 max-w-[329px] md:max-w-[720px]">

                    {/* Heading */}
                    <h2
                        className="text-center font-medium text-[#070707]"
                        style={{
                            fontFamily: "Inter Tight, sans-serif",
                            fontSize: "36px",
                            lineHeight: "44px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        4{" "}
                        <span className="italic">
                            Unique Profiles
                        </span>
                        , <br className="hidden md:block" />
                        1 Epic{" "}
                        <span className="italic">
                            Solution!
                        </span>
                    </h2>

                    {/* Subheading */}
                    <p
                        className="text-center text-[#3E3E3E]"
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            lineHeight: "20px",
                        }}
                    >
                        Whether you&apos;re a founder, entrepreneur, investor, or service
                        provider, our platform is here to support your journey.
                    </p>
                </div>

                {/* Profiles */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 md:gap-x-12 justify-items-center mt-8 md:mt-12">

                    {profiles.map((profile, i) => (
                        <div key={i} className="flex flex-col items-center">

                            {/* Avatar */}
                            <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px]">
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Label */}
                            <div className="mt-4 px-6 py-2 bg-[#F3F4F6] rounded-full text-[14px] md:text-[15px] text-[#070707] font-medium">
                                {profile.name}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}