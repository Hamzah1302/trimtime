"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    BarChart3,
    Building2,
    CalendarCheck,
    CheckCircle2,
    Crown,
    DollarSign,
    MapPin,
    RefreshCcw,
    Sparkles,
    Users,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const kpiCards = [
    {
        label: "Total booking hari ini",
        value: "142",
        helper: "+18% vs kemarin",
        icon: CalendarCheck,
    },
    {
        label: "Pendapatan per cabang",
        value: "Rp 32,4 jt",
        helper: "Rata-rata 6 cabang",
        icon: DollarSign,
    },
    {
        label: "Barber aktif",
        value: "58 / 64",
        helper: "6 shift off",
        icon: Users,
    },
    {
        label: "Rating rata-rata",
        value: "4.86 / 5",
        helper: "1.247 ulasan baru",
        icon: BarChart3,
    },
] as const;

const branchPerformances = [
    {
        name: "TrimTime SCBD",
        revenue: "Rp 11,2 jt",
        occupancy: 92,
        diff: "+9%",
        status: "Hot",
    },
    {
        name: "TrimTime Menteng",
        revenue: "Rp 8,4 jt",
        occupancy: 81,
        diff: "+4%",
        status: "Stabil",
    },
    {
        name: "TrimTime BSD",
        revenue: "Rp 6,1 jt",
        occupancy: 68,
        diff: "-3%",
        status: "Perlu booster",
    },
] as const;

const actionShortcuts = [
    {
        title: "Tambah cabang baru",
        description: "Daftarkan alamat, jam buka, layanan, dan foto interior.",
        href: "/owner/cabang",
    },
    {
        title: "Atur shift barber",
        description:
            "Bagikan slot otomatis dan kirimkan credential ke barber baru.",
        href: "/owner/barber",
    },
    {
        title: "Buat promo loyalitas",
        description: "Voucher ulang tahun/poin pelanggan langsung live di app.",
        href: "/owner/promo",
    },
] as const;

const storeHighlights = [
    {
        label: "Mini store hari ini",
        value: "87 transaksi",
        helper: "Pomade Clay jadi best seller",
    },
    {
        label: "Stok menipis",
        value: "12 SKU",
        helper: "Sisir karbon, pre-styling spray",
    },
] as const;

export default function OwnerDashboardPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-14 w-14 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Satria Mahendra'
                                />
                                <AvatarFallback className='bg-primary/10 text-base font-semibold text-primary'>
                                    SM
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-[0.3em]'
                                    >
                                        Owner
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-[0.3em]'
                                    >
                                        Multi Cabang
                                    </Badge>
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    Pemilik TrimTime Group
                                </p>
                                <h1 className='text-3xl font-bold tracking-tight text-foreground lg:text-4xl'>
                                    Panel Operasional Owner
                                </h1>
                                <div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
                                    <span className='inline-flex items-center gap-1'>
                                        <MapPin className='h-3.5 w-3.5 text-primary' />{" "}
                                        Jakarta • Bandung • Surabaya
                                    </span>
                                    <span className='inline-flex items-center gap-1'>
                                        <Crown className='h-3.5 w-3.5 text-primary' />{" "}
                                        TrimTime Premium aktif
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/70 p-4 text-sm shadow-sm'>
                            <p className='text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground'>
                                Status operasional
                            </p>
                            <p className='text-2xl font-bold text-foreground'>
                                7 cabang live • 64 barber aktif
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                <Button
                                    variant='outline'
                                    className='border-border/60'
                                    asChild
                                >
                                    <Link href='/owner/cabang'>
                                        Kelola cabang
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href='/owner/premium'>
                                        Lihat TrimTime Premium
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                        {kpiCards.map(
                            ({ label, value, helper, icon: Icon }) => (
                                <Card
                                    key={label}
                                    className='border-border/50 shadow-sm'
                                >
                                    <CardHeader className='flex flex-row items-start justify-between gap-3'>
                                        <div>
                                            <CardDescription className='text-xs uppercase tracking-widest'>
                                                {label}
                                            </CardDescription>
                                            <CardTitle className='text-3xl font-bold'>
                                                {value}
                                            </CardTitle>
                                        </div>
                                        <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                                            <Icon className='h-5 w-5' />
                                        </span>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-xs font-semibold text-emerald-600'>
                                            {helper}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-5 lg:grid-cols-[1.4fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold'>
                                    Performa tiap cabang
                                </CardTitle>
                                <CardDescription>
                                    Rekap booking, pendapatan, dan okupansi
                                    kursi live.
                                </CardDescription>
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60'
                                asChild
                            >
                                <Link href='/owner/cabang'>
                                    Lihat semua cabang
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {branchPerformances.map((branch) => (
                                <div
                                    key={branch.name}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'
                                >
                                    <div className='flex flex-wrap items-center justify-between gap-3'>
                                        <div>
                                            <p className='text-base font-semibold text-foreground'>
                                                {branch.name}
                                            </p>
                                            <p>{branch.revenue}</p>
                                        </div>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest'
                                        >
                                            {branch.status}
                                        </Badge>
                                    </div>
                                    <div className='mt-3 space-y-1.5'>
                                        <div className='flex items-center justify-between text-xs uppercase tracking-widest'>
                                            <span>Okupansi kursi</span>
                                            <span className='font-semibold text-foreground'>
                                                {branch.occupancy}%
                                            </span>
                                        </div>
                                        <Progress value={branch.occupancy} />
                                    </div>
                                    <p className='mt-2 text-xs font-semibold text-emerald-600'>
                                        Tren {branch.diff} minggu ini
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Quick action
                            </CardTitle>
                            <CardDescription>
                                Automasi hal rutin biar owner fokus strategi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {actionShortcuts.map((item) => (
                                <div
                                    key={item.title}
                                    className='rounded-xl border border-border/40 bg-background/70 p-4'
                                >
                                    <p className='text-sm font-semibold text-foreground'>
                                        {item.title}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {item.description}
                                    </p>
                                    <Button
                                        variant='link'
                                        className='px-0 text-xs font-semibold text-primary'
                                        asChild
                                    >
                                        <Link href={item.href}>
                                            Lanjutkan{" "}
                                            <ArrowUpRight className='ml-1 h-3.5 w-3.5' />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Butuh integrasi API?
                                </p>
                                <p>
                                    TrimTime Premium bisa auto-sync ke laporan
                                    keuangan & POS cabang.
                                </p>
                                <Button size='sm' className='mt-3' asChild>
                                    <Link href='/owner/premium'>
                                        Upgrade ke Premium
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.2fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold'>
                                    Mini store & stok
                                </CardTitle>
                                <CardDescription>
                                    Pantau produk grooming favorit pelanggan.
                                </CardDescription>
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60'
                                asChild
                            >
                                <Link href='/owner/store'>Kelola store</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {storeHighlights.map((item) => (
                                <div
                                    key={item.label}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4'
                                >
                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                        {item.label}
                                    </p>
                                    <p className='text-2xl font-bold text-foreground'>
                                        {item.value}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {item.helper}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                TrimTime Premium
                            </CardTitle>
                            <CardDescription>
                                Dapatkan analitik cabang dan API laporan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-sm text-muted-foreground'>
                            <div className='flex items-start gap-3'>
                                <Sparkles className='mt-1 h-4 w-4 text-primary' />
                                <div>
                                    <p className='font-semibold text-foreground'>
                                        Auto-schedule & komisi 70/30
                                    </p>
                                    <p>
                                        Shift barber otomatis dibuat dari demand
                                        + preferensi.
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <RefreshCcw className='mt-1 h-4 w-4 text-primary' />
                                <div>
                                    <p className='font-semibold text-foreground'>
                                        Integrasi laporan keuangan
                                    </p>
                                    <p>
                                        Export Excel/PDF terjadwal langsung ke
                                        email finance.
                                    </p>
                                </div>
                            </div>
                            <Button className='w-full' asChild>
                                <Link href='/owner/premium'>
                                    Pelajari paket Premium
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
