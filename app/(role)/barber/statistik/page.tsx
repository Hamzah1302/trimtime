"use client";

import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    Star,
    TrendingUp,
    Wallet,
} from "lucide-react";
import { Bar, CartesianGrid, BarChart, XAxis, YAxis } from "recharts";

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
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dailyRevenue: Array<{
    day: string;
    pendapatan: number;
}> = [
    { day: "Sen", pendapatan: 820_000 },
    { day: "Sel", pendapatan: 1_250_000 },
    { day: "Rab", pendapatan: 980_000 },
    { day: "Kam", pendapatan: 1_360_000 },
    { day: "Jum", pendapatan: 1_120_000 },
    { day: "Sab", pendapatan: 1_520_000 },
    { day: "Min", pendapatan: 640_000 },
];

const dailyBookings: Array<{
    day: string;
    booking: number;
}> = [
    { day: "Sen", booking: 9 },
    { day: "Sel", booking: 11 },
    { day: "Rab", booking: 8 },
    { day: "Kam", booking: 12 },
    { day: "Jum", booking: 10 },
    { day: "Sab", booking: 13 },
    { day: "Min", booking: 6 },
];

const revenueChartConfig = {
    pendapatan: {
        label: "Pendapatan",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

const bookingChartConfig = {
    booking: {
        label: "Jumlah pelanggan",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

// Helper to format currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

// Calculate total revenue for the week
const totalWeeklyRevenue = dailyRevenue.reduce(
    (sum, day) => sum + day.pendapatan,
    0
);

// Calculate total bookings for the week
const totalWeeklyBookings = dailyBookings.reduce(
    (sum, day) => sum + day.booking,
    0
);

// Find best day
const bestRevenueDay = dailyRevenue.reduce((prev, current) =>
    prev.pendapatan > current.pendapatan ? prev : current
);

export default function BarberStatistikPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            {/* Header Section */}
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    {/* Barber Profile Card */}
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-12 w-12 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Rama Putra'
                                />
                                <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                    RP
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber
                                    </Badge>
                                </div>
                                <h2 className='text-xl font-bold tracking-tight text-foreground'>
                                    Rama Putra
                                </h2>
                                <p className='text-sm text-muted-foreground'>
                                    TrimTime HQ, SCBD
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Page Title Card */}
                    <Card className='border-border/50 bg-card/80 shadow-sm'>
                        <CardContent className='space-y-4'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <TrendingUp className='h-4 w-4' />
                                Performa Saya
                            </div>
                            <div className='space-y-3'>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    Ringkasan pendapatan & performa
                                </h1>
                                <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                    Lihat berapa yang sudah Anda hasilkan minggu
                                    ini, kapan hari paling sibuk, dan apa yang
                                    perlu dilakukan selanjutnya.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Main Content */}
            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-8'>
                {/* PRIMARY INFO - Big Numbers */}
                <div className='grid gap-4 lg:grid-cols-3'>
                    {/* Main Revenue Card */}
                    <Card className='border-primary/40 bg-primary/5 shadow-sm lg:col-span-2'>
                        <CardHeader className='space-y-1'>
                            <CardDescription className='text-xs uppercase tracking-widest text-muted-foreground'>
                                Pendapatan 7 hari terakhir
                            </CardDescription>
                            <CardTitle className='text-4xl font-bold text-foreground lg:text-5xl'>
                                {formatCurrency(totalWeeklyRevenue)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Badge className='bg-green-100 text-green-700'>
                                    <TrendingUp className='mr-1 h-3 w-3' />
                                    +12% dari minggu lalu
                                </Badge>
                                <span className='text-xs'>
                                    Anda melayani {totalWeeklyBookings} pelanggan
                                </span>
                            </div>
                            <div className='rounded-lg border border-border/40 bg-card p-3 text-xs'>
                                <p className='font-semibold text-foreground'>
                                    💡 Hari terbaik: {bestRevenueDay.day}
                                </p>
                                <p className='mt-1 text-muted-foreground'>
                                    Anda mendapat{" "}
                                    {formatCurrency(bestRevenueDay.pendapatan)}{" "}
                                    pada hari {bestRevenueDay.day}. Pertahankan!
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rating Card */}
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='space-y-1'>
                            <CardDescription className='text-xs uppercase tracking-widest text-muted-foreground'>
                                Rating pelanggan
                            </CardDescription>
                            <CardTitle className='flex items-baseline gap-2'>
                                <span className='text-4xl font-bold text-foreground'>
                                    4.8
                                </span>
                                <span className='text-xl text-muted-foreground'>
                                    / 5
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <Badge className='bg-green-100 text-green-700'>
                                <Star className='mr-1 h-3 w-3 fill-current' />
                                Sangat Baik
                            </Badge>
                            <p className='text-xs text-muted-foreground'>
                                Dari 248 ulasan pelanggan di semua platform
                                (TrimTime, Google, Walk-in).
                            </p>
                            <Button
                                variant='outline'
                                size='sm'
                                className='w-full border-border/60'
                            >
                                Lihat semua review
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* SECONDARY INFO - Charts */}
                <div className='grid gap-5 lg:grid-cols-2'>
                    {/* Revenue Chart */}
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <CardTitle className='text-lg font-semibold tracking-tight'>
                                        Pendapatan per hari
                                    </CardTitle>
                                    <CardDescription className='text-xs'>
                                        7 hari terakhir
                                    </CardDescription>
                                </div>
                                <Wallet className='h-5 w-5 text-primary' />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={revenueChartConfig}
                                className='h-[200px]'
                            >
                                <BarChart data={dailyRevenue}>
                                    <CartesianGrid
                                        strokeDasharray='4 8'
                                        stroke='var(--border)'
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey='day'
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                        tickFormatter={(value) =>
                                            `${(value / 1000).toFixed(0)}k`
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={{ fill: "transparent" }}
                                        content={
                                            <ChartTooltipContent
                                                formatter={(value) =>
                                                    formatCurrency(
                                                        value as number
                                                    )
                                                }
                                            />
                                        }
                                    />
                                    <Bar
                                        dataKey='pendapatan'
                                        fill='var(--color-pendapatan)'
                                        radius={[8, 8, 0, 0]}
                                        barSize={32}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Booking Chart */}
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <CardTitle className='text-lg font-semibold tracking-tight'>
                                        Jumlah pelanggan per hari
                                    </CardTitle>
                                    <CardDescription className='text-xs'>
                                        7 hari terakhir
                                    </CardDescription>
                                </div>
                                <Calendar className='h-5 w-5 text-primary' />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={bookingChartConfig}
                                className='h-[200px]'
                            >
                                <BarChart data={dailyBookings}>
                                    <CartesianGrid
                                        strokeDasharray='4 8'
                                        stroke='var(--border)'
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey='day'
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                    />
                                    <ChartTooltip
                                        cursor={{ fill: "transparent" }}
                                        content={
                                            <ChartTooltipContent
                                                formatter={(value) =>
                                                    `${value} pelanggan`
                                                }
                                            />
                                        }
                                    />
                                    <Bar
                                        dataKey='booking'
                                        fill='var(--color-booking)'
                                        radius={[8, 8, 0, 0]}
                                        barSize={32}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* TERTIARY INFO - What's Next */}
                <Card className='border-primary/40 bg-gradient-to-br from-primary/5 to-accent/5 shadow-sm'>
                    <CardHeader>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                            <CheckCircle2 className='h-4 w-4' />
                            Yang perlu Anda lakukan
                        </div>
                        <CardTitle className='text-xl font-semibold tracking-tight'>
                            Langkah selanjutnya
                        </CardTitle>
                        <CardDescription>
                            Selesaikan task ini untuk meningkatkan performa
                            Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        {/* Action 1 */}
                        <div className='flex items-start gap-3 rounded-xl border border-border/40 bg-card p-4'>
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                                <Star className='h-4 w-4 text-primary' />
                            </div>
                            <div className='flex-1 space-y-2'>
                                <p className='text-sm font-semibold text-foreground'>
                                    Balas 3 review yang menunggu
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Pelanggan menunggu tanggapan Anda. Balasan
                                    cepat meningkatkan rating hingga 15%.
                                </p>
                                <Button size='sm' className='w-full sm:w-auto'>
                                    <ArrowRight className='h-3.5 w-3.5' />
                                    Balas sekarang
                                </Button>
                            </div>
                        </div>

                        {/* Action 2 */}
                        <div className='flex items-start gap-3 rounded-xl border border-border/40 bg-card p-4'>
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                                <Calendar className='h-4 w-4 text-primary' />
                            </div>
                            <div className='flex-1 space-y-2'>
                                <p className='text-sm font-semibold text-foreground'>
                                    Konfirmasi 2 booking besok
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Anda punya 2 jadwal home service besok (11
                                    Feb) yang perlu dikonfirmasi.
                                </p>
                                <Button
                                    size='sm'
                                    variant='outline'
                                    className='w-full border-border/60 sm:w-auto'
                                >
                                    <ArrowRight className='h-3.5 w-3.5' />
                                    Lihat jadwal
                                </Button>
                            </div>
                        </div>

                        {/* Action 3 */}
                        <div className='flex items-start gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'>
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                                <TrendingUp className='h-4 w-4 text-primary' />
                            </div>
                            <div className='flex-1 space-y-2'>
                                <p className='text-sm font-semibold text-primary'>
                                    Target bulanan: 72% tercapai
                                </p>
                                <div className='space-y-2'>
                                    <Progress value={72} className='h-2' />
                                    <p className='text-xs text-muted-foreground'>
                                        Anda sudah dapat Rp 29,5 juta dari target
                                        Rp 41 juta bulan ini. Pertahankan!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Download Report */}
                        <div className='pt-2'>
                            <Button
                                variant='outline'
                                className='w-full border-border/60'
                            >
                                Unduh laporan lengkap (PDF)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}