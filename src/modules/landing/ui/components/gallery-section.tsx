"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import {
  Instagram,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  description: string;
}

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false);

  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      src: "/gallery/galería-1.-Caminatas.jpg",
      alt: "Taller de pintura para niños en el parque central",
      description: "Caminatas.",
    },
    {
      id: "2",
      src: "/gallery/galería 2. recrear las calles.jpg",
      alt: "Club de lectura al aire libre en el jardín botánico",
      description: "Recrear las calles.",
    },
    {
      id: "3",
      src: "/gallery/Galería-3.-Talleres-creativos.jpg",
      alt: "Familias disfrutando de la vía recreativa dominical",
      description: "Talleres reacreativos.",
    },
    {
      id: "4",
      src: "/gallery/galería 4. colaboraciones multidisciplinarias_.jpg",
      alt: "Familias disfrutando de la vía recreativa dominical",
      description: "Colaboraciones multidisciplinarias. ",
    },
    {
      id: "5",
      src: "/gallery/Galería 5. territorios de paz.jpg",
      alt: "Parque rehabilitado por voluntarios de la comunidad",
      description: "Territorios de paz.",
    },
    {
      id: "6",
      src: "/gallery/Galería 6. Socialización vecinal.JPG",
      alt: "Creación de mural colectivo en el centro cultural",
      description: "Socialización vecinal.",
    },
    {
      id: "7",
      src: "/gallery/Galería 7. actividad física_.png",
      alt: "Festival de comida tradicional con productores locales",
      description: "Actividad física.",
    },
    {
      id: "8",
      src: "/gallery/Galería 8. Iniciativa voluntaria.jpg",
      alt: "Presentación musical en el anfiteatro municipal",
      description: "Iniciativa voluntaria.",
    },
    {
      id: "9",
      src: "/gallery/Galería 9. convivencia intergeneracional.jpg",
      alt: "Convivencia intergeneracional",
      description: "Convivencia intergeneracional.",
    },
  ];

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      if (scale > 1) setPosition({ x, y });
    },
    onPinch: ({ offset: [d] }) => {
      setScale(Math.min(Math.max(1, scale + d / 100), 3));
    },
  });

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleMediaFullscreen = () => {
    setIsMediaFullscreen(!isMediaFullscreen);
    if (!isMediaFullscreen) resetZoom();
  };

  const goToNext = () => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(
      (item) => item.id === selectedItem.id,
    );
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedItem(galleryItems[nextIndex]);
    resetZoom();
  };

  const goToPrev = () => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(
      (item) => item.id === selectedItem.id,
    );
    const prevIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedItem(galleryItems[prevIndex]);
    resetZoom();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem) {
        if (e.key === "Escape") {
          setSelectedItem(null);
          resetZoom();
        }
        if (e.key === "+") setScale((s) => Math.min(s + 0.25, 3));
        if (e.key === "-") setScale((s) => Math.max(s - 0.25, 1));
        if (e.key === "0") resetZoom();
        if (e.key === "ArrowRight") goToNext();
        if (e.key === "ArrowLeft") goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  return (
    <section className="relative overflow-hidden bg-blancoHuesoFondo py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-soft-light" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-[#fde047]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-kawaiiRT text-4xl text-white md:text-6xl mb-8">
            <span className="block bg-gradient-to-r from-moradoSecundario to-[#0a33ff] bg-clip-text text-transparent">
              Nuestra Galería
            </span>
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border-4 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition-all hover:border-[#FDE047]/30 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity group-hover:opacity-100"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
              >
                <p className="text-xs md:text-sm font-semibold line-clamp-2">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link
            href="https://www.instagram.com/tijuanita_mi_ciudad/"
            target="_blank"
          >
            <button className="inline-flex animate-shine items-center justify-center rounded-2xl bg-gradient-to-r from-[#FDE047] via-[#4ECDC4] to-[#FDE047] bg-[length:200%_auto] px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg font-semibold text-gray-900 transition-all hover:scale-105 hover:shadow-lg">
              Ver más recuerdos en Instagram
              <Instagram className="ml-2 h-5 w-5 md:h-6 md:w-6 text-gray-900" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Full Screen Viewer */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              setSelectedItem(null);
              resetZoom();
              setIsMediaFullscreen(false);
            }}
          >
            <div
              className={`relative ${
                isMediaFullscreen
                  ? "w-screen h-screen"
                  : "w-full max-w-6xl max-h-screen"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full hover:bg-[#FDE047]/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full hover:bg-[#FDE047]/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Controls */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setScale((s) => Math.min(s + 0.25, 3));
                  }}
                  className="bg-black/50 p-2 rounded-full hover:bg-[#FDE047]/20 transition-colors"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setScale((s) => Math.max(s - 0.25, 1));
                  }}
                  className="bg-black/50 p-2 rounded-full hover:bg-[#FDE047]/20 transition-colors"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMediaFullscreen();
                  }}
                  className="bg-black/50 p-2 rounded-full hover:bg-[#FDE047]/20 transition-colors"
                >
                  {isMediaFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-white" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(null);
                    resetZoom();
                  }}
                  className="bg-black/50 p-2 rounded-full hover:bg-[#FDE047]/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Image Container */}
              <motion.div
                className={`relative ${
                  isMediaFullscreen ? "w-full h-full" : "aspect-video"
                }`}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  touchAction: "none",
                }}
              >
                <div
                  {...bind()}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    fill
                    quality={100}
                    className="object-contain cursor-grab active:cursor-grabbing"
                    priority
                    sizes="100vw"
                  />
                </div>
              </motion.div>

              {/* Description */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-center text-sm md:text-base">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
