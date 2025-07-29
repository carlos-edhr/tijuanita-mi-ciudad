"use client";
// components/LogoCarousel.tsx
import React from "react";
import MarQuee from "react-fast-marquee";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const logos = [
  { url: "/images/logos-colaboradores/1.Delegación sin fondo.png" },
  { url: "/images/logos-colaboradores/2. EMC.png" },
  { url: "/images/logos-colaboradores/3. liga peatonal sin fondo.png" },
  { url: "/images/logos-colaboradores/4. Centro 32 sin fondo.png" },
  { url: "/images/logos-colaboradores/5. Circulo de Aikido sin fondo.png" },
  { url: "/images/logos-colaboradores/6.CTA.png" },
  { url: "/images/logos-colaboradores/7. gran vida sin fondo.png" },
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="relative w-full h-[150px] mt-10 ">
      <div className="relative w-full h-full overflow-hidden flex justify-center">
        <div className="absolute w-[50%] h-full">
          <MarQuee
            direction="left"
            speed={30}
            gradient={false}
            className="flex items-center"
          >
            {logos.map((logo, index) => (
              <LogoItem key={index} logo={logo.url} />
            ))}
          </MarQuee>
        </div>
      </div>
    </div>
  );
};

interface LogoItemProps {
  logo: string;
}

const LogoItem: React.FC<LogoItemProps> = ({ logo }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the logo is visible
  });

  return (
    <div
      ref={ref}
      className={`mx-4 flex justify-center items-center transition-opacity duration-500 ${
        inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <Image
        src={logo}
        alt="Logo"
        width={120}
        height={120}
        className="object-contain "
      />
    </div>
  );
};
export default LogoCarousel;
