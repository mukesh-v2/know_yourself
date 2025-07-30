import { cn } from "@/lib/utils";
import React from "react";


interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
    return (
        <div className={cn("flex mx-auto w-full max-w-screen-xl p-2.5 md:pt-3 max-h-full ", className)}>
            {children}
        </div>
    );
}