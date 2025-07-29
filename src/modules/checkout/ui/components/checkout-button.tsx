import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
}

export const CheckoutButton = ({
  className,
  hideIfEmpty,
}: CheckoutButtonProps) => {
  const { totalItems } = useCart();

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant="elevated" asChild className={cn("bg-white", className)}>
      <Link href="/checkout">
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};
