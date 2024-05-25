'use client'

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function FormButton({children ,className}: FormButtonProps){
    const {pending} = useFormStatus();

    return (
        <Button
            type="submit"
            className={`bg-[#001628] ${className ? className : ''}`}
        >
            {
                pending ? <Loader2 /> : children
            }
        </Button>
    )
}