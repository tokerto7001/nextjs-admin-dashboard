import { db } from "@/db";
import { notFound } from "next/navigation";

interface CoursePageProps {
    params: {
        id: string;
    }
};

export default async function CoursePage({params}: CoursePageProps){
    const {id} = params;
    if(isNaN(+id)) return notFound();

    const course = await db.course.findFirst({
        where: {
            id: +id
        }
    })
    if(!course) return notFound();
    return (
        <div>
            
        </div>
    )
};