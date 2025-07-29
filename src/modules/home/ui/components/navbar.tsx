"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import gsap from "gsap";

const navbarItems = [
  { href: "/", children: "INICIO" },
  { href: "/products", children: "CONTENIDO" },
  { href: "/about", children: "NOSOTROS" },
  { href: "/contact", children: "CONTACTO" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    gsap.fromTo(
      navbar,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
    );
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={cn(
        "h-20 flex justify-between font-medium fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-blackBackgroundNew/95 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 lg:px-8">
        <Link href="/" className="flex items-center">
          <div className="relative w-44 h-44 mr-3">
            <Image
              src="/CIAF7 Logo-33.png"
              alt="Congress Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* <span className="font-bebas text-2xl md:text-3xl uppercase tracking-wider text-white">
            Congreso de Astrofotograf 
          </span> */}
        </Link>

        <NavbarSidebar
          items={navbarItems}
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          isAuthenticated={!!session.data?.user}
        />

        <div className="items-center gap-2 hidden lg:flex">
          {navbarItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "font-robotoCondensed text-base uppercase tracking-wider px-4 py-6 rounded-none",
                pathname === item.href
                  ? "text-azulAstro border-b-2 border-azulAstro bg-transparent hover:bg-transparent"
                  : "text-white hover:text-azulAstro hover:bg-transparent",
              )}
            >
              <Link href={item.href}>{item.children}</Link>
            </Button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {session.data?.user ? (
            <Button
              asChild
              className="font-robotoCondensed text-base uppercase tracking-wider bg-azulAstro hover:bg-azulAstro/90 text-black px-6 py-6"
            >
              <Link href="/admin">Panel</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="font-robotoCondensed text-base uppercase tracking-wider text-white hover:text-azulAstro px-4 py-6"
              >
                <Link prefetch href="/sign-in">
                  Ingresar
                </Link>
              </Button>
              <Button
                asChild
                className="font-robotoCondensed text-base uppercase tracking-wider bg-azulAstro hover:bg-azulAstro/90 text-black px-6 py-6"
              >
                <Link prefetch href="/sign-up">
                  Registrarse
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="lg:hidden flex items-center">
          <Button
            variant="ghost"
            className="text-white hover:text-azulAstro hover:bg-transparent"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="size-8" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
