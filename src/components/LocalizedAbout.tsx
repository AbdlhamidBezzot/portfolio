import { getPublicContent } from "@/lib/content";
import { HeaderTopBar } from "@/components/ui/HeaderTopBar";
import { FloatingControls } from "@/components/ui/FloatingControls";
import { AboutView } from "@/components/sections/AboutView";
import { Footer } from "@/components/ui/Footer";

interface LocalizedAboutProps {
  locale: "en" | "fr";
}

export async function LocalizedAbout({ locale }: LocalizedAboutProps) {
  const data = await getPublicContent();
  const { settings } = data;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#363636] relative selection:bg-[#DBF505]">
      <FloatingControls locale={locale} />
      <HeaderTopBar />

      <main className="w-full">
        <AboutView
          locale={locale}
          manifestoEn={settings?.manifestoEn}
          manifestoFr={settings?.manifestoFr}
        />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
