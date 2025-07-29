import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef, useEffect } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  username?: string | null;
  userImg?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  username,
  userImg,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.2,
      ease: "power1.out",
    });

    const handleMouseEnter = () => hoverTl.play();
    const handleMouseLeave = () => hoverTl.reverse();

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/");
  };

  return (
    <div ref={cardRef} className="relative">
      <Link href={`products/${id}`}>
        <div className="border border-gray-700 rounded-lg overflow-hidden bg-blackBackgroundNew transition-all duration-300 h-full flex flex-col group">
          <div className="relative aspect-square">
            {imageUrl ? (
              <Image
                alt={name}
                fill
                src={imageUrl}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                <div className="text-gray-500">Sin imagen</div>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col gap-3 flex-1">
            <h2 className="font-robotoCondensed text-lg font-bold text-white line-clamp-2">
              {name}
            </h2>

            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleUserClick}
            >
              {userImg ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-azulAstro">
                  <Image
                    src={userImg}
                    alt="User image"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs text-gray-300">U</span>
                </div>
              )}
              <p className="text-sm font-medium text-gray-300 underline">
                {username || "Usuario desconocido"}
              </p>
            </div>

            {reviewCount > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        "size-4",
                        i < Math.floor(reviewRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-700 text-gray-700",
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-400">
                  ({reviewCount})
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="px-3 py-1.5 bg-azulAstro w-fit rounded-md">
              <p className="text-base font-bold font-robotoCondensed text-black">
                {formatCurrency(price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-blackBackgroundNew animate-pulse">
      <div className="bg-gray-800 aspect-square w-full" />

      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-700 rounded w-4/5" />
        <div className="flex items-center gap-2">
          <div className="bg-gray-700 rounded-full w-8 h-8" />
          <div className="h-4 bg-gray-700 rounded w-24" />
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-700 rounded" />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="w-20 h-6 bg-gray-700 rounded" />
      </div>
    </div>
  );
};
