import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { hasAdminSession } from "@/lib/admin-auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!hasAdminSession()) return <>{children}</>;
  return <div className="admin-shell"><AdminSidebar /><main className="admin-main">{children}</main></div>;
}