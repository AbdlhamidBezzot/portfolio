import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/db";
export async function generateMetadata():Promise<Metadata>{const s=await prisma.siteSettings.findUnique({where:{id:"main"}});const title=s?.seoTitleEn||"";const description=s?.seoDescriptionEn||"";return{title,description,metadataBase:new URL("https://abdelhamidbezzot.dev"),alternates:{languages:{en:"/en",fr:"/fr"}},openGraph:{title,description},twitter:{title,description}}}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}