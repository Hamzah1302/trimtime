"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { BottomNav } from "@/components/bottom-nav";
import { DesktopNav } from "@/components/desktop-nav";

const NAVLESS_PREFIXES = ["/login", "/register"];

function shouldHideNavigation(pathname?: string | null) {
    if (!pathname) {
        return false;
    }

    return NAVLESS_PREFIXES.some((prefix) =>
        pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
}

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const hideNavigation = shouldHideNavigation(pathname);

    if (hideNavigation) {
        return (
            <main className='mx-auto flex min-h-screen w-full max-w-3xl flex-1 flex-col bg-muted/20 px-5 py-10 text-foreground'>
                <div className='flex flex-1 flex-col justify-center'>
                    <div className='rounded-2xl border border-border/40 bg-background shadow-sm'>
                        {children}
                    </div>
                </div>
            </main>
        );
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
