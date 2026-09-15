import "server-only";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const required=["R2_ACCOUNT_ID","R2_ACCESS_KEY_ID","R2_SECRET_ACCESS_KEY","R2_BUCKET_NAME","R2_PUBLIC_URL"] as const;
type R2Config={accountId:string;accessKeyId:string;secretAccessKey:string;bucketName:string;publicUrl:string};
function config():R2Config{const missing=required.filter(name=>!process.env[name]);if(missing.length)throw new Error(`R2 is not configured: ${missing.join(", ")}`);return{accountId:process.env.R2_ACCOUNT_ID!,accessKeyId:process.env.R2_ACCESS_KEY_ID!,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY!,bucketName:process.env.R2_BUCKET_NAME!,publicUrl:process.env.R2_PUBLIC_URL!.replace(/\/+$/,"")}}
function client(s:R2Config){return new S3Client({region:"auto",endpoint:`https://${s.accountId}.r2.cloudflarestorage.com`,credentials:{accessKeyId:s.accessKeyId,secretAccessKey:s.secretAccessKey}})}
export function r2IsConfigured(){return required.every(name=>Boolean(process.env[name]))}
export async function uploadImageToR2(key:string,body:Uint8Array,contentType:string){const s=config();await client(s).send(new PutObjectCommand({Bucket:s.bucketName,Key:key,Body:body,ContentType:contentType}));return `${s.publicUrl}/${key}`}
function keyFromPublicUrl(url:string,s:R2Config){const prefix=`${s.publicUrl}/`;if(!url.startsWith(prefix))return null;const key=url.slice(prefix.length);return key&&!key.includes("..")?key:null}
export async function deleteR2ObjectForPublicUrl(url:string){if(!r2IsConfigured())return false;const s=config(),key=keyFromPublicUrl(url,s);if(!key)return false;await client(s).send(new DeleteObjectCommand({Bucket:s.bucketName,Key:key}));return true}



