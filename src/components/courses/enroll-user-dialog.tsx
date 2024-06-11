"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import * as actions from "../../actions/courses";
import useDebounce from "@/hooks/useDebounce";
import { useFormState } from "react-dom";

interface UserObject {
  id: number;
  email: string;
}

interface EnrollUserDialog {
  courseId: number;
}

export default function EnrollUserDialog({ courseId }: EnrollUserDialog) {
  const [searchInput, setSearchInput] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<UserObject[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserObject | null>(null);
  const [dialogStatus, setDialogStatus] = useState(false);

  const debouncedInput = useDebounce<string>(searchInput, 500);
  const [formState, enrollUserToCourseAction] = useFormState(actions.enrollUserToCourse.bind(null, courseId, selectedUser?.id), {error: {}});

  async function getUsers() {
    try {
      if (searchInput) {
        const users = await actions.getUnenrolledUsers(searchInput, courseId);
        setFetchedUsers(users);
      } else {
        setFetchedUsers([]);
      }
    } catch (err: any) {
      toast({
        description: err.message || "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  function handleDialog(){
    setSearchInput("");
    setSelectedUser(null);
    setDialogStatus(!dialogStatus);
  }

  useEffect(() => {
    if(formState) {
      if(!formState.success) {
        toast({
          description: formState.error.userId?.toString() || formState.error.courseId?.toString() || formState.error._form?.toString() || 'Something went wrong!',
          variant: 'destructive'
        })
      }else {
        toast({
          description: formState.success.message,
          variant: 'success'
        });
        setDialogStatus(false);
      }
    }

  }, [formState]);

  useEffect(() => {
    getUsers();
  }, [debouncedInput]);

  useEffect(() => {
    setFetchedUsers([]);
    setSearchInput("");
  }, [selectedUser]);

  return (
    <div>
      <Dialog onOpenChange={handleDialog} open={dialogStatus}>
        <DialogTrigger asChild>
          <Button>Enroll User</Button>
        </DialogTrigger>
        <DialogContent className="flex justify-center h-96">
          <DialogDescription asChild>
            <div className="w-48">
              <h3 className="text-center text-black font-bold mb-2">
                Select User
              </h3>
              {!selectedUser ? (
                <Input
                  placeholder="Search email"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              ) : null}
              <div className="h-[40%]">
                {selectedUser ? (
                  <div className="text-lg flex justify-between pt-2">
                    <span>{selectedUser.email}</span>
                    <span
                      onClick={() => setSelectedUser(null)}
                      className="text-red-500 cursor-pointer"
                    >
                      X
                    </span>
                  </div>
                ) : (
                  fetchedUsers.map((user) => (
                    <div
                      onClick={() => setSelectedUser(user)}
                      className="text-black h-6 cursor-pointer"
                      key={user.id}
                    >
                      {user.email}
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-between">
                <form action={enrollUserToCourseAction}>
                  <Button type="submit" disabled={!selectedUser}>Enroll</Button>
                </form>
                <DialogClose>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
