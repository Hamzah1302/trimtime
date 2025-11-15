"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { BottomNav } from "@/components/bottom-nav";
import { DesktopNav } from "@/components/desktop-nav";

const AUTH_PREFIXES = ["/login", "/register"] as const;
const MARKETING_ROUTES = ["/", "/contact"] as const;

function isAuthLayout(pathname?: string | null) {
    if (!pathname) {
        return false;
    }

    return AUTH_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
}

function isMarketingLayout(pathname?: string | null) {
    if (!pathname) {
        return false;
    }

    return MARKETING_ROUTES.includes(
        pathname as (typeof MARKETING_ROUTES)[number]
    );
}

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();

    if (isMarketingLayout(pathname)) {
        return (
            <div className='min-h-screen bg-background text-foreground'>
                {children}
            </div>
        );
    }

    if (isAuthLayout(pathname)) {
        return <>{children}</>;
    }

    return (
        <div className='flex min-h-screen bg-muted/30 text-foreground'>
            <DesktopNav />
            <div className='flex min-h-screen flex-1 flex-col'>
                <div className='relative flex flex-1 flex-col'>
                    <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-0 pb-20 text-foreground lg:px-6 lg:py-6 lg:pb-8'>
                        <div className='rounded-none bg-background shadow-none lg:rounded-2xl lg:border lg:border-border/50 lg:shadow-sm lg:backdrop-blur-sm'>
                            {children}
                        </div>
                    </main>
                </div>
                <BottomNav className='lg:hidden' />
            </div>
        </div>
    );
}
