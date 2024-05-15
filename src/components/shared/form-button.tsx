'use client'

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
}

export default function FormButton({children}: FormButtonProps){
    const {pending} = useFormStatus();

    return (
        <Button
            type="submit"
            className="bg-[#001628]"
        >
            {
                pending ? <Loader2 /> : children
            }
        </Button>
    )
}