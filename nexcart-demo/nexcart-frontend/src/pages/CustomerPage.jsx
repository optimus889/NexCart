import ProtectedShell from "@/components/common/ProtectedShell";
import CustomerDashboard from "@/components/customer/CustomerDashboard";

export default function CustomerPage({ onLogout, data, profile }) {
  return (
    <ProtectedShell onLogout={onLogout}>
      <CustomerDashboard {...data} profile={profile} />
    </ProtectedShell>
  );
}