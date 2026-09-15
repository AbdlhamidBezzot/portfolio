import { Activity } from "lucide-react";

export function MetricsCard({ label, value, detail, active = true }: { label: string; value: string; detail: string; active?: boolean }) {
  return <article className="admin-metric"><div className="admin-metric-top"><span>{label}</span><Activity size={16} aria-label={active ? "Active" : "Attention"} /></div><strong>{value}</strong><p>{detail}</p></article>;
}
