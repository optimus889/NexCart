import { useEffect, useState } from "react";
import {
  getAdminAlerts,
  getAdminDashboard,
  getAdminOrders,
  getAdminProducts,
  getAdminUsers,
  resolveAdminAlert,
} from "@/api/adminApi";

export function useAdminData(enabled) {
  const [platformAlerts, setPlatformAlerts] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [isResolvingAlert, setIsResolvingAlert] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const load = async () => {
      try {
        setIsLoadingAlerts(true);
        setIsLoadingUsers(true);
        setIsLoadingDashboard(true);

        const [alertData, dashboardData, userData, orderData, productData] =
          await Promise.all([
            getAdminAlerts(),
            getAdminDashboard(),
            getAdminUsers(),
            getAdminOrders(),
            getAdminProducts(),
          ]);

        setPlatformAlerts(alertData.items || []);
        setDashboard(dashboardData || null);
        setUsers(userData.items || []);
        setOrders(orderData.items || []);
        setProducts(productData.items || []);
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setIsLoadingAlerts(false);
        setIsLoadingUsers(false);
        setIsLoadingDashboard(false);
      }
    };

    load();
  }, [enabled]);

  const resolveAlert = async (id) => {
    try {
      setIsResolvingAlert(id);
      const data = await resolveAdminAlert(id);

      setPlatformAlerts((prev) =>
        prev.map((item) => (item.id === id ? data.item : item))
      );
    } catch (err) {
      console.error("Resolve alert failed", err);
    } finally {
      setIsResolvingAlert(null);
    }
  };

  return {
    platformAlerts,
    dashboard,
    users,
    orders,
    products,
    isLoadingAlerts,
    isLoadingUsers,
    isLoadingDashboard,
    isResolvingAlert,
    resolveAlert,
  };
}