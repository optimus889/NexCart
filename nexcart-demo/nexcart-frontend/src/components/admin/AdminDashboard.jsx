import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOverviewPanel from "./AdminOverviewPanel";
import AdminAlertsPanel from "./AdminAlertsPanel";
import AdminProfile from "./AdminProfile";
import AdminUsersPanel from "./AdminUsersPanel";

export default function AdminDashboard(props) {
  return (
    <Tabs defaultValue="operations" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-slate-100/80 p-1 shadow-sm">
        <TabsTrigger
          value="operations"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Backend
        </TabsTrigger>

        <TabsTrigger
          value="alerts"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Abnormal State
        </TabsTrigger>

        <TabsTrigger
          value="users"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Users
        </TabsTrigger>

        <TabsTrigger
          value="profile"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Admin Info
        </TabsTrigger>
      </TabsList>

      <TabsContent value="operations">
        <AdminOverviewPanel
          alerts={props.platformAlerts}
          dashboard={props.dashboard}
          isLoadingDashboard={props.isLoadingDashboard}
        />
      </TabsContent>

      <TabsContent value="alerts">
        <AdminAlertsPanel
          alerts={props.platformAlerts}
          resolveAlert={props.resolveAlert}
          isLoadingAlerts={props.isLoadingAlerts}
          isResolvingAlert={props.isResolvingAlert}
        />
      </TabsContent>

      <TabsContent value="users">
        <AdminUsersPanel
          users={props.users}
          isLoadingUsers={props.isLoadingUsers}
        />
      </TabsContent>

      <TabsContent value="profile">
        <AdminProfile profile={props.profile} />
      </TabsContent>
    </Tabs>
  );
}