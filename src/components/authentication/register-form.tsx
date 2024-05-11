import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButton from "../shared/form-button";

export default function RegisterForm(){
    return (
        <div className="container w-96 border border-yellow-500 rounded-xl h-96 bg-neutral-300 flex justify-center items-center">
            <form action="">
                <div className="flex flex-col gap-4">
                    <div>
                        <Label
                            htmlFor="email"
                            className="px-1"
                            >Email</Label>
                        <Input
                            type="email"
                            placeholder="email"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="px-1"
                            >Password</Label>
                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                    </div>
                    <div>
                        <Label
                            className="px-1"
                            htmlFor="passwordConfirm"
                            >Password Confirm</Label>
                        <Input
                            type="password"
                            placeholder="password confirm"
                            name="passwordConfirm"
                        />
                    </div>
                </div>
                <div className="mt-3 flex flex-col gap-1 justify-center">
                <Link className="text-sm m-auto" href='/register'>Already have an account?</Link>
                <FormButton>
                    Register
                </FormButton>
                </div>

            </form>
        </div>
    )
}