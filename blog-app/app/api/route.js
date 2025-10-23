import { writeFile } from "fs/promises";
import path from "path"
export async function POST(req) {
    const formData = await req.formData();
    if(formData.get("saveProfileImage")){
        const file = formData.get("image");
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(),"assets");
        const filePath = path.join(uploadDir,"user.png");
        await writeFile(filePath,buffer);
        return Response.json({message:"Image Saved Sucessfully !",filename:"user.png"});
    }
    else{
        const file = formData.get("uploaded_photo");
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const name = file.name.split(".");
        const filePath = path.join(uploadDir, `${name[0]}_${formData.get("id")}.${name[1]}`);
        await writeFile(filePath, buffer);
        return Response.json({ message: "File Uploaded Successfully!", filename: file.name });
    }
}
export async function GET() {
    return Response.json({ message: 'API is working!' });
}