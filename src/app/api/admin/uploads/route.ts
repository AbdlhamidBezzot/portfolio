import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { hasAdminSession } from "@/lib/admin-auth";
import { r2IsConfigured, uploadImageToR2 } from "@/lib/r2";
export const runtime="nodejs";
const maxBytes=5*1024*1024;
const imageTypes:Record<string,string>={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"};
function hasImageSignature(type:string,bytes:Uint8Array){const text=(start:number,length:number)=>{let value="";for(let i=start;i<start+length;i++)value+=String.fromCharCode(bytes[i]);return value};if(type==="image/jpeg")return bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;if(type==="image/png")return[0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a].every((byte,index)=>bytes[index]===byte);if(type==="image/gif")return text(0,6)==="GIF87a"||text(0,6)==="GIF89a";return text(0,4)==="RIFF"&&text(8,4)==="WEBP"}
export async function POST(request:Request){if(!hasAdminSession())return NextResponse.json({error:"Unauthorized"},{status:401});if(!r2IsConfigured())return NextResponse.json({error:"Image uploads are not configured. Add the R2 environment variables."},{status:503});const form=await request.formData(),file=form.get("image");if(!(file instanceof File))return NextResponse.json({error:"Select an image file."},{status:400});const extension=imageTypes[file.type];if(!extension)return NextResponse.json({error:"Use a JPG, PNG, WEBP, or GIF image."},{status:400});if(!file.size)return NextResponse.json({error:"The image is empty."},{status:400});if(file.size>maxBytes)return NextResponse.json({error:"Image must be 5 MB or smaller."},{status:400});const bytes=new Uint8Array(await file.arrayBuffer());if(!hasImageSignature(file.type,bytes))return NextResponse.json({error:"The file contents do not match its image type."},{status:400});const key=`projects/${randomUUID()}.${extension}`;try{const url=await uploadImageToR2(key,bytes,file.type);return NextResponse.json({url,key,filename:file.name,mimeType:file.type,size:file.size},{status:201})}catch(error){console.error("R2 image upload failed",error);return NextResponse.json({error:"Unable to upload image. Please try again."},{status:502})}}


