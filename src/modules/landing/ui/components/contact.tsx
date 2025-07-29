// components/location-section.tsx

"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mounted || !formRef.current) return;

    setLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables not configured");
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden bg-blancoHuesoFondo ">
      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-soft-light" />

      {/* Decorative elements */}
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
        className="absolute left-[10%] top-[15%] h-40 w-40 rounded-full bg-[#fde047]/20 blur-xl"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-kawaiiRT text-4xl text-blackOlive md:text-6xl mb-8">
            <span className="block bg-gradient-to-r from-moradoSecundario to-[#0a33ff] bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-4xl text-lg text-gray-700 md:text-xl text-justify px-4"
          >
            Estamos aquí para responder tus preguntas y escuchar tus ideas.
          </motion.p>
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-kawaiiRT text-4xl text-blackOlive md:text-6xl mb-8">
            <span className="block bg-gradient-to-r from-moradoSecundario to-[#0a33ff] bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-4xl text-lg text-gray-700 md:text-xl justify-center text-justify px-4"
          >
            Estamos aquí para responder tus preguntas y escuchar tus ideas
          </motion.p>
        </motion.div> */}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl h-full">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[#FDE047]/20">
                    <MapPin className="w-8 h-8 text-[#FDE047]" />
                  </div>
                  <div>
                    <h3 className="text-blackOlive text-xl font-bold mb-2">
                      Ubicación
                    </h3>
                    <p className="text-aquamarine">
                      Delegación Playas de Tijuana
                      <br />
                      Playas de Rosarito, B.C.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[#FF6B6B]/20">
                    <Mail className="w-8 h-8 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <h3 className="text-blackOlive text-xl font-bold mb-2">
                      Email
                    </h3>
                    <Link
                      href="mailto:tijuanitamiciudad@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-aquamarine hover:text-jonquil transition-colors">
                        tijuanitamiciudad@gmail.com
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8 rounded-2xl overflow-hidden border-2 border-white/20">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107708.09148592196!2d-117.0886642!3d32.47595855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94a5e62f4acdb%3A0x3b23ad35551e860a!2sPlayas%20De%20Tijuana%2C%20B.C.!5e0!3m2!1ses!2smx!4v1750959707546!5m2!1ses!2smx"
                    height="300"
                    width="100%"
                    loading="lazy"
                    className="border-0"
                    style={{ border: 0 }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl h-full">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-blackOlive block mb-3 text-lg">
                    Nombre completo
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-blackOlive placeholder-cyan-200 h-14 text-lg rounded-xl focus:ring-2 focus:ring-[#FDE047]"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className="text-blackOlive block mb-3 text-lg">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-blackOlive placeholder-cyan-200 h-14 text-lg rounded-xl focus:ring-2 focus:ring-[#FDE047]"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-blackOlive block mb-3 text-lg">
                    Mensaje
                  </label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-blackOlive placeholder-cyan-200 h-40 text-lg rounded-xl focus:ring-2 focus:ring-[#FDE047]"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#FDE047] to-[#f59e0b] text-gray-900 text-lg py-6 rounded-xl font-bold hover:from-[#f59e0b] hover:to-[#FDE047] transition-all mt-4"
                >
                  {loading ? (
                    "Enviando..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" /> Enviar Mensaje
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 bottom-8 h-32 w-32 rounded-full bg-[#4ECDC4]/20"
      />
    </section>
  );
}
