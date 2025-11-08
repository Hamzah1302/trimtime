"use client";

import {
    ArrowDownRight,
    ArrowUpRight,
    Download,
    FileSpreadsheet,
    Filter,
    LineChart,
    Percent,
    Wallet,
} from "lucide-react";
import {
    Line,
    LineChart as RechartLineChart,
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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const revenueData: Array<{
    day: string;
    booking: number;
    revenue: number;
}> = [
    { day: "Sen", booking: 112, revenue: 26_000_000 },
    { day: "Sel", booking: 134, revenue: 29_500_000 },
    { day: "Rab", booking: 140, revenue: 30_200_000 },
    { day: "Kam", booking: 138, revenue: 28_700_000 },
    { day: "Jum", booking: 156, revenue: 33_100_000 },
    { day: "Sab", booking: 170, revenue: 37_400_000 },
    { day: "Min", booking: 122, revenue: 24_800_000 },
];

const reportTable = [
    {
        name: "TrimTime SCBD",
        booking: 412,
        revenue: "Rp 98.500.000",
        commission: "Rp 29.550.000",
        payout: "Rp 68.950.000",
    },
    {
        name: "TrimTime Menteng",
        booking: 364,
        revenue: "Rp 84.200.000",
        commission: "Rp 24.600.000",
        payout: "Rp 59.600.000",
    },
    {
        name: "TrimTime BSD",
        booking: 280,
        revenue: "Rp 62.400.000",
        commission: "Rp 18.720.000",
        payout: "Rp 43.680.000",
    },
] as const;

export default function OwnerLaporanPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <LineChart className='h-4 w-4' />
                                Laporan & Keuangan
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Rekap booking & komisi otomatis
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pantau booking per cabang/barber, komisi 70/30
                                otomatis, dan export laporan PDF/Excel untuk tim
                                finance.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <Download className='h-4 w-4' />
                                Export PDF
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <FileSpreadsheet className='h-4 w-4' />
                                Export Excel
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {[
                        {
                            label: "Total booking minggu ini",
                            value: "1.216",
                            diff: "+12%",
                            positive: true,
                        },
                        {
                            label: "Pendapatan kotor",
                            value: "Rp 292 jt",
                            diff: "+8%",
                            positive: true,
                        },
                        {
                            label: "Komisi TrimTime 30%",
                            value: "Rp 87 jt",
                            diff: "+10%",
                            positive: true,
                        },
                        {
                            label: "Pembayaran ke owner",
                            value: "Rp 205 jt",
                            diff: "-2%",
                            positive: false,
                        },
                    ].map((item) => (
                        <Card
                            key={item.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader className='space-y-1'>
                                <CardDescription className='text-xs uppercase tracking-widest'>
                                    {item.label}
                                </CardDescription>
                                <CardTitle className='text-2xl font-bold'>
                                    {item.value}
                                </CardTitle>
                                <p
                                    className={`flex items-center gap-1 text-xs font-semibold ${
                                        item.positive
                                            ? "text-emerald-600"
                                            : "text-amber-600"
                                    }`}
                                >
                                    {item.positive ? (
                                        <ArrowUpRight className='h-3.5 w-3.5' />
                                    ) : (
                                        <ArrowDownRight className='h-3.5 w-3.5' />
                                    )}
                                    {item.diff} dibanding minggu lalu
                                </p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Tren booking & pendapatan
                            </CardTitle>
                            <CardDescription>
                                Data mingguan semua cabang.
                            </CardDescription>
                        </div>
                        <div className='flex flex-wrap gap-2 text-sm'>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Filter className='h-4 w-4' />
                                Filter cabang
                            </Button>
                            <Input
                                type='month'
                                defaultValue='2025-02'
                                className='w-auto border-border/60'
                            />
                        </div>
                    </CardHeader>
                    <CardContent className='h-[320px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <RechartLineChart
                                data={revenueData}
                                margin={{ left: 0, right: 0 }}
                            >
                                <XAxis dataKey='day' stroke='var(--border)' />
                                <YAxis stroke='var(--border)' />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "0.75rem",
                                    }}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='booking'
                                    stroke='hsl(var(--secondary))'
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='revenue'
                                    stroke='hsl(var(--primary))'
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </RechartLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Rekap cabang (70/30)
                        </CardTitle>
                        <CardDescription>
                            Komisi otomatis berdasarkan pendapatan kotor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cabang</TableHead>
                                    <TableHead>Booking</TableHead>
                                    <TableHead>Pendapatan kotor</TableHead>
                                    <TableHead>Komisi 30%</TableHead>
                                    <TableHead>Payout owner</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportTable.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell className='font-semibold text-foreground'>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.booking}</TableCell>
                                        <TableCell>{row.revenue}</TableCell>
                                        <TableCell>{row.commission}</TableCell>
                                        <TableCell className='font-semibold text-foreground'>
                                            {row.payout}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Komisi per barber
                            </CardTitle>
                            <CardDescription>
                                Lihat performa individu berdasarkan rating &
                                omzet.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            {[
                                {
                                    name: "Rama Putra",
                                    revenue: "Rp 21.3 jt",
                                    commission: "Rp 6.3 jt",
                                },
                                {
                                    name: "Hafidz Rahman",
                                    revenue: "Rp 18.1 jt",
                                    commission: "Rp 5.4 jt",
                                },
                                {
                                    name: "Naya Pratama",
                                    revenue: "Rp 16.7 jt",
                                    commission: "Rp 5.0 jt",
                                },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4'
                                >
                                    <div className='flex items-center justify-between'>
                                        <span className='font-semibold text-foreground'>
                                            {item.name}
                                        </span>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest'
                                        >
                                            70% payout
                                        </Badge>
                                    </div>
                                    <p>Omzet: {item.revenue}</p>
                                    <p>Payout: {item.commission}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Penutup buku otomatis
                            </CardTitle>
                            <CardDescription>
                                Ideal untuk finance yang perlu laporan
                                terjadwal.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                    Integrasi
                                </p>
                                <p className='text-lg font-bold text-foreground'>
                                    API laporan keuangan
                                </p>
                                <p>
                                    Sinkron ke Accurate / Mekari / Google Sheet
                                </p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                    Auto email
                                </p>
                                <p className='text-lg font-bold text-foreground'>
                                    Senin & Kamis • 09:00 WIB
                                </p>
                                <p>Finance@trimtime.com</p>
                            </div>
                            <Button className='w-full gap-2'>
                                <Wallet className='h-4 w-4' />
                                Aktifkan payout otomatis
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            TrimTime Premium insight
                        </CardTitle>
                        <CardDescription>
                            Analitik tambahan untuk premium owner.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-3'>
                        {[
                            {
                                label: "Repeat vs new customer",
                                value: "62% repeat",
                            },
                            {
                                label: "Utilisasi kursi",
                                value: "78% rata-rata",
                            },
                            { label: "Pelanggan loyal", value: "1.480 poin" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'
                            >
                                <p className='text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
                                    <Percent className='h-3.5 w-3.5 text-primary' />
                                    {item.label}
                                </p>
                                <p className='text-2xl font-bold text-foreground'>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
