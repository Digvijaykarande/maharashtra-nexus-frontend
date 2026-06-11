"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Container from "../layout/Container";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./NavLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-18 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold">
                MN
              </div>

              <div>
                <h1 className="font-bold text-lg">
                  Maharashtra Nexus
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-medium text-slate-700 hover:text-emerald-500 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <Link
                href="/search"
                className="text-slate-600 hover:text-emerald-600"
              >
                Search
            </Link>

            {/* Right Side */}
            <div className="hidden md:flex">
              <Link
                href="/login"
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-white font-medium transition hover:bg-emerald-600"
              >
                Admin Login
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={open} setOpen={setOpen} />
    </>
  );
}