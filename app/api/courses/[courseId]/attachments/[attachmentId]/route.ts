import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    {params} : {params : {courseId : string , attachmentId : string}}
) {
    try {
        const {userId} = auth();
        
        if (!userId) {
          return new NextResponse("Unauthozied User", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where : {
                id : params.courseId,
                userId : userId
            }
        })

        if (!courseOwner) {
          return new NextResponse(
            "You are not authorized to add attachments to this course",
            { status: 401 }
          );
        }

        const attachment = await db.attachment.delete({
            where : {
               id : params.attachmentId,
               courseId : params.courseId  
            }
        })
        return NextResponse.json(attachment);
    } catch (error) {
        console.log("ATTACHMENT_ID",error);
        return new NextResponse("Internal Error",{status : 500});
    }
}