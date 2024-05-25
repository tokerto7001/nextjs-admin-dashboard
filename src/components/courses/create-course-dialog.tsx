'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CreateCourseForm from "./create-course-form";
import { useState } from "react";

export default function CreateCourseDialog() {

    const [dialogState, setDialogState] = useState(false);

    return (
        <Dialog open={dialogState} onOpenChange={() => setDialogState(!dialogState)}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogState(true)}>Add Course</Button>
        </DialogTrigger>
        <DialogContent className="h-[70%] flex items-center justify-center">
            <DialogDescription asChild className="h-[90%]">
              <div>
              <h3 className="text-center text-black font-bold mb-2">Create a new course</h3>
              <CreateCourseForm 
              setDialogState={setDialogState}
              />
              </div>
            </DialogDescription>
        </DialogContent>
      </Dialog>
    )
}