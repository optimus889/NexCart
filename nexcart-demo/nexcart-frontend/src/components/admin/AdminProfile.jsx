import { User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionHeader from "@/components/common/SectionHeader";

export default function AdminProfile({ profile }) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={User}
          title="Administrator Personal Information"
          desc="Administrators can only view their own profile and backend role details."
        />
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        {Object.entries(profile || {}).map(([key, value]) => (
          <div
            key={key}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-sm capitalize text-slate-500">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
            <p className="mt-1 font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}