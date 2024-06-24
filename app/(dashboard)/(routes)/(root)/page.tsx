import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import {  allCourses, getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { AllCoursesList } from "@/components/allcourses-list";

export default async function Dashboard() {
  const { userId } = auth();

  const courses = await allCourses();  

  if (!userId) {
    return(
      <div>
        <AllCoursesList items={courses.courses} />
      </div>   
    )
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
