import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { use } from "react";

export async function PATCH(
    req : Request,
    {params} : {params : {courseId : string}}
) {
   try {
    
    const {userId} = auth();

     if (!userId || !isTeacher(userId)) {
       return new NextResponse("Unauthorized", { status: 404 });
     }

     const course = await db.course.findUnique({
        where : {
            id : params.courseId,
            userId : userId,
        },
        include : {
            chapters : {
                include : {
                    muxData : true,
                }
            }
        }
     })

     if(!course){
        return new NextResponse("Unauthorized", { status: 404});
     }

     const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

     if(!course.title || !course.description || !course.categoryId || !hasPublishedChapter || !course.imageUrl){
        return new NextResponse("Missing Required Fields",{status : 404});
     }

     const publishedcourse = await db.course.update({
        where : {
            id : params.courseId,
            userId : userId,
        },
        data : {
            isPublished : true,
        }
     })

     return NextResponse.json(publishedcourse);

   } catch (error) {
    console.log("[COURSE_PUBLISHING]",error);
    return new NextResponse("Internal Error",{status : 500});
   }    
}