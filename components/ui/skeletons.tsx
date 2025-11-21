"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden shadow-md">
                    <Skeleton className="w-full h-48 sm:h-64 md:h-80 lg:h-96" />
                    <div className="p-4 sm:p-6 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-14" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-20" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function AboutSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="w-20 h-1" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </div>
            <Skeleton className="h-[350px] sm:h-[400px] md:h-[500px] rounded-lg" />
        </div>
    );
}

export function SkillsSkeleton() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-2 mb-8">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                </div>
            ))}
        </div>
    );
}
