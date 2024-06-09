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

interface UserObject {
  id: number;
  email: string;
}

interface EnrollUserDialog {
    courseId: number;
}

export default function EnrollUserDialog({courseId}: EnrollUserDialog) {
  const [searchInput, setSearchInput] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<UserObject[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserObject | null>(null);

  const debouncedInput = useDebounce<string>(searchInput, 500);

  async function getUsers() {
    try {
      if (searchInput) {
        const users = await actions.getUsers(searchInput, courseId);
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


  useEffect(() => {
    getUsers();
  }, [debouncedInput]);

  useEffect(() => {
    setFetchedUsers([]);
    setSearchInput('');
  }, [selectedUser]);

  return (
    <div>
      <Dialog onOpenChange={() => setSearchInput('')}>
        <DialogTrigger asChild>
          <Button>Enroll User</Button>
        </DialogTrigger>
        <DialogContent className="flex justify-center h-96">
          <DialogDescription asChild>
            <div className="w-48">
              <h3 className="text-center text-black font-bold mb-2">
                Select User
              </h3>
              <Input
                placeholder="Search email"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="h-[40%]">
                {selectedUser ? (
                  <div className="text-lg flex justify-between pt-2">
                    <span>{selectedUser.email}</span>
                    <span onClick={() => setSelectedUser(null)} className="text-red-500 cursor-pointer">X</span>
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
                <form action="sada">
                  <Button type="submit">Enroll</Button>
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
