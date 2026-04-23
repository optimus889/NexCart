import ProtectedShell from "@/components/common/ProtectedShell";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage({ onLogout, data, profile }) {
  return (
    <ProtectedShell onLogout={onLogout}>
      <AdminDashboard {...data} profile={profile} />
    </ProtectedShell>
  );
}