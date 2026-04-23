import { useEffect, useMemo, useState } from "react";
import { addCartItem, createCustomerOrder, getCart, getCustomerOrders, removeCartItem, updateCartItem } from "@/api/customerApi";
import { getProducts } from "@/api/productApi";

export function useCustomerData(enabled) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const load = async () => {
      try {
        setIsLoadingProducts(true);
        setIsLoadingCart(true);
        setIsLoadingOrders(true);

        const [productData, cartData, orderData] = await Promise.all([
          getProducts(),
          getCart(),
          getCustomerOrders(),
        ]);

        setProducts(productData.items || []);
        setCart(cartData.items || []);
        setOrders(orderData.items || []);
      } finally {
        setIsLoadingProducts(false);
        setIsLoadingCart(false);
        setIsLoadingOrders(false);
      }
    };

    load();
  }, [enabled]);

  const visibleProducts = useMemo(() => {
    return products
      .filter((p) => p.status === "Active")
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]);

  const totalCart = cart
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  const addToCart = async (product) => {
    const data = await addCartItem({
      productId: product.id,
      quantity: 1,
    });
    setCart(data.items || []);
  };

  const updateCartQuantity = async (productId, quantity) => {
    const data = await updateCartItem(productId, { quantity });
    setCart(data.items || []);
  };

  const removeCartProduct = async (productId) => {
    const data = await removeCartItem(productId);
    setCart(data.items || []);
  };

  const confirmPayment = async (profile) => {
    if (cart.length === 0) {
      setCheckoutMessage("Your cart is empty.");
      return;
    }

    try {
      setCheckoutLoading(true);
      setCheckoutMessage("");

      const data = await createCustomerOrder({
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity || 1,
        })),
        billingAddress: profile?.address || "Demo billing address",
        paymentMethod: "card",
      });

      setCheckoutMessage(data.message || "Order placed successfully.");
      setCart([]);
      if (data.order) {
        setOrders((prev) => [data.order, ...prev]);
      }
    } catch (err) {
      setCheckoutMessage(err.message || "Payment failed.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return {
    products,
    visibleProducts,
    cart,
    orders,
    searchTerm,
    setSearchTerm,
    totalCart,
    isLoadingProducts,
    isLoadingCart,
    isLoadingOrders,
    checkoutLoading,
    checkoutMessage,
    addToCart,
    updateCartQuantity,
    removeCartProduct,
    confirmPayment,
  };
}