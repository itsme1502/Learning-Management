import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
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

    const unpublishedchapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedchapterincourse = await db.chapter.findMany({
        where : {
            courseId : params.courseId,
            isPublished : true,
        }
    })

    if(!publishedchapterincourse.length){
        await db.course.update({
            where : {
                id : params.courseId,
            },
            data : {
                isPublished : false
            }
        })
    }

    return NextResponse.json(unpublishedchapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISIHING_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
