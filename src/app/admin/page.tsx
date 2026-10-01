import { MetricsCard } from "@/components/admin/MetricsCard";
import { hasAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default function Admin() {
  if (!hasAdminSession()) redirect("/admin/login");

  return (
    <>
      <header className="admin-page-header">
        <p>// DASHBOARD / 01</p>
        <h1>Portfolio control room.</h1>
        <span>Manage projects, stack definitions, and content for Abdelhamid Bezzot.</span>
      </header>

      <div className="admin-metrics-grid">
        <MetricsCard
          label="PROJECTS"
          value="04"
          detail="Apollo · Bloom · ZAZA · CineNight"
        />
        <MetricsCard
          label="PUBLIC ROUTES"
          value="10"
          detail="Home, Work, Projects, About, Contact (EN & FR)"
        />
        <MetricsCard
          label="STACK"
          value="03"
          detail="01 Interfaces · 02 Systems & Data · 03 AI Engineer"
        />
        <MetricsCard
          label="STATUS"
          value="READY"
          detail="Spencer Gabor Design System Live"
          active={false}
        />
      </div>

      <section className="admin-panel">
        <p className="admin-panel-label">// RECENT ACTIVITY</p>
        {[
          "CineNight mobile application & phone view integrated",
          "Spencer Gabor redesign system deployed across EN & FR routes",
          "Core Tech Stack (01 Interfaces, 02 Systems & Data, 03 AI Engineer) configured",
          "Direct contact links (Email, GitHub, LinkedIn) enabled",
        ].map((item, index) => (
          <div className="admin-event" key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
            <small>VERIFIED</small>
          </div>
        ))}
      </section>
    </>
  );
}