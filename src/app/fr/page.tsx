import { LocalizedHome } from "@/components/LocalizedHome";
import { getPublicContent } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function FrenchHome(){ return <LocalizedHome locale="fr" data={await getPublicContent()}/>; }