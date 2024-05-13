import { logout } from "@/actions/authentication";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="bg-slate-400 h-12 flex justify-end items-center w-full">
        <div className="mx-6 text-white font-semibold">
                <form action={logout}>
                    <Button type="submit">Log Out</Button> 
                </form> 
        </div>
    </div>
  );
}
