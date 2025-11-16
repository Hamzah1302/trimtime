"use client";

import {
    BarChart3,
    Clock3,
    LucideIcon,
    Map,
    Sparkles,
    TrendingUp,
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
import { Progress } from "@/components/ui/progress";

const popularServices = [
    { name: "Signature Fade + Steam", share: 34 },
    { name: "Home Service Deluxe", share: 22 },
    { name: "Kids Cut Package", share: 14 },
    { name: "Freelancer Office Pop-up", share: 9 },
] as const;

const busySlots = [
    { slot: "11:00 - 13:00", occupancy: 92 },
    { slot: "17:00 - 20:00", occupancy: 88 },
    { slot: "Weekend 10:00 - 16:00", occupancy: 95 },
] as const;

const insightTiles: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    helper: string;
}> = [
    {
        icon: BarChart3,
        label: "Layanan naik daun",
        value: "Home service +18%",
        helper: "Bandingkan dengan on-site",
    },
    {
        icon: Map,
        label: "Lokasi terpadat",
        value: "CBD Jakarta • 31%",
        helper: "Diikuti Bandung 18%",
    },
    {
        icon: Clock3,
        label: "Waktu padat",
        value: "Jumat 18:00",
        helper: "Naik 1.4x vs rata-rata",
    },
] as const;

export default function AdminAnalyticsPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <TrendingUp className='h-4 w-4' />
                                Analytics & Insight
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Layanan populer, lokasi ramai, jam padat
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Data digabung dari booking owner, freelancer,
                                dan pelanggan langsung.
                            </p>
                        </div>
                        <Button>Download laporan mingguan</Button>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {insightTiles.map((tile) => (
                        <Card
                            key={tile.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader>
                                <p className='flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground'>
                                    <tile.icon className='h-4 w-4 text-primary' />
                                    {tile.label}
                                </p>
                                <CardTitle className='text-2xl font-bold text-foreground'>
                                    {tile.value}
                                </CardTitle>
                                <CardDescription>{tile.helper}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.4fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Layanan paling banyak dipesan
                            </CardTitle>
                            <CardDescription>
                                Porsi dari total booking nasional.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {popularServices.map((service) => (
                                <div
                                    key={service.name}
                                    className='space-y-2 rounded-xl border border-border/40 bg-muted/15 p-4'
                                >
                                    <div className='flex items-center justify-between text-sm'>
                                        <p className='font-semibold text-foreground'>
                                            {service.name}
                                        </p>
                                        <Badge
                                            variant='outline'
                                            className='border-border/40 text-[10px] uppercase tracking-widest'
                                        >
                                            {service.share}%
                                        </Badge>
                                    </div>
                                    <Progress value={service.share} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Slot paling padat
                            </CardTitle>
                            <CardDescription>
                                Gunakan insight ini untuk push notifikasi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {busySlots.map((slot) => (
                                <div
                                    key={slot.slot}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4'
                                >
                                    <p className='text-sm font-semibold text-foreground'>
                                        {slot.slot}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        Okupansi {slot.occupancy}%
                                    </p>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground'>
                                <p className='font-semibold text-primary flex items-center gap-2'>
                                    <Sparkles className='h-4 w-4' />
                                    Insight rekomendasi
                                </p>
                                <p>
                                    Owner bisa otomatis menambah slot & promo
                                    saat jam padat.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
