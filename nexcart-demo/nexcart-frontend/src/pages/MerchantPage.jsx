import ProtectedShell from "@/components/common/ProtectedShell";
import MerchantDashboard from "@/components/merchant/MerchantDashboard";

export default function MerchantPage({ onLogout, data, profile }) {
  return (
    <ProtectedShell onLogout={onLogout}>
      <MerchantDashboard {...data} profile={profile} />
    </ProtectedShell>
  );
}