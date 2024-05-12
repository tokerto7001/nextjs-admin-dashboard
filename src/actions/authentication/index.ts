'use server';

import { db } from "@/db";
import { compare, hash } from "@/utils/bcryptHelpers";
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

    try{
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
    }catch(err){
        return {
            success: false,
            error: {
                toastError: 'Something went wrong!'
            }
        }
    }


    return {
        error: {},
        success: true
    }
};

export interface LoginFormState {
    success?: boolean;
    error: {
        email?: string[];
        password?: string[];
        _form?: string[];
        toastError?: string;
    }
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export async function login(formState: LoginFormState, formData: FormData): Promise<LoginFormState>{

    const email = formData.get('email');
    const password = formData.get('password');

    const validationResult = loginSchema.safeParse({
        email,
        password
    });
    if(!validationResult.success) {
        return {
            error: validationResult.error.flatten().fieldErrors
        }
    }

    try{
        const user = await db.user.findFirst({
            where: {
                email: validationResult.data.email
            }
        });
        if(!user) return {
            success: false,
            error: {
                toastError: 'Wrong email or password!'
            }
        }
    
        const passwordsMatch = await compare(user.password, validationResult.data.password);
        if(!passwordsMatch) return {
            success: false,
            error: {
                toastError: 'Wrong email or password!'
            }
        }
    }catch(err: any){
        return {
            error: {
                toastError: 'Something went wrong!'
            }
        }
    }


    return {
        success: true,
        error: {}
    }
}