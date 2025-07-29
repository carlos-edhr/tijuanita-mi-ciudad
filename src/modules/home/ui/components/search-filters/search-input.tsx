import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange]);

  return (
    <div className="flex items-center gap-3 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="relative w-full">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
        <Input
          className="pl-12 pr-4 py-6 bg-gray-800 border-gray-700 text-white placeholder-gray-500 font-robotoCondensed rounded-lg focus-visible:ring-2 focus-visible:ring-azulAstro focus:border-transparent"
          placeholder="Buscar contenido..."
          disabled={disabled}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        className="size-14 shrink-0 flex lg:hidden bg-gray-800 border-gray-700 hover:bg-gray-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon className="size-5 text-white" />
      </Button>

      {session.data?.user && (
        <Button
          asChild
          className="bg-azulAstro hover:bg-azulAstro/90 text-black px-4 py-6 font-robotoCondensed uppercase hidden lg:flex"
        >
          <Link prefetch href="/library">
            <BookmarkCheckIcon className="mr-2 size-5" />
            Biblioteca
          </Link>
        </Button>
      )}
    </div>
  );
};
