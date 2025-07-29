import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/use-cart-store";

export const useCart = () => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);

  const productIds = useCartStore(
    useShallow((state) => state.productIds || []),
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(productId);
      } else {
        addProduct(productId);
      }
    },
    [addProduct, removeProduct, productIds],
  );

  const isProductInCart = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds],
  );

  return {
    productIds,
    addProduct,
    removeProduct,
    clearCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
