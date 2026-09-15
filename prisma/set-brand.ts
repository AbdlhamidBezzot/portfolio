import { prisma } from "../src/lib/db";
prisma.siteSettings.update({where:{id:"main"},data:{brand:"AB"}}).finally(()=>prisma.$disconnect());
