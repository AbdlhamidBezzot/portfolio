import { LocalizedProjectDetail } from "@/components/LocalizedProjectDetail";

export const dynamic = "force-dynamic";

export default function FrenchProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <LocalizedProjectDetail locale="fr" slug={params.slug} />;
}
