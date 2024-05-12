'use server';

import { db } from "@/db";
import { hash } from "@/utils/bcryptHelpers";
import { jwtSign } from "@/utils/jwtHelpers";
import { z } from "zod";

export interface RegisterFormState {
    success?: boolean;
    error: {
        email?: string[];
        password?: string[];
        passwordConfirm?: string[];
        _form?: string[];
        toastError?: string;
    }
}

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6)
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Password and password confirm must be identical'
})

export async function register(formState: RegisterFormState, formData: FormData): Promise<RegisterFormState>{
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    const validationResult = registerSchema.safeParse({
        email,
        password,
        passwordConfirm
    })

    if(!validationResult.success){
        return {
            success: false,
            error: {
                ...validationResult.error?.flatten().fieldErrors,
                _form: validationResult.error?.flatten().formErrors
            }
        }
    }

    const alreadyExist = await db.user.findFirst({
        where: {
            email: validationResult.data.email
        }
    });
    if(alreadyExist) return {
        success: false,
        error: {
            toastError: 'User already exists!'
        }
    }

    const encryptedPassword = await hash(validationResult.data.password);
    await db.user.create({
        data: {
            email: validationResult.data.email,
            password: encryptedPassword,
            isAdmin: true
        }
    })

    return {
        error: {},
        success: true
    }
}