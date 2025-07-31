// voluntarios/voluntarios-view.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

import type { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { voluntarioSchema } from "../../schema";

export const VoluntariosView = () => {
  const trpc = useTRPC();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const comoSeEnteroOptions = [
    "Fui voluntarix en la 2da edición (Mayo 2025)",
    "Invitación del equipo organizador",
    "Redes sociales",
    "UABC",
    "IBERO",
    "Otro",
  ];

  const equipoOptions = [
    "REGISTRO",
    "SEGURIDAD",
    "MONTAJE-DESMONTAJE",
    "CONVIVENCIA",
  ];

  const disponibilidadOptions = [
    "Estoy de acuerdo",
    "En desacuerdo",
    "Me comunicaré con la coordinadora para revisar mi caso particular",
  ];

  const capacitacion1Options = [
    "De acuerdo",
    "Me comunicaré para resolver si no puedo en esta fecha.",
  ];

  const capacitacion2Options = [
    "Tengo mayor disponibilidad en la mañana (10am a 12pm)",
    "Tengo mayor disponibilidad en la tarde (12pm a 14pm)",
    "Tengo mayor disponibilidad de las 14pm en adelante",
  ];

  const { mutate } = useMutation(
    trpc.voluntarios.create.mutationOptions({
      onSuccess: () => {
        toast.success(
          "¡Registro exitoso! Gracias por inscribirte como voluntario",
        );
        setShowSuccess(true);
        setIsSubmitting(false);
        form.reset();
      },
    }),
  );

  const form = useForm<z.infer<typeof voluntarioSchema>>({
    resolver: zodResolver(voluntarioSchema),
    mode: "all",
    defaultValues: {
      email: "",
      name: "",
      telefono: "",
      edad: 0,
      ocupacion: "",
      comoSeEntero: undefined,
      equipo: undefined,
      confirmacionDeDisponibilidad: undefined,
      capacitacion1: undefined,
      capacitacion2: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof voluntarioSchema>) => {
    setIsSubmitting(true);
    mutate(values);
  };

  if (showSuccess) {
    return (
      <div className="pb-32 min-h-screen w-full bg-blancoHuesoFondo flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-blackOlive mb-4">
              ¡Registro Exitoso!
            </h2>
            <p className="text-gray-700 mb-6">
              Gracias por registrarte como voluntario/a en la Vía Recreativa.
            </p>
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-moradoSecundario hover:bg-moradoSecundario/90 text-white py-6 rounded-xl text-lg font-bold"
            >
              Volver al inicio
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-blancoHuesoFondo flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos flotantes */}
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

      <div className="w-full max-w-2xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-40 h-16 mb-6">
              <Link href="/">
                <Image
                  src="/images/landing/navbar2.png"
                  alt="Tijuanita mi ciudad"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blackOlive">
              Registro para Voluntarios
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Completa el formulario para registrarte como voluntario/a
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Correo electrónico:
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          className={cn(
                            "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="tu@correo.com"
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nombre */}
              <FormField
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Nombre y apellido:
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          className={cn(
                            "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="Tu nombre completo"
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Teléfono */}
              <FormField
                name="telefono"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Número de celular:{" "}
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          className={cn(
                            "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="Número de teléfono"
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Edad */}
              <FormField
                name="edad"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">Edad</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          className={cn(
                            "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="Tu edad"
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ocupación */}
              <FormField
                name="ocupacion"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      ¿A qué te dedicas?{" "}
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          className={cn(
                            "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="Tu ocupación"
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ¿Cómo se enteró? */}
              <FormField
                name="comoSeEntero"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      ¿Cómo te enteraste del voluntariado?:
                    </FormLabel>
                    <div className="relative">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                              fieldState.error && "border-red-500",
                              !fieldState.error &&
                                fieldState.isDirty &&
                                "border-green-500",
                            )}
                          >
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {comoSeEnteroOptions.map((opcion) => (
                            <SelectItem key={opcion} value={opcion}>
                              {opcion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Equipo de interés */}
              <FormField
                name="equipo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive flex flex-col">
                      ¿En qué equipo te interesaría participar?{" "}
                      <p>
                        REGISTRO. Comunicación con asistentes, con equipo
                        organizador y seguridad. Registro audiovisual.
                        Habilidades: Organización, comunicación, paciencia para
                        dar instrucciones. Faltan 3 personas
                      </p>
                      <p>
                        SEGURIDAD. Apoyo en protocolos y rondines de seguridad
                        dentro del área de juego y entorno. Habilidades:
                        Observación, atención, comunicación asertiva, resolver
                        conflictos pacíficamente.
                      </p>
                      <p>
                        MONTAJE Y DESMONTAJE: mobiliario de seguridad y
                        señaletica. Apoyo en la instalación de carpas.
                        Habilidades: Trabajo en equipo, seguir instrucciones,
                        armar y desarmar objetos. Faltan 7 personas
                      </p>
                      <p>
                        CONVIVENCIA. Animación y anuncios. Promover los acuerdos
                        pactados con asistentes y vecinos. Difundir encuesta de
                        percepción. Faltan 3 personas.
                      </p>
                    </FormLabel>
                    <div className="relative">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                              fieldState.error && "border-red-500",
                              !fieldState.error &&
                                fieldState.isDirty &&
                                "border-green-500",
                            )}
                          >
                            <SelectValue placeholder="Selecciona un equipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {equipoOptions.map((opcion) => (
                            <SelectItem key={opcion} value={opcion}>
                              {opcion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmación de disponibilidad */}
              <FormField
                name="confirmacionDeDisponibilidad"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Disponibilidad: Es necesario estar disponible de 7:30 a
                      14:30 horas. Se brindará un lunch e identificativo.
                      Coordinaremos rotación y descansos.
                    </FormLabel>
                    <div className="relative">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                              fieldState.error && "border-red-500",
                              !fieldState.error &&
                                fieldState.isDirty &&
                                "border-green-500",
                            )}
                          >
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {disponibilidadOptions.map((opcion) => (
                            <SelectItem key={opcion} value={opcion}>
                              {opcion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Capacitación 1 */}
              <FormField
                name="capacitacion1"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Primera capacitación: La primera capacitación será virtual
                      el día Sabado 9 de Agosto a las 10:00 am.
                    </FormLabel>
                    <div className="relative">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                              fieldState.error && "border-red-500",
                              !fieldState.error &&
                                fieldState.isDirty &&
                                "border-green-500",
                            )}
                          >
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {capacitacion1Options.map((opcion) => (
                            <SelectItem key={opcion} value={opcion}>
                              {opcion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Capacitación 2 */}
              <FormField
                name="capacitacion2"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Segunda capacitación: La segunda capacitación será
                      presencial (en la vía recreativa) en Playas de Tijuana el
                      día Domingo 24 de Agosto.
                    </FormLabel>
                    <div className="relative">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                              fieldState.error && "border-red-500",
                              !fieldState.error &&
                                fieldState.isDirty &&
                                "border-green-500",
                            )}
                          >
                            <SelectValue placeholder="Selecciona un horario" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {capacitacion2Options.map((opcion) => (
                            <SelectItem key={opcion} value={opcion}>
                              {opcion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isSubmitting}
                type="submit"
                size="lg"
                className={cn(
                  "w-full mt-4 rounded-xl bg-gradient-to-r from-moradoSecundario to-[#0a33ff]",
                  "text-white text-lg font-bold py-6 hover:opacity-90 transition-opacity",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "",
                )}
              >
                {isSubmitting ? "Enviando..." : "Registrarme como voluntario/a"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};
