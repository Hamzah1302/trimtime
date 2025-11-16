"use client";

import Link from "next/link";

import {
    Briefcase,
    Building,
    Coins,
    Megaphone,
    PencilLine,
    Plus,
    Sparkles,
    Target,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const sponsorSlots = [
    {
        id: "pomade-alpha-mar",
        slot: "Homepage Hero",
        partner: "Pomade Alpha",
        period: "1-31 Mar",
        status: "Terbooking",
    },
    {
        id: "bank-beta-feb",
        slot: "Freelancer highlight",
        partner: "Bank BETA",
        period: "10-20 Feb",
        status: "Terbooking",
    },
    {
        id: "open-marketplace",
        slot: "Marketplace Banner",
        partner: "",
        period: "Slot kosong",
        status: "Avail",
    },
] as const;

const premiumPerks = [
    {
        title: "Prioritas pencarian",
        description:
            "Barbershop Premium muncul paling atas di halaman pencarian user.",
    },
    {
        title: "Badge premium",
        description:
            "Menambah kepercayaan pelanggan + conversion rate booking.",
    },
] as const;

export default function AdminIklanPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Megaphone className='h-4 w-4' />
                                Iklan & Partner Premium
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Kelola slot sponsor & mitra produk
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pastikan inventory iklan terisi dan relevan
                                dengan ekosistem TrimTime.
                            </p>
                        </div>
                        <Button>Hubungi tim partnership</Button>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Slot iklan
                        </CardTitle>
                        <CardDescription>
                            Status inventory sponsor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        {sponsorSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className='space-y-3 rounded-xl border border-border/40 bg-muted/15 p-4'
                            >
                                <div className='flex flex-wrap items-center justify-between'>
                                    <div>
                                        <p className='text-base font-semibold text-foreground'>
                                            {slot.slot}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Partner:{" "}
                                            {slot.partner || "Belum terisi"}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Periode: {slot.period}
                                        </p>
                                    </div>
                                    <Badge
                                        variant='outline'
                                        className='border-border/40 text-[10px] uppercase tracking-widest'
                                    >
                                        {slot.status}
                                    </Badge>
                                </div>
                                <div className='flex flex-wrap gap-2 text-sm'>
                                    {slot.partner ? (
                                        <>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 gap-2'
                                                asChild
                                            >
                                                <Link
                                                    href={`/admin/iklan/${slot.id}`}
                                                >
                                                    <Briefcase className='h-3.5 w-3.5' />
                                                    Lihat detail
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                className='gap-2'
                                                asChild
                                            >
                                                <Link
                                                    href={`/admin/iklan/${slot.id}/edit`}
                                                >
                                                    <PencilLine className='h-3.5 w-3.5' />
                                                    Edit
                                                </Link>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            size='sm'
                                            variant='outline'
                                            className='border-dashed border-primary/60 text-primary gap-2'
                                            asChild
                                        >
                                            <Link href='/admin/iklan/create'>
                                                <Plus className='h-3.5 w-3.5' />
                                                Tambah sponsor
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Button
                            variant='outline'
                            className='w-full border-border/60 gap-2'
                            asChild
                        >
                            <Link href='/admin/iklan/create'>
                                <Plus className='h-4 w-4' />
                                Tambah slot baru
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
