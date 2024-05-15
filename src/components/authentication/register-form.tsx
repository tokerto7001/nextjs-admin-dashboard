'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButton from "../shared/form-button";
import { useFormState } from "react-dom";
import * as actions from '@/actions/authentication';
import { useToast } from "../ui/use-toast";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function RegisterForm(){

    const { toast } = useToast();
    const [formState, action] = useFormState(actions.register, {error: {}})
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(formState.error.toastError){
            toast({
                description: formState.error.toastError,
                variant: 'destructive'
            });
            formRef.current!.reset();
        }

        if(formState.success) {
            toast({
                description: 'User created successfully!',
                variant: 'success'
            });
            formRef.current!.reset();
            redirect('/login')
        }
    }, [formState]);

    return (
        <div className="container w-[28%] rounded h-1/2 bg-[#F5F5F5] items-center flex justify-center">
            <form ref={formRef} action={action}>
                <div className="flex flex-col gap-4 w-64 text-center">
                    <div className="flex flex-col gap-2">
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
                        {
                            formState.error.email?.length ? <span className="text-xs text-red-600 px-1">{formState.error.email.join(', ')}</span> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="password"
                            className="px-1"
                            >Password</Label>
                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                        {
                            formState.error.password?.length ? <span className="text-xs text-red-600 px-1">{formState.error.password.join(', ')}</span> : null
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label
                            className="px-1"
                            htmlFor="passwordConfirm"
                            >Password Confirm</Label>
                        <Input
                            type="password"
                            placeholder="password confirm"
                            name="passwordConfirm"
                        />
                        {
                            formState.error.passwordConfirm?.length ? <span className="text-xs text-red-600 px-1">{formState.error.passwordConfirm.join(', ')}</span> : null
                        }
                    </div>
                        {
                            formState.error._form?.length ? <span className="text-xs text-red-600 px-1">{formState.error._form.join(', ')}</span> : null
                        }
                    <div className="flex flex-col gap-1 justify-center">
                        <Link className="text-sm m-auto" href='/login'>Already have an account?</Link>
                        <FormButton>
                            Register
                        </FormButton>
                    </div>
                </div>
            </form>
        </div>
    )
}