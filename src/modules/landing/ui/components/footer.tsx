"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="z-40 relative overflow-hidden bg-gradient-to-br from-[#FDE047] to-[#F59E0B] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Columna 1 */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-luckiest_guy text-2xl text-gray-900">
              Transformando Espacios
            </h3>
            <p className="text-gray-800">
              Creando oportunidades de juego y crecimiento para la infancia en
              Tijuana
            </p>
          </motion.div>

          {/* Columna 2 */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="font-luckiest_guy text-xl text-gray-900">
              Contacto
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-800">
                <Mail className="h-5 w-5" />
                <span>contacto@tijuanita.org</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <Phone className="h-5 w-5" />
                <span>(664) 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin className="h-5 w-5" />
                <span>Centro Comunitario, Tijuana</span>
              </div>
            </div>
          </motion.div>

          {/* Columna 3 */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h4 className="font-luckiest_guy text-xl text-gray-900">
              Síguenos
            </h4>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/tijuanita_mi_ciudad/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-900/10 hover:bg-gray-900/20"
                >
                  <Instagram className="h-6 w-6 text-gray-900" />
                </Button>
              </Link>
              <Link href="https://www.facebook.com/people/Tijuanita-Mi-Ciudad/61574985633708/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-900/10 hover:bg-gray-900/20"
                >
                  <Facebook className="h-6 w-6 text-gray-900" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Columna 4 */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <h4 className="font-luckiest_guy text-xl text-gray-900">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/privacidad"
                className="text-gray-800 hover:text-gray-900 transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-gray-800 hover:text-gray-900 transition-colors"
              >
                Términos de Servicio
              </Link>
              <Link
                href="/transparencia"
                className="text-gray-800 hover:text-gray-900 transition-colors"
              >
                Información Transparente
              </Link>
            </nav>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="my-8 h-px bg-gray-900/20"
        />

        {/* Créditos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-800"
        >
          <p>
            © {new Date().getFullYear()} Tijuanita Mi Ciudad. Todos los
            derechos reservados.
            <br />
            Desarrollado con ❤️ por{" "}
            <Link
              href="https://www.carlos-ehr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold "
            >
              <span className="text-sky-600 hover:text-sky-700 transition-colors">
                carlos-ehr.com
              </span>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
