"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface Props {
  category?: string;
  narrowView?: boolean;
}

export const ProductList = ({ category, narrowView }: Props) => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          category,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-gray-700 flex flex-col items-center justify-center p-12 bg-blackBackgroundNew rounded-lg">
        <InboxIcon className="text-azulAstro w-16 h-16 mb-4" />
        <p className="text-xl font-medium font-robotoCondensed">
          No se encontraron productos
        </p>
        <p className="text-gray-400 mt-2">Intenta con otros filtros</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          narrowView && "lg:grid-cols-3",
        )}
      >
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              username={product.user?.name || "Usuario desconocido"}
              userImg={product.user?.image?.url || null}
              imageUrl={product.image?.url}
              reviewRating={product.reviewRating}
              reviewCount={product.reviewCount}
              price={product.price}
            />
          ))}
      </div>

      <div className="flex justify-center pt-4">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-robotoCondensed font-bold uppercase tracking-wider text-lg py-6 px-10 bg-azulAstro hover:bg-azulAstro/90 text-blackBackgroundNew"
          >
            {isFetchingNextPage ? "Cargando..." : "Cargar más"}
          </Button>
        )}
      </div>
    </div>
  );
};

export const ProductListSkeleton = ({ narrowView }: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        narrowView && "lg:grid-cols-3",
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
