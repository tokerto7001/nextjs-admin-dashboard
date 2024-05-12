import RegisterForm from "@/components/authentication/register-form";
import { redirect } from "next/navigation";

export default async function RegisterPage(){

    return (
        <div className="flex justify-center items-center h-screen bg-slate-900">
            <RegisterForm />
        </div>
    )
}