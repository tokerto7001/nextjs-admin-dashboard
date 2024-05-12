import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButton from "../shared/form-button";

export default function LoginForm(){
    return (
        <div className="container w-96 border border-yellow-500 rounded-xl h-96 bg-neutral-300 flex justify-center items-center">
            <form action="">
                <div className="flex flex-col gap-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="email"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                    </div>
                </div>
                <div className="mt-3 flex flex-col gap-1 justify-center">
                <Link className="text-sm m-auto" href='/register'>Dont have an account?</Link>
                <FormButton>
                    Login
                </FormButton>
                </div>

            </form>
        </div>
    )
}