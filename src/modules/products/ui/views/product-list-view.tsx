import { Suspense } from "react";
import { ProductFilters } from "../components/product-filters";
import { ProductList, ProductListSkeleton } from "../components/product-list";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export const ProductListView = ({ category, narrowView }: Props) => {
  return (
    <div className="px-4 lg:px-8 py-8 flex flex-col gap-6 bg-[#191919] text-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-4 lg:gap-y-0 justify-between">
        <div>
          <h2 className="font-bebas text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
            NUESTRO CONTENIDO
          </h2>
          <div className="w-24 h-1 bg-azulAstro rounded mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <div className="p-4 border border-gray-700 rounded-lg bg-blackBackgroundNew">
            <p className="font-robotoCondensed text-lg font-semibold mb-4 text-azulAstro">
              FILTROS
            </p>
            <ProductFilters />
          </div>
        </div>

        <div className="lg:col-span-4">
          <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
            <ProductList category={category} narrowView={narrowView} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
