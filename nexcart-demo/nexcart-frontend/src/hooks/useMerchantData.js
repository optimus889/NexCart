import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/api/productApi";
import {
  getMerchantOrders,
  getMerchantWallet,
  receiveMerchantPayment,
  toggleMerchantProduct,
  updateMerchantOrderStatus,
  withdrawMerchantFunds,
} from "@/api/merchantApi";

export function useMerchantData(enabled) {
  const [products, setProducts] = useState([]);
  const [merchantBalance, setMerchantBalance] = useState(3420.5);
  const [orders, setOrders] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [walletLoading, setWalletLoading] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isUpdatingOrderStatus, setIsUpdatingOrderStatus] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const load = async () => {
      try {
        setIsLoadingOrders(true);

        const [productData, walletData, orderData] = await Promise.all([
          getProducts(),
          getMerchantWallet(),
          getMerchantOrders(),
        ]);

        setProducts(productData.items || []);
        setOrders(orderData.items || []);

        if (typeof walletData.balance === "number") {
          setMerchantBalance(walletData.balance);
        }
      } catch (err) {
        console.error("Failed to load merchant data", err);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    load();
  }, [enabled]);

  const visibleProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const toggleProductStatus = async (id) => {
    try {
      setIsUpdatingProduct(id);
      const data = await toggleMerchantProduct(id);
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? data.item : item))
      );
    } catch (err) {
      console.error("Failed to update product status", err);
    } finally {
      setIsUpdatingProduct(null);
    }
  };

  const handleWithdraw = async () => {
    try {
      setWalletLoading(true);
      const data = await withdrawMerchantFunds({ amount: 200 });

      if (typeof data.balance === "number") {
        setMerchantBalance(data.balance);
      }
    } catch (err) {
      console.error("Withdraw failed", err);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleMerchantPayment = async () => {
    try {
      setWalletLoading(true);
      const data = await receiveMerchantPayment({ amount: 500 });

      if (typeof data.balance === "number") {
        setMerchantBalance(data.balance);
      }
    } catch (err) {
      console.error("Receive payment failed", err);
    } finally {
      setWalletLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setIsUpdatingOrderStatus(orderId);

      const data = await updateMerchantOrderStatus(orderId, { status });

      setOrders((prev) =>
        prev.map((item) =>
          item.id === orderId
            ? {
                ...item,
                status: data.item?.status || status,
                updatedAt: data.item?.updatedAt || item.updatedAt,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Update order status failed", err);
    } finally {
      setIsUpdatingOrderStatus(null);
    }
  };

  return {
    products,
    visibleProducts,
    merchantBalance,
    orders,
    searchTerm,
    setSearchTerm,
    walletLoading,
    isUpdatingProduct,
    isLoadingOrders,
    isUpdatingOrderStatus,
    toggleProductStatus,
    handleWithdraw,
    handleMerchantPayment,
    updateOrderStatus,
  };
}