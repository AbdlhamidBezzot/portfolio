import { LocalizedHome } from "@/components/LocalizedHome";
import { getPublicContent } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function EnglishHome(){ return <LocalizedHome locale="en" data={await getPublicContent()}/>; }