"use client";

import {
    ArrowRight,
    CalendarCheck,
    Cloud,
    Crown,
    FireExtinguisher,
    Shield,
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
import { Separator } from "@/components/ui/separator";

const tiers = [
    {
        name: "Essential",
        price: "Rp 2,5 jt/bln",
        features: [
            "Dashboard multi cabang",
            "Laporan booking + komisi",
            "Promo & loyalitas",
        ],
        cta: "Tetap di paket ini",
    },
    {
        name: "TrimTime Premium",
        price: "Rp 6,9 jt/bln",
        featured: true,
        features: [
            "Auto-schedule barber 70/30",
            "Integrasi API laporan keuangan",
            "Priority listing di hasil pencarian",
            "Analis TrimTime bulanan",
            "Support account manager",
        ],
        cta: "Upgrade sekarang",
    },
] as const;

const benefits = [
    {
        icon: CalendarCheck,
        title: "Auto schedule & komisi",
        description:
            "Shift dibuat otomatis berdasarkan demand cabang, rating barber, dan timeline loyal pelanggan.",
    },
    {
        icon: FireExtinguisher,
        title: "API laporan keuangan",
        description:
            "Koneksikan TrimTime dengan Accurate, Mekari, Google Sheet, atau ERP lain.",
    },
    {
        icon: TrendingUp,
        title: "Analitik lanjutan",
        description:
            "Forecast booking, repeat vs new customer, heatmap kursi tiap jam.",
    },
    {
        icon: Shield,
        title: "Prioritas support",
        description: "Account manager khusus + SLA 2 jam untuk isu penting.",
    },
] as const;

export default function OwnerPremiumPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative flex flex-col gap-6'>
                    <div className='rounded-3xl border border-border/50 bg-card/90 p-6 text-center shadow-sm backdrop-blur-sm lg:p-10'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary'>
                            <Crown className='h-4 w-4' />
                            TrimTime Premium
                        </div>
                        <h1 className='mt-4 text-3xl font-bold tracking-tight lg:text-5xl'>
                            Analitik lengkap + auto-schedule untuk owner
                        </h1>
                        <p className='mx-auto mt-3 max-w-3xl text-sm text-muted-foreground lg:text-base'>
                            TrimTime Premium bantu pemilik dengan cabang banyak
                            buat mengotomasi shift barber, komisi, laporan
                            keuangan, dan promo berkelanjutan.
                        </p>
                        <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
                            <Button size='lg' className='gap-2'>
                                Pelajari bersama tim sales
                                <ArrowRight className='h-4 w-4' />
                            </Button>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-border/60'
                            >
                                Lihat demo interaktif
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-5 lg:grid-cols-2'>
                    {tiers.map((tier) => (
                        <Card
                            key={tier.name}
                            className={`border-border/50 shadow-sm ${
                                tier.features
                                    ? "bg-primary/5 ring-2 ring-primary/40"
                                    : ""
                            }`}
                        >
                            <CardHeader>
                                <CardTitle className='text-2xl font-bold text-foreground flex items-center gap-2'>
                                    {tier.name}
                                    {tier.features ? (
                                        <Badge className='bg-primary text-primary-foreground'>
                                            Rekomendasi
                                        </Badge>
                                    ) : null}
                                </CardTitle>
                                <CardDescription>
                                    {tier.features
                                        ? "Fitur paling lengkap untuk owner multi cabang"
                                        : "Fitur dasar TrimTime"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <p className='text-3xl font-bold text-foreground'>
                                    {tier.price}
                                </p>
                                <Separator className='bg-border/30' />
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    {tier.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className='flex items-center gap-2'
                                        >
                                            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className='w-full'
                                    variant={
                                        tier.features ? "default" : "outline"
                                    }
                                >
                                    {tier.cta}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Kenapa owner upgrade?
                        </CardTitle>
                        <CardDescription>
                            Benefit premium untuk operasi multi cabang.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 md:grid-cols-2'>
                        {benefits.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'
                            >
                                <p className='mb-2 flex items-center gap-2 text-base font-semibold text-foreground'>
                                    <Icon className='h-4 w-4 text-primary' />
                                    {title}
                                </p>
                                <p>{description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Integrasi & prioritas
                        </CardTitle>
                        <CardDescription>
                            Kami bantu set up dan memprioritaskan cabang Anda di
                            hasil pencarian.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-3 text-sm text-muted-foreground'>
                        {[
                            {
                                label: "POS & Accounting",
                                value: "Accurate, Mekari, Hashmicro",
                            },
                            {
                                label: "Cloud backup",
                                value: "Google Cloud region Jakarta",
                            },
                            {
                                label: "Prioritas pencarian",
                                value: "Cabang Premium tampil paling atas",
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className='rounded-xl border border-border/40 bg-muted/15 p-4'
                            >
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Cloud className='h-4 w-4 text-primary' />
                                    {item.label}
                                </p>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Butuh sesi konsultasi?
                        </CardTitle>
                        <CardDescription>
                            Tim TrimTime siap bantu mapping proses sebelum
                            upgrade.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3 text-sm text-muted-foreground'>
                        <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                            <p className='text-base font-semibold text-foreground'>
                                Kick-off 60 menit
                            </p>
                            <p>Bahas modul, migrasi data, integrasi API</p>
                        </div>
                        <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                            <p className='text-base font-semibold text-foreground'>
                                Account manager khusus
                            </p>
                            <p>Prioritas WhatsApp & video call</p>
                        </div>
                        <Button className='w-full gap-2'>
                            <Sparkles className='h-4 w-4' />
                            Jadwalkan demo Premium
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
