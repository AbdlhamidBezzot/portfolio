import { MetricsCard } from "@/components/admin/MetricsCard";
import { hasAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default function Admin() {
  if (!hasAdminSession()) redirect("/admin/login");
  return <><header className="admin-page-header"><p>// DASHBOARD / 01</p><h1>Portfolio control room.</h1><span>Manage the content that appears across the public site.</span></header><div className="admin-metrics-grid"><MetricsCard label="PROJECTS" value="03" detail="Apollo · Bloom · ZAZA" /><MetricsCard label="PUBLIC ROUTES" value="08" detail="English and French pages" /><MetricsCard label="CONTACT" value="LIVE" detail="Email and LinkedIn enabled" /><MetricsCard label="STATUS" value="READY" detail="Production build verified" active={false} /></div><section className="admin-panel"><p className="admin-panel-label">// RECENT ACTIVITY</p>{["Project visuals added", "Bilingual portfolio content updated", "Public contact choices configured"].map((item, index) => <div className="admin-event" key={item}><span>0{index + 1}</span><p>{item}</p><small>UPDATED</small></div>)}</section></>;
}