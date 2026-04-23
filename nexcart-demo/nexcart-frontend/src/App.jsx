import AuthPage from "@/pages/AuthPage";
import CustomerPage from "@/pages/CustomerPage";
import MerchantPage from "@/pages/MerchantPage";
import AdminPage from "@/pages/AdminPage";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerData } from "@/hooks/useCustomerData";
import { useMerchantData } from "@/hooks/useMerchantData";
import { useAdminData } from "@/hooks/useAdminData";

export default function App() {
  const auth = useAuth();

  const customerData = useCustomerData(auth.loggedInRole === "customer");
  const merchantData = useMerchantData(auth.loggedInRole === "merchant");
  const adminData = useAdminData(auth.loggedInRole === "admin");

  if (!auth.loggedInRole) {
    return <AuthPage {...auth} />;
  }

  if (auth.loggedInRole === "customer") {
    return (
      <CustomerPage
        onLogout={auth.handleLogout}
        profile={auth.activeProfile}
        data={{
          ...customerData,
          removeCartItem: customerData.removeCartProduct,
          onConfirmPayment: () => customerData.confirmPayment(auth.activeProfile),
        }}
      />
    );
  }

  if (auth.loggedInRole === "merchant") {
    return (
      <MerchantPage
        onLogout={auth.handleLogout}
        profile={auth.activeProfile}
        data={merchantData}
      />
    );
  }

  return (
    <AdminPage
      onLogout={auth.handleLogout}
      profile={auth.activeProfile}
      data={adminData}
    />
  );
}