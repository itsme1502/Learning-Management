import { Category, Chapter, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    // console.log(purchasedCourses,"purchasedCourses");
    

    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    // console.log(typeof courses);
    

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};

type CourseWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
};

type publicDashboardCourses = {
  courses: CourseWithCategory[];
};



export const allCourses = async  () : Promise<publicDashboardCourses> =>{
    try {
      const courses = await db.course.findMany({
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
          },
        },
      });
      const newcourses = courses.filter((course) => course.chapters.length>0  ) as CourseWithCategory[];
      
      
      return {
        courses : newcourses
      }
    } catch (error) {
      console.log("[COURSE FETCHING ERROR]", error);
      return {
        courses : [],
      };
    }
};
