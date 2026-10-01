import { getPublicContent } from "@/lib/content";
import { HeaderTopBar } from "@/components/ui/HeaderTopBar";
import { FloatingControls } from "@/components/ui/FloatingControls";
import { ContactView } from "@/components/sections/ContactView";
import { Footer } from "@/components/ui/Footer";

interface LocalizedContactProps {
  locale: "en" | "fr";
}

export async function LocalizedContact({ locale }: LocalizedContactProps) {
  const data = await getPublicContent();
  const { settings } = data;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#363636] relative selection:bg-[#DBF505]">
      <FloatingControls locale={locale} />
      <HeaderTopBar />

      <main className="w-full">
        <ContactView locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
