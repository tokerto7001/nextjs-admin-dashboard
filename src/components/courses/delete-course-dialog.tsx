import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteCourse } from "@/actions/courses";

interface DeleteCourseDialogProps {
    id: number;
};

export default function DeleteCourseDialog({id}: DeleteCourseDialogProps){

    const deleteCourseAction = deleteCourse.bind(null, id);
    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button>Delete Course</Button>
        </DialogTrigger>
        <DialogContent className="flex items-center justify-center">
            <DialogDescription asChild className="h-[90%]">
              <div>
              <h3 className="text-center text-black font-bold mb-2">Are you sure to delete this course?</h3>
              <div className="flex justify-between">
              <form action={deleteCourseAction}>
                <Button type="submit" variant='destructive'>Delete</Button>
              </form>
              <DialogClose>
                <Button>Cancel</Button>
              </DialogClose>
              </div>
              </div>
            </DialogDescription>
        </DialogContent>
      </Dialog>
    )
}