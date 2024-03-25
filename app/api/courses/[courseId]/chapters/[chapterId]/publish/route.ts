import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    {params} : {params : {courseId : string; chapterId : string}}
) {
    try {
        const {userId } = auth();

        if (!userId || !isTeacher(userId)) {
          return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
          where: {
            id: params.courseId,
            userId: userId,
          },
        });

        if (!ownCourse) {
          return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where : {
                id : params.chapterId,
                courseId : params.courseId,
            }
        })

        const muxdata = await db.muxData.findUnique({
            where : {
                chapterId : params.chapterId,
            }
        })

        if(!chapter || !muxdata || !chapter.title || !chapter.description ||  !chapter.videoUrl){
                return new NextResponse("Missing required Fields",{status : 404});
        }

        const publishedchapter = await db.chapter.update({
            where : {
                id : params.chapterId,
                courseId : params.courseId,
            },
            data : {
                isPublished : true,
            }
        })

        return NextResponse.json(publishedchapter);
    } catch (error) {
        console.log("[CHAPTER_PUBLISIHING_ERROR]",error);
        return new NextResponse("Internal Error",{status : 500})
    }
}