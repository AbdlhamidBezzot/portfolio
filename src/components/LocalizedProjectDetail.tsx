import { getProject, getPublicContent } from "@/lib/content";
import { HeaderTopBar } from "@/components/ui/HeaderTopBar";
import { FloatingControls } from "@/components/ui/FloatingControls";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { Footer } from "@/components/ui/Footer";
import { notFound } from "next/navigation";

interface LocalizedProjectDetailProps {
  locale: "en" | "fr";
  slug: string;
}

export async function LocalizedProjectDetail({
  locale,
  slug,
}: LocalizedProjectDetailProps) {
  const [project, data] = await Promise.all([
    getProject(slug),
    getPublicContent(),
  ]);

  if (!project) {
    notFound();
  }

  const { settings } = data;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#363636] relative selection:bg-[#DBF505]">
      <FloatingControls locale={locale} />
      <HeaderTopBar />

      <main className="w-full">
        <ProjectDetailView locale={locale} project={project} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
