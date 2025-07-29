"use client";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const SignUpView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.pathFilter());
        router.push("/admin");
      },
    }),
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;
  const showPreview = username && !usernameErrors;

  return (
    <div className="min-h-screen w-full bg-blancoHuesoFondo flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
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

      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-40 h-16 mb-6">
              <Image
                src="/images/landing/navbar2.png"
                alt="Tijuanita mi ciudad"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blackOlive">
              Únete a nuestra comunidad
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Crea una cuenta para comenzar
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Nombre de usuario
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
                        />
                      </FormControl>
                      {!fieldState.error && fieldState.isDirty && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {showPreview && (
                      <p className="text-sm text-gray-500 mt-1">
                        Tu URL será: tijuanitamiciudad.com/@{username}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Correo electrónico
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
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-blackOlive">
                      Contraseña
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className={cn(
                            "bg-white border-gray-300 rounded-xl py-6 px-4 pr-10",
                            fieldState.error && "border-red-500",
                            !fieldState.error &&
                              fieldState.isDirty &&
                              "border-green-500",
                          )}
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

              <Button
                disabled={register.isPending}
                type="submit"
                size="lg"
                className="mt-4 rounded-xl bg-gradient-to-r from-moradoSecundario to-[#0a33ff] text-white text-lg font-bold py-6 hover:opacity-90 transition-opacity"
              >
                Crear cuenta
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/sign-in"
                className="text-moradoSecundario font-semibold hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
