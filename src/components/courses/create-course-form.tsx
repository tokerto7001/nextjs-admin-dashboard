"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/shared/form-button";
import { createCourse } from "@/actions/courses";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "../ui/use-toast";

export default function CreateCourseForm() {
  const [formState, action] = useFormState(createCourse, { error: {} });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(formState.error.toastError) {
        console.log('toast')
        toast({
            description: formState.error.toastError,
            variant: 'destructive'
        });
        formRef.current?.reset();
    }
    if(formState.success) {
        toast({
            description: 'Course created successfully',
            variant: 'success'
        })
    }
  }, [formState]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3 w-96">
      <div>
        <Label htmlFor="title">Course Title</Label>
        <Input
          name="title"
          placeholder="Course Title"
          id="title"
          className="mt-1"
        />
        {formState.error.title?.length ? (
          <span className="text-xs text-red-600 px-1">
            {formState.error.title.join(", ")}
          </span>
        ) : null}
      </div>
      <div>
        <Label htmlFor="description">Course Description</Label>
        <Input
          name="description"
          placeholder="Course Description"
          id="description"
          className="mt-1"
        />
        {formState.error.description?.length ? (
          <span className="text-xs text-red-600 px-1">
            {formState.error.description.join(", ")}
          </span>
        ) : null}
      </div>
      <div>
        <Label htmlFor="duration">Course Duration(seconds)</Label>
        <Input
          name="duration"
          placeholder="Course Duration"
          id="duration"
          className="mt-1"
          type="number"
        />
        {formState.error.duration?.length ? (
          <span className="text-xs text-red-600 px-1">
            {formState.error.duration.join(", ")}
          </span>
        ) : null}
      </div>
      <div>
        <Label htmlFor="image">Course Image</Label>
        <Input
          name="image"
          placeholder="Course Image"
          id="image"
          className="mt-1"
          type="file"
        />
        {formState.error.image?.length ? (
          <span className="text-xs text-red-600 px-1">
            {formState.error.image.join(", ")}
          </span>
        ) : null}
        {formState.error._form?.length ? (
          <span className="text-xs text-red-600 px-1">
            {formState.error._form.join(", ")}
          </span>
        ) : null}
      </div>
      <div className="flex justify-center">
        <FormButton className="w-48">Submit</FormButton>
      </div>
    </form>
  );
}
