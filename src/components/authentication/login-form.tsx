'use client';

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButton from "../shared/form-button";
import * as actions from '@/actions/authentication';
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "../ui/use-toast";

export default function LoginForm(){

    const { toast } = useToast();
    const [formState, action] = useFormState(actions.login, {error: {}});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(formState.error.toastError) {
            toast({
                description: formState.error.toastError,
                variant: 'destructive'
            })
            formRef.current!.reset();
        }
        if(formState.success) {
            toast({
                description: 'User login successfull!',
                variant: 'success'
            })
            formRef.current!.reset();
        }
    }, [formState]);

    return (
        <div className="container w-[28%] rounded h-96 bg-[#F5F5F5] flex justify-center items-center">
            <form ref={formRef} action={action}>
                <div className="flex flex-col gap-4 w-64 text-center">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="email"
                            id="email"
                            name="email"
                        />
                        {
                            formState.error.email?.length ? <span className="text-xs text-red-600 px-1">{formState.error.email.join(', ')}</span> : null
                        }
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                        {
                            formState.error.password?.length ? <span className="text-xs text-red-600 px-1">{formState.error.password.join(', ')}</span> : null
                        }
                        {
                            formState.error._form?.length ? <span className="text-xs text-red-600 px-1">{formState.error._form.join(', ')}</span> : null
                        }
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