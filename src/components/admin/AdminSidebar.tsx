"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard, Pencil } from "lucide-react";

const links = [
  [LayoutDashboard, "Overview", "/admin"],
  [Pencil, "Content", "/admin/content"],
  [FolderKanban, "Projects", "/admin/projects"],
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <Link href="/en" className="admin-brand">
        AB
      </Link>

      <nav>
        {links.map(([Icon, label, href]) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              className={`admin-nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <form action="/api/admin/logout" method="post" className="admin-logout">
        <button type="submit">Sign out</button>
      </form>

      <p className="admin-sidebar-note">// PORTFOLIO CMS</p>
    </aside>
  );
}