"use client";

import { ArrowRight, CheckCircle2, Download, TrendingDown } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const dailyRevenue = [
    { day: "Sen", amount: 26_000_000 },
    { day: "Sel", amount: 29_500_000 },
    { day: "Rab", amount: 30_200_000 },
    { day: "Kam", amount: 28_700_000 },
    { day: "Jum", amount: 33_100_000 },
    { day: "Sab", amount: 37_400_000 },
    { day: "Min", amount: 24_800_000 },
];

const dailyBooking = [
    { day: "Sen", count: 112 },
    { day: "Sel", count: 134 },
    { day: "Rab", count: 140 },
    { day: "Kam", count: 138 },
    { day: "Jum", count: 156 },
    { day: "Sab", count: 170 },
    { day: "Min", count: 122 },
];

// All 7 branches
const allBranches = [
    {
        name: "TrimTime SCBD",
        booking: 412,
        grossRevenue: 98_500_000,
        platformFee: 9_850_000, // 10%
        netToOwner: 88_650_000, // 90%
    },
    {
        name: "TrimTime Menteng",
        booking: 364,
        grossRevenue: 84_200_000,
        platformFee: 8_420_000,
        netToOwner: 75_780_000,
    },
    {
        name: "TrimTime Kelapa Gading",
        booking: 318,
        grossRevenue: 72_400_000,
        platformFee: 7_240_000,
        netToOwner: 65_160_000,
    },
    {
        name: "TrimTime Pondok Indah",
        booking: 295,
        grossRevenue: 68_100_000,
        platformFee: 6_810_000,
        netToOwner: 61_290_000,
    },
    {
        name: "TrimTime BSD",
        booking: 280,
        grossRevenue: 62_400_000,
        platformFee: 6_240_000,
        netToOwner: 56_160_000,
    },
    {
        name: "TrimTime Bandung",
        booking: 252,
        grossRevenue: 58_600_000,
        platformFee: 5_860_000,
        netToOwner: 52_740_000,
    },
    {
        name: "TrimTime Surabaya",
        booking: 241,
        grossRevenue: 54_800_000,
        platformFee: 5_480_000,
        netToOwner: 49_320_000,
    },
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

const totalGrossRevenue = allBranches.reduce(
    (sum, b) => sum + b.grossRevenue,
    0
);
const totalPlatformFee = allBranches.reduce((sum, b) => sum + b.platformFee, 0);
const totalNetToOwner = allBranches.reduce((sum, b) => sum + b.netToOwner, 0);
const totalBooking = allBranches.reduce((sum, b) => sum + b.booking, 0);

export default function OwnerLaporanPage() {
    return (
        <PageShell background='soft' contentClassName='gap-6'>
            {/* Header */}
            <Card className='border-border/50'>
                <CardContent className='p-6'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold'>
                            Laporan keuangan minggu ini
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            3 - 9 Februari 2025 • Semua cabang
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* MAIN ANSWER: How much do I get? */}
            <Card className='border-green-300 bg-green-50'>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-600' />
                        <CardTitle className='text-green-900'>
                            Pendapatan Anda minggu ini
                        </CardTitle>
                    </div>
                    <CardDescription className='text-green-700'>
                        Setelah dipotong platform fee 10%
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div>
                        <p className='text-4xl font-bold text-green-900'>
                            {formatCurrency(totalNetToOwner)}
                        </p>
                        <p className='text-sm text-green-700'>
                            Dari {totalBooking} booking di 7 cabang
                        </p>
                    </div>

                    <div className='grid gap-3 sm:grid-cols-2'>
                        <div className='rounded-lg border border-green-300 bg-white p-3'>
                            <p className='text-xs text-muted-foreground'>
                                Sudah transfer ke rekening
                            </p>
                            <p className='text-lg font-bold text-green-900'>
                                {formatCurrency(totalNetToOwner * 0.88)}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Rek BCA ***1234 • 5 Feb 2025
                            </p>
                        </div>
                        <div className='rounded-lg border border-yellow-300 bg-yellow-50 p-3'>
                            <p className='text-xs text-muted-foreground'>
                                Pending transfer
                            </p>
                            <p className='text-lg font-bold text-yellow-900'>
                                {formatCurrency(totalNetToOwner * 0.12)}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Akan masuk Jumat, 14 Feb 2025
                            </p>
                        </div>
                    </div>

                    <Button className='w-full' asChild>
                        <a href='#'>
                            <Download className='h-4 w-4' />
                            Unduh laporan lengkap (PDF)
                        </a>
                    </Button>
                </CardContent>
            </Card>

            {/* Revenue sharing explanation */}
            <Card className='border-border/50'>
                <CardHeader>
                    <CardTitle>Cara pembagian hasil</CardTitle>
                    <CardDescription>
                        Sistem revenue sharing TrimTime
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='space-y-3 text-sm'>
                        <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                            <p className='text-xs uppercase tracking-wider text-muted-foreground'>
                                1. Pendapatan kotor dari pelanggan
                            </p>
                            <p className='text-2xl font-bold'>
                                {formatCurrency(totalGrossRevenue)}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Total dari {totalBooking} booking
                            </p>
                        </div>

                        <div className='flex items-center justify-center'>
                            <div className='text-2xl text-muted-foreground'>
                                ↓
                            </div>
                        </div>

                        <div className='grid gap-3 sm:grid-cols-2'>
                            <div className='rounded-lg border border-border/40 bg-red-50 p-4'>
                                <p className='text-xs uppercase tracking-wider text-muted-foreground'>
                                    2. Platform fee (10%)
                                </p>
                                <p className='text-xl font-bold text-red-900'>
                                    -{formatCurrency(totalPlatformFee)}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Biaya sistem TrimTime
                                </p>
                            </div>

                            <div className='rounded-lg border border-green-300 bg-green-100 p-4'>
                                <p className='text-xs uppercase tracking-wider text-muted-foreground'>
                                    3. Pendapatan Anda (90%)
                                </p>
                                <p className='text-xl font-bold text-green-900'>
                                    {formatCurrency(totalNetToOwner)}
                                </p>
                                <p className='text-xs text-green-700'>
                                    ✅ Ini yang Anda terima
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-xs'>
                        <p className='font-semibold text-primary'>
                            Contoh perhitungan per booking:
                        </p>
                        <p className='mt-2 text-muted-foreground'>
                            Pelanggan bayar: <strong>Rp 100.000</strong>
                            <br />
                            • Platform fee 10%: -Rp 10.000
                            <br />
                            • <strong>Pendapatan Anda 90%: Rp 90.000</strong>
                            <br />
                            <br />
                            Dari Rp 90.000 ini, Anda yang atur untuk bayar
                            barber, operasional, dan profit Anda sendiri.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Charts */}
            <div className='grid gap-5 lg:grid-cols-2'>
                <Card className='border-border/50'>
                    <CardHeader>
                        <CardTitle>Pendapatan per hari</CardTitle>
                        <CardDescription>
                            Revenue kotor 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='h-[240px]'>
                        <ResponsiveContainer width='100%' height='100%'>
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
                                    stroke='var(--muted-foreground)'
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke='var(--muted-foreground)'
                                    tickFormatter={(value) =>
                                        `${(value / 1_000_000).toFixed(0)}jt`
                                    }
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "0.75rem",
                                    }}
                                    formatter={(value) =>
                                        formatCurrency(value as number)
                                    }
                                />
                                <Bar
                                    dataKey='amount'
                                    fill='hsl(var(--primary))'
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className='border-border/50'>
                    <CardHeader>
                        <CardTitle>Booking per hari</CardTitle>
                        <CardDescription>
                            Jumlah pelanggan 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='h-[240px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <BarChart data={dailyBooking}>
                                <CartesianGrid
                                    strokeDasharray='4 8'
                                    stroke='var(--border)'
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey='day'
                                    tickLine={false}
                                    axisLine={false}
                                    stroke='var(--muted-foreground)'
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke='var(--muted-foreground)'
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "0.75rem",
                                    }}
                                    formatter={(value) => `${value} booking`}
                                />
                                <Bar
                                    dataKey='count'
                                    fill='hsl(var(--chart-2))'
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* All branches table */}
            <Card className='border-border/50'>
                <CardHeader>
                    <CardTitle>Detail per cabang</CardTitle>
                    <CardDescription>
                        Revenue kotor, platform fee 10%, dan pendapatan Anda
                        (90%)
                    </CardDescription>
                </CardHeader>
                <CardContent className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cabang</TableHead>
                                <TableHead className='text-right'>
                                    Booking
                                </TableHead>
                                <TableHead className='text-right'>
                                    Revenue kotor
                                </TableHead>
                                <TableHead className='text-right'>
                                    Platform fee
                                </TableHead>
                                <TableHead className='text-right'>
                                    Pendapatan Anda
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allBranches.map((branch) => (
                                <TableRow key={branch.name}>
                                    <TableCell className='font-semibold'>
                                        {branch.name}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        {branch.booking}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        {formatCurrency(branch.grossRevenue)}
                                    </TableCell>
                                    <TableCell className='text-right text-red-600'>
                                        -{formatCurrency(branch.platformFee)}
                                    </TableCell>
                                    <TableCell className='text-right font-bold text-green-600'>
                                        {formatCurrency(branch.netToOwner)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className='bg-muted/50 font-bold'>
                                <TableCell>TOTAL</TableCell>
                                <TableCell className='text-right'>
                                    {totalBooking}
                                </TableCell>
                                <TableCell className='text-right'>
                                    {formatCurrency(totalGrossRevenue)}
                                </TableCell>
                                <TableCell className='text-right text-red-600'>
                                    -{formatCurrency(totalPlatformFee)}
                                </TableCell>
                                <TableCell className='text-right text-green-600'>
                                    {formatCurrency(totalNetToOwner)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Insights */}
            <Card className='border-yellow-300 bg-yellow-50'>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <TrendingDown className='h-5 w-5 text-yellow-600' />
                        <CardTitle className='text-yellow-900'>
                            Yang perlu perhatian
                        </CardTitle>
                    </div>
                    <CardDescription className='text-yellow-700'>
                        Berdasarkan data minggu ini
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                    <div className='rounded-lg border border-yellow-300 bg-white p-4'>
                        <p className='font-semibold text-foreground'>
                            Cabang BSD pendapatan turun 8%
                        </p>
                        <p className='text-sm text-muted-foreground'>
                            Pendapatan minggu ini: Rp 56,1 jt (minggu lalu: Rp 61
                            jt). Booking turun dari 305 → 280.
                        </p>
                        <Button size='sm' className='mt-3' asChild>
                            <a href='/owner/promo'>
                                <ArrowRight className='h-4 w-4' />
                                Kirim promo ke area BSD
                            </a>
                        </Button>
                    </div>

                    <div className='rounded-lg border border-yellow-300 bg-white p-4'>
                        <p className='font-semibold text-foreground'>
                            Hari Minggu pendapatan terendah
                        </p>
                        <p className='text-sm text-muted-foreground'>
                            Minggu: Rp 24,8 jt vs Sabtu: Rp 37,4 jt (turun 34%).
                            Pertimbangkan promo khusus Minggu.
                        </p>
                        <Button size='sm' variant='outline' className='mt-3'>
                            Lihat detail
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className='border-border/50'>
                <CardHeader>
                    <CardTitle>Rekomendasi untuk meningkatkan pendapatan</CardTitle>
                    <CardDescription>
                        Berdasarkan analisis data Anda
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                    <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                        <div className='flex items-start gap-3'>
                            <Badge className='bg-primary/15 text-primary'>
                                1
                            </Badge>
                            <div className='flex-1'>
                                <p className='font-semibold text-foreground'>
                                    Fokus marketing ke SCBD & Menteng
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    2 cabang ini paling produktif (Rp 88 jt dan
                                    Rp 75 jt per minggu). Alokasikan budget ads
                                    lebih banyak ke area ini.
                                </p>
                                <p className='mt-2 text-xs text-green-600'>
                                     Potensi impact: +Rp 10-15 jt/bulan
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                        <div className='flex items-start gap-3'>
                            <Badge className='bg-primary/15 text-primary'>
                                2
                            </Badge>
                            <div className='flex-1'>
                                <p className='font-semibold text-foreground'>
                                    Evaluasi kinerja cabang BSD & Surabaya
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    Pendapatan terendah (Rp 56 jt dan Rp 49 jt).
                                    Cek: apakah lokasi kurang strategis, kompetisi
                                    tinggi, atau marketing kurang.
                                </p>
                                <p className='mt-2 text-xs text-yellow-600'>
                                     Perlu action dalam 2 minggu
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                        <div className='flex items-start gap-3'>
                            <Badge className='bg-primary/15 text-primary'>
                                3
                            </Badge>
                            <div className='flex-1'>
                                <p className='font-semibold text-foreground'>
                                    Tambah slot booking Jumat & Sabtu
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    Weekend adalah hari tersibuk (156-170
                                    booking). Tambah 2-3 barber shift untuk
                                    capture demand lebih banyak.
                                </p>
                                <p className='mt-2 text-xs text-green-600'>
                                     Potensi impact: +Rp 8-12 jt/bulan
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </PageShell>
    );
}
