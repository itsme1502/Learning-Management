import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { use } from "react";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps {
  searchParams : {
    title : string,
    categoryId : string
  }
}

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {

    const {userId} = auth();

    const categories = await db.category.findMany({
        orderBy : {
            name : "asc",
        }
    });

    if(!userId){
        return redirect("/sign-in");
    }

    const courses = await getCourses({
        userId,
        ...searchParams,
    });

    return ( 
        <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
            <SearchInput />
        </div>
        <div className="p-6">
           <Categories items={categories} />
           <CoursesList items={courses} />
        </div>
        </>
     );
}
 
export default SearchPage;