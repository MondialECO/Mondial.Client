"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full fixed top-6 left-0 z-50 flex justify-center px-4">
      {/* Container */}
      <div className="w-full max-w-[1200px] h-[60px] bg-white/70 backdrop-blur-md rounded-[16px] flex items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#3C61DD] rounded-[10px] flex items-center justify-center relative">
            {/* optional arrow decoration */}
            <span className="absolute w-4 border-2 border-[#F7F7F9] rotate-[-29deg]" />
          </div>

          <span className="text-[16px] font-normal text-[#3E3E3E] tracking-[-0.02em]">
            Mondial
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavItem label="Concept" active />
          <NavItem label="Features" />
          <NavItem label="Pricing" />
          <NavItem label="FAQ" />
        </nav>

        {/* Button */}
        <div className="hidden md:block">
          <button className="h-[36px] px-4 rounded-full bg-[#3C61DD] text-[13px] font-semibold text-white">
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-sm">
          ☰
        </button>
      </div>
    </header>
  );
}

/* ================= NAV ITEM ================= */

function NavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <Link href="#">
      <span
        className={`px-2 py-1 text-[14px] font-medium rounded-[8px] transition
        ${active
            ? "bg-[#F1F1F2] text-[#5E5E5E]"
            : "text-[#5E5E5E] hover:bg-[#F1F1F2]"
          }`}
      >
        {label}
      </span>
    </Link>
  );
}