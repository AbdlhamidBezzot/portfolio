import { LocalizedProjectDetail } from "@/components/LocalizedProjectDetail";

export const dynamic = "force-dynamic";

export default function EnglishProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <LocalizedProjectDetail locale="en" slug={params.slug} />;
}
