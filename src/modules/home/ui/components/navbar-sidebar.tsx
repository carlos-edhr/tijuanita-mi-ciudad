import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
}

export const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
  isAuthenticated,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 bg-blackBackgroundNew border-r border-gray-800"
      >
        <SheetHeader className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="relative w-10 h-10 mr-3">
              <Image
                src="/brand/CIAF8-Logo8.png"
                alt="Congress Logo"
                fill
                className="object-contain"
              />
            </div>
            <SheetTitle className="font-bebas text-2xl text-white">
              CIAF
            </SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex flex-col h-full pb-20">
          <div className="p-6 space-y-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block w-full text-left p-4 text-white hover:bg-gray-800 rounded-lg font-robotoCondensed text-lg uppercase tracking-wider"
                onClick={() => onOpenChange(false)}
              >
                {item.children}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-800 p-6 space-y-4">
            {isAuthenticated ? (
              <Button
                asChild
                className="w-full py-6 bg-azulAstro hover:bg-azulAstro/90 text-black font-robotoCondensed uppercase text-lg"
              >
                <Link href="/admin" onClick={() => onOpenChange(false)}>
                  Panel de control
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 border-azulAstro text-azulAstro hover:bg-gray-800 font-robotoCondensed uppercase text-lg"
                >
                  <Link href="/sign-in" onClick={() => onOpenChange(false)}>
                    Ingresar
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full py-6 bg-azulAstro hover:bg-azulAstro/90 text-black font-robotoCondensed uppercase text-lg"
                >
                  <Link href="/sign-up" onClick={() => onOpenChange(false)}>
                    Registrarse
                  </Link>
                </Button>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
