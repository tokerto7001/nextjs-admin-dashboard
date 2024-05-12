import LoginForm from "@/components/authentication/login-form";

export default async function LoginPage(){
    return (
        <div className="flex justify-center items-center h-screen bg-slate-900">
            <LoginForm />
        </div>
    )
}