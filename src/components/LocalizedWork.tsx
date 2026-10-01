import { getPublicContent } from "@/lib/content";
import { HeaderTopBar } from "@/components/ui/HeaderTopBar";
import { FloatingControls } from "@/components/ui/FloatingControls";
import { ProjectsListView } from "@/components/sections/ProjectsListView";
import { Footer } from "@/components/ui/Footer";

interface LocalizedWorkProps {
  locale: "en" | "fr";
}

export async function LocalizedWork({ locale }: LocalizedWorkProps) {
  const data = await getPublicContent();
  const { settings, projects } = data;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#363636] relative selection:bg-[#DBF505]">
      <FloatingControls locale={locale} />
      <HeaderTopBar />

      <main className="w-full">
        <ProjectsListView locale={locale} projects={projects} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
