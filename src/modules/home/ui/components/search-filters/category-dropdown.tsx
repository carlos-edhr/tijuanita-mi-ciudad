// Assuming this component exists and needs updating
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string | null;
    subcategories?: Array<{
      id: string;
      name: string;
      slug: string;
      color?: string | null;
    }>;
  };
  isActive: boolean;
  isNavigationHovered: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  // isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "h-11 px-4 rounded-lg text-white font-robotoCondensed uppercase text-base tracking-wider",
            isActive
              ? "bg-azulAstro text-black hover:bg-azulAstro/90"
              : "bg-gray-800 hover:bg-gray-700 border border-gray-700",
          )}
        >
          {category.name}
          {hasSubcategories && (
            <ChevronDownIcon
              className={cn(
                "ml-2 size-4 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      {hasSubcategories && (
        <DropdownMenuContent
          className="min-w-[200px] bg-gray-800 border border-gray-700 rounded-lg p-2"
          align="start"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {category.subcategories?.map((subcategory) => (
            <DropdownMenuItem key={subcategory.id} className="p-0" asChild>
              <Link
                href={`/${category.slug}/${subcategory.slug}`}
                className={cn(
                  "block px-4 py-3 rounded-md hover:bg-gray-700 text-white font-robotoCondensed w-full text-left",
                )}
              >
                {subcategory.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
