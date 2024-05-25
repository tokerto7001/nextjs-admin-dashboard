import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/shared/form-button";

export default function CreateCourseForm(){

    return (
        <form action="" className="flex flex-col gap-3 w-96">
        <div>
          <Label htmlFor="title">Course Title</Label>
          <Input
            name="title"
            placeholder="Course Title"
            id="title"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Course Description</Label>
          <Input
            name="description"
            placeholder="Course Description"
            id="description"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="duration">Course Duration(seconds)</Label>
          <Input
            name="duration"
            placeholder="Course Duration"
            id="duration"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="imageName">Course Image</Label>
          <Input
            name="imageName"
            placeholder="Course Image"
            id="imageName"
            className="mt-1"
            type="file"
          />
        </div>
        <div className="flex justify-center">
        <FormButton className="w-48">
            Submit
        </FormButton>
        </div>
      </form>
    )
}