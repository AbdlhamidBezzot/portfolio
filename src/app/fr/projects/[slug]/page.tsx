import { LocalizedProject } from "@/components/LocalizedProject";
export const dynamic="force-dynamic";
export default function Page({params}:{params:{slug:string}}){return <LocalizedProject slug={params.slug} locale="fr"/>}