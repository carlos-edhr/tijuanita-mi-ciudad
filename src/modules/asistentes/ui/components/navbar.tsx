"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Importamos usePathname

const Navbar = () => {
  const pathname = usePathname(); // Obtenemos la ruta actual
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Determinar si estamos en una ruta especial
  const isVoluntarios = pathname === "/voluntarios";

  // const isAsistentes = pathname === "/registro";

  // Definir los enlaces basados en la ruta
  const navLinks = isVoluntarios
    ? [
        { name: "Volver al sitio de inicio", link: "/" },
        {
          name: "¿Te interesa registrarte a la Vía Recreativa? ¡Da click aquí!",
          link: "/registro",
        },
      ]
    : [
        { name: "Volver al sitio de inicio", link: "/" },
        {
          name: "¿Te interesa colaborar como voluntario? ¡Da click aquí!",
          link: "/voluntarios",
        },
      ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={`w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Noise effect */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 z-10"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-40 h-16">
              <Image
                src="/images/landing/navbar2.png"
                alt="Tijuanita mi ciudad"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  className="text-blackOlive hover:text-moradoSecundario transition-colors text-md font-medium relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-moradoSecundario transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 ml-4">
              <a
                href="https://www.instagram.com/tijuanita_mi_ciudad/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blackOlive hover:text-moradoSecundario transition-colors"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/people/Tijuanita-Mi-Ciudad/61574985633708/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blackOlive hover:text-moradoSecundario transition-colors"
              >
                <FacebookIcon className="h-6 w-6" />
              </a>
            </div>

            {/* {isSpecialRoute ? (
              <Link
                href="/login"
                className="ml-6 px-6 py-2 rounded-full bg-gradient-to-r from-moradoSecundario to-[#0a33ff] text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Iniciar sesión
              </Link>
            ) : (
              <Link
                href="/voluntarios"
                className="ml-6 px-6 py-2 rounded-full bg-gradient-to-r from-moradoSecundario to-[#0a33ff] text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                ¡Súmate!
              </Link>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4 z-10">
            {/* Social Icons - Mobile */}
            <div className="flex items-center gap-3 mr-4">
              <a
                href="https://www.instagram.com/tijuanita_mi_ciudad/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blackOlive hover:text-moradoSecundario transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Tijuanita-Mi-Ciudad/61574985633708/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blackOlive hover:text-moradoSecundario transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-blackOlive hover:text-moradoSecundario focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden inset-0 w-full h-full bg-white z-99">
          <div className="container mx-auto px-4 pt-24 pb-12">
            {/* Close button inside mobile menu */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-4 p-2 rounded-md text-blackOlive hover:text-moradoSecundario focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center justify-start min-h-full">
              <div className="w-full max-w-md space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.link}
                    className="block px-6 py-4 text-blackOlive hover:text-white hover:bg-moradoSecundario/90 rounded-xl transition-all duration-300 text-center text-lg font-medium border border-moradoSecundario/30"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* 
                {isSpecialRoute ? (
                  <Link
                    href="/login"
                    className="block px-6 py-4 rounded-xl bg-gradient-to-r from-moradoSecundario to-[#0a33ff] text-white text-center text-lg font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                ) : (
                  <Link
                    href="/voluntarios"
                    className="block px-6 py-4 rounded-xl bg-gradient-to-r from-moradoSecundario to-[#0a33ff] text-white text-center text-lg font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    ¡Súmate!
                  </Link>
                )} */}
              </div>

              {/* Social Icons - Bottom of Mobile Menu */}
              <div className="mt-16 flex justify-center gap-6">
                <a
                  href="https://www.instagram.com/tijuanita_mi_ciudad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moradoSecundario hover:text-[#0a33ff] transition-colors"
                >
                  <InstagramIcon className="h-8 w-8" />
                </a>
                <a
                  href="https://www.facebook.com/people/Tijuanita-Mi-Ciudad/61574985633708/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moradoSecundario hover:text-[#0a33ff] transition-colors"
                >
                  <FacebookIcon className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
