"use client";

import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckCheckIcon, LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
// import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const CartButton = dynamic(
  () => import("../components/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 bg-azulAstro/80 text-black">
        Agregar al carrito
      </Button>
    ),
  },
);

interface ProductViewProps {
  productId: string;
}

export const ProductView = ({ productId }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId }),
  );
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.from(container, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="px-4 lg:px-12 py-10 bg-blackBackgroundNew"
    >
      <div className="border border-gray-700 rounded-lg bg-[#191919] overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={data.image?.url || "/placeholder.png"}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          {/* Left Column - Product Details */}
          <div className="col-span-4">
            <div className="p-6 border-b border-gray-700">
              <h1 className="font-bebas text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                {data.name}
              </h1>
            </div>

            {/* Desktop Info Bar */}
            <div className="border-b border-gray-700 flex flex-col md:flex-row">
              <div className="px-6 py-4 flex items-center justify-center md:border-r border-gray-700">
                <div className="px-3 py-1.5 bg-azulAstro rounded-md w-fit">
                  <p className="font-robotoCondensed font-bold text-black text-lg">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-center md:border-r border-gray-700">
                <Link href="/" className="flex items-center gap-2 group">
                  {data.user.image?.url && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-azulAstro">
                      <Image
                        src={data.user.image.url}
                        alt={data.user.name || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="font-robotoCondensed text-white group-hover:text-azulAstro transition-colors">
                    {data.user.name}
                  </p>
                </Link>
              </div>

              <div className="hidden md:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-1">
                  <StarRating
                    rating={data.reviewRating}
                    iconClassName="size-4 text-yellow-400"
                  />
                  <p className="font-robotoCondensed text-gray-400">
                    ({data.reviewCount} calificaciones)
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Info */}
            <div className="block md:hidden px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <StarRating
                    rating={data.reviewRating}
                    iconClassName="size-4 text-yellow-400"
                  />
                  <p className="font-robotoCondensed text-gray-400">
                    ({data.reviewCount})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {data.user.image?.url && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-azulAstro">
                      <Image
                        src={data.user.image.url}
                        alt={data.user.name || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="font-robotoCondensed text-white">
                    {data.user.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 border-b border-gray-700">
              {data.description ? (
                <div className="prose prose-invert max-w-none font-robotoCondensed text-white">
                  <RichText data={data.description} />
                </div>
              ) : (
                <p className="font-robotoCondensed text-gray-400 italic">
                  No se proporcionó descripción
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Actions and Ratings */}
          <div className="col-span-2">
            <div className="border-t border-gray-700 lg:border-t-0 lg:border-l border-gray-700 h-full">
              {/* Action Buttons */}
              <div className="flex flex-col gap-4 p-6 border-b border-gray-700">
                <div className="flex flex-row items-center gap-3">
                  <CartButton
                    isPurchased={data.isPurchased}
                    productId={productId}
                    // className="flex-1 py-6 font-robotoCondensed text-lg font-bold uppercase"
                  />

                  <Button
                    className="size-14 bg-azulAstro hover:bg-azulAstro/90 text-black"
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Enlace copiado al portapapeles");
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 1000);
                    }}
                    disabled={isCopied}
                  >
                    {isCopied ? (
                      <CheckCheckIcon className="size-6" />
                    ) : (
                      <LinkIcon className="size-6" />
                    )}
                  </Button>
                </div>

                <p className="text-center font-robotoCondensed text-gray-400">
                  {data.refundPolicy === "no-refunds"
                    ? "No se aceptan reembolsos"
                    : `Garantía de devolución de ${data.refundPolicy}`}
                </p>
              </div>

              {/* Ratings Section */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bebas text-xl text-white uppercase tracking-wider">
                    Calificaciones
                  </h3>
                  <div className="flex items-center gap-x-1 font-robotoCondensed">
                    <StarIcon className="size-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-white">({data.reviewRating})</p>
                    <p className="text-gray-400">
                      {data.reviewCount} calificaciones
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 mt-4">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <div className="font-robotoCondensed text-white flex items-center">
                        {stars}{" "}
                        <StarIcon className="size-4 text-yellow-400 fill-yellow-400 ml-1" />
                      </div>
                      <Progress
                        value={data.ratingDistribution[stars]}
                        className="h-2 bg-gray-800 [&>div]:bg-azulAstro"
                      />
                      <div className="font-robotoCondensed text-gray-400">
                        {data.ratingDistribution[stars]}%
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
