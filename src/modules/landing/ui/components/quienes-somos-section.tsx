"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    name: "Tamara",
    role: "Licenciada en Turismo y mamá",
    description:
      "Soy Tamara, licenciada en Turismo y mamá. En 2024, al vivir la primera vía recreativa de Tijuanita Mi Ciudad, recordé lo valioso de tener espacios seguros para jugar y convivir. Por eso me sumé a este proyecto, convencida de que la movilidad libre, la salud mental y el derecho de l@s niñ@s a disfrutar su ciudad deben ser una prioridad. Las vías recreativas son una oportunidad para reconectar con nuestra comunidad y fortalecer el amor por Tijuana.",
    image: "/images/landing/quienesomos1.png",
    color: "#4ECDC4",
  },
  {
    name: "Ana",
    role: "Psicóloga socioambiental",
    description:
      "Soy Ana Karen, psicóloga socioambiental con interés en la educación y el desarrollo humano. Colaboro en Tijuanita para pasar de solo imaginar a poder crear espacios restauradores que promuevan derechos humanos y calidad de vida, mientras conocemos el mundo para enseñarnos a habitarlo con más amor.",
    image: "/images/landing/quienesomos2.png",
    color: "#FDE047",
  },
  {
    name: "Ivonne",
    role: "Diseñadora y activista",
    description:
      "Soy Ivonne, diseñadora y activista en temas de movilidad con perspectiva de género. Desde la seguridad vial, la justicia espacial y el cuidado nace mi impulso por abrir espacios de encuentro, juego y creatividad.",
    image: "/images/landing/quienesomos3.png",
    color: "#FF6B6B",
  },
];

export function QuienesSomosSection() {
  return (
    <section
      id="quienessomos"
      className="relative overflow-hidden bg-blancoHuesoFondo py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[url('/images/textures/noise.jpg')] opacity-10 mix-blend-soft-light" />

      {/* New decorative elements with varied shapes and animations */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[10%] top-[15%] h-40 w-40 rounded-full bg-[#4ECDC4]/20 blur-xl"
      />

      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, 45, 90, 135, 180],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[15%] top-[25%] h-24 w-24 bg-[#FF6B6B]/30 blur-lg"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          borderRadius: ["50%", "30%", "50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[20%] bottom-[20%] h-32 w-32 bg-[#FDE047]/30 blur-xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[10%] bottom-[15%] h-20 w-20 bg-[#4ECDC4]/30 blur-lg"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 30, 0],
          borderRadius: ["30%", "50%", "30%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[15%] top-[35%] h-16 w-16 bg-[#FF6B6B]/30 blur-lg"
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
              ¿Quiénes somos?
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-4xl text-lg text-gray-700 md:text-xl text-justify px-4"
          >
            Actividades organizadas por personas voluntarias de manera
            autogestivas, sin fines de lucro, partidistas o religiosos.
          </motion.p>
        </motion.div>

        {/* Team Grid - Three cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-3xl bg-white/90 p-6 backdrop-blur-lg shadow-2xl"
            >
              {/* Profile image */}
              <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Image overlay gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  style={{
                    background: `linear-gradient(to top, ${member.color}40 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Member info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>

                <div
                  className="inline-block rounded-full px-4 py-1 mb-4 text-sm font-semibold"
                  style={{
                    backgroundColor: `${member.color}20`,
                    color: member.color,
                  }}
                >
                  {member.role}
                </div>

                <p className="text-gray-600 mb-6 text-justify">
                  {member.description}
                </p>
              </div>

              {/* Animated decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 h-16 w-16 rounded-full"
                style={{
                  backgroundColor: `${member.color}20`,
                  border: `3px solid ${member.color}20`,
                  zIndex: -1,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-3 -left-3 h-12 w-12"
                style={{
                  backgroundColor: `${member.color}20`,
                  border: `3px solid ${member.color}20`,
                  zIndex: -1,
                }}
                animate={{
                  y: [0, -10, 0],
                  x: [0, 8, 0],
                  borderRadius: ["30%", "50%", "30%"],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          {/*TODO: AGREGAR COLABORACIONES */}
          {/* <Button className="inline-flex animate-shine items-center justify-center rounded-2xl bg-gradient-to-r from-[#4F46E5] via-[#0a33ff] to-[#4F46E5] bg-[length:200%_auto] px-8 py-6 text-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg">
            Conoce a todo el equipo
          </Button> */}
        </motion.div>
      </div>
    </section>
  );
}
