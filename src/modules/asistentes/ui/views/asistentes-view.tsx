// asistentes-view.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { asistenteSchema } from "../../schema";
import type { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const AsistentesView = () => {
  const trpc = useTRPC();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate } = useMutation(
    trpc.asistentes.create.mutationOptions({
      onSuccess: () => {
        toast.success("¡Registro exitoso! Gracias por inscribirte");
        setShowSuccess(true);
        setIsSubmitting(false);
        form.reset();
      },
    }),
  );

  const form = useForm<z.infer<typeof asistenteSchema>>({
    resolver: zodResolver(asistenteSchema),
    mode: "all", // Validación en cada cambio
    defaultValues: {
      email: "",
      acompañanteMenorDeEdad: false,
      cantidadAcompañanteMenorDeEdad: 0,
      edadesMenoresDeEdad: null,
      poblacionesPrioritarias: null,
      zonaCiudad: "",
      comoSeEntero: null,
      participacionPrevia: "",
      comentario: "",
    },
  });

  const onSubmit = (values: z.infer<typeof asistenteSchema>) => {
    if (values.acompañanteMenorDeEdad === false) {
      values.cantidadAcompañanteMenorDeEdad = 0;
      values.edadesMenoresDeEdad = "no aplica";
    }
    setIsSubmitting(true);
    mutate(values);
  };

  const isAcompanante = form.watch("acompañanteMenorDeEdad");

  // Función para prevenir caracteres no numéricos
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permitir: backspace, delete, tab, escape, enter, flechas
      if (
        [8, 9, 13, 27, 37, 38, 39, 40].includes(e.keyCode) ||
        // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode))
      ) {
        return;
      }

      // Prevenir todo excepto números
      if ((e.key < "0" || e.key > "9") && e.key !== "Tab") {
        e.preventDefault();
      }
    },
    [],
  );

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
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-blackOlive mb-4">
              ¡Registro Exitoso!
            </h2>
            <p className="text-gray-700 mb-6">
              Gracias por registrarte como asistente a la Vía Recreativa.
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
              Registro para Asistentes
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Completa el formulario para registrarte en la Vía Recreativa
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
                      Correo electrónico *
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

              {/* Acompañante de menor */}
              <FormField
                name="acompañanteMenorDeEdad"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem
                    className={cn(
                      "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
                      fieldState.error && "border-red-500",
                      !fieldState.error &&
                        fieldState.isDirty &&
                        "border-green-500",
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none flex items-center">
                      <FormLabel>
                        ¿Viene en compañía de un menor de edad?
                      </FormLabel>
                      {!fieldState.error && fieldState.isDirty && (
                        <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                      )}
                    </div>
                  </FormItem>
                )}
              />

              {/* Campos condicionales para acompañantes */}
              {isAcompanante && (
                <>
                  <FormField
                    name="cantidadAcompañanteMenorDeEdad"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-blackOlive">
                          Número de menores de edad *
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              step="1"
                              onKeyDown={handleKeyDown}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Convertir a número entero positivo
                                if (value === "") {
                                  field.onChange(null);
                                } else {
                                  const numValue = Math.max(
                                    1,
                                    parseInt(value, 10),
                                  );
                                  field.onChange(numValue);
                                }
                              }}
                              value={field.value || ""}
                              className={cn(
                                "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                                fieldState.error && "border-red-500",
                                !fieldState.error &&
                                  fieldState.isDirty &&
                                  "border-green-500",
                              )}
                              placeholder="Ej: 2"
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

                  <FormField
                    name="edadesMenoresDeEdad"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-blackOlive">
                          Edades de los menores *
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
                                <SelectValue placeholder="Selecciona las edades" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                "0 a 11 meses",
                                "1 a 3 años",
                                "4 a 6 años",
                                "7 a 13 años",
                                "14 a 17 años",
                                "no aplica",
                              ].map((opcion) => (
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
                </>
              )}

              {/* Poblaciones prioritarias */}
              <FormField
                name="poblacionesPrioritarias"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      ¿Asiste alguna persona dentro de poblaciones prioritarias?
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
                          {[
                            "No",
                            "Persona con discapacidad",
                            "Embarazada",
                            "Persona adulta mayor",
                          ].map((opcion) => (
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

              {/* Zona de la ciudad */}
              <FormField
                name="zonaCiudad"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Zona de la ciudad donde vive
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
                          placeholder="Ej: Zona Centro, Playas, etc."
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

              {/* Cómo se enteró */}
              <FormField
                name="comoSeEntero"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      ¿Cómo se enteró del evento?
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
                          {[
                            "Instagram",
                            "Facebook",
                            "Póster",
                            "Invitación de la escuela",
                            "Recomendación de boca en boca",
                            "Otro",
                          ].map((opcion) => (
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

              {/* Participación previa */}
              <FormField
                name="participacionPrevia"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      ¿Ha participado en eventos anteriores?
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          {...field}
                          className={cn(
                            "bg-white border-gray-300 rounded-xl p-4 min-h-[100px] pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="Cuéntanos tu experiencia previa..."
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Comentario adicional */}
              <FormField
                name="comentario"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      ¿Pregunta o comentario adicional?
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          {...field}
                          className={cn(
                            "bg-white border-gray-300 rounded-xl p-4 min-h-[100px] pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
                          placeholder="Escribe aquí tus comentarios..."
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute top-3 right-3">
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
                {isSubmitting ? "Enviando..." : "Registrarme"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};
