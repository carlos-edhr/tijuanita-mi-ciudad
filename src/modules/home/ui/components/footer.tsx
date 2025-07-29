import Image from "next/image";
import { Facebook, Youtube, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-blackBackgroundNew text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/CIAF7 Logo-33.png"
                  alt="Congress Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bebas text-2xl uppercase tracking-wider">
                CONGRESO INTERNACIONAL DE ASTROFOTOGRAFÍA
              </h3>
            </div>

            <p className="font-robotoCondensed text-gray-400 text-center md:text-left max-w-md">
              Evento pionero en México fundado para reunir a profesionales y
              amantes de la Astrofotografía y Astronomía.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {[
                {
                  icon: <Facebook size={20} />,
                  href: "https://www.facebook.com/ifnastro",
                },
                {
                  icon: <Youtube size={20} />,
                  href: "https://www.youtube.com/@ifnastro/videos",
                },
                {
                  icon: <Instagram size={20} />,
                  href: "https://www.instagram.com/ifnastro/",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-azulAstro p-3 rounded-full transition-all hover:bg-white hover:text-black"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="font-robotoCondensed text-gray-500 text-sm">
              © {new Date().getFullYear()} Congreso Internacional de
              Astrofotografía. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
