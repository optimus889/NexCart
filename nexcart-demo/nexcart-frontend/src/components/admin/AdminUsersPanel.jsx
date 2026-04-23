import { Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/common/SectionHeader";

export default function AdminUsersPanel({ users = [], isLoadingUsers = false }) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={Users}
          title="User Management"
          desc="Administrators can review registered platform users."
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoadingUsers ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            No users found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="grid gap-4 rounded-3xl border bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge variant={user.isActive ? "secondary" : "destructive"}>
                    {user.isActive ? "Active" : "Disabled"}
                  </Badge>
                </div>

                <h4 className="font-semibold text-slate-900">
                  {user.fullName || user.username}
                </h4>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>

              <div className="text-right text-sm text-slate-500">
                <p>Username: {user.username}</p>
                <p>
                  Created:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}