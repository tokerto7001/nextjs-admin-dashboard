import EnrolledUsersAccordionItem from "@/components/courses/enrolled-users-accordion-item"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { db } from "@/db"

export default async function UserCoursesPage(){

    const courses = await db.course.findMany({
        include: {
            enrolledUsers: {
                include: {
                    user: true
                }
            }
        }
    })

    return (
        <div className="p-5 mt-3">
            <Accordion type="single" collapsible className="w-full">
        {
            courses.map((course) => (
                <AccordionItem key={course.id} value={course.title}>
                <AccordionTrigger>{course.title}</AccordionTrigger>
                <AccordionContent><EnrolledUsersAccordionItem users={course.enrolledUsers}/></AccordionContent>
              </AccordionItem>
            ))
        }
    </Accordion>
        </div>
    )
}