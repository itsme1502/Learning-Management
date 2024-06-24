import { Category, Chapter, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";
import { AllCourseCard } from "./allcourse-card";

type CourseWithCategory = Course & {
  category: Category | null;
  chapters: Chapter[];
};

interface CoursesListProps {
  items: CourseWithCategory[];
}

/**
 * Renders a list of courses with their associated categories and chapter counts.
 *
 * @param items - An array of `CourseWithCategory` objects representing the courses to display.
 * @returns A React component that displays the list of courses.
 */
export const AllCoursesList = ({ items }: CoursesListProps) => {
  console.log(items);
  
  return (

    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <AllCourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
