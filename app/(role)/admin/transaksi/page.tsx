"use client";

import {
    AlertTriangle,
    ArrowDownCircle,
    ArrowUpCircle,
    Banknote,
    Filter,
    History,
    RefreshCcw,
    Shield,
    Wallet,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const transactionLogs = [
    {
        id: "TRX-98123",
        user: "TrimTime SCBD",
        type: "Booking",
        amount: "Rp 320.000",
        fee: "Rp 32.000",
        status: "Sukses",
    },
    {
        id: "TRX-98111",
        user: "Naya Pratama",
        type: "Payout freelancer",
        amount: "Rp 2.450.000",
        fee: "Rp 0",
        status: "Diproses",
    },
    {
        id: "TRX-98092",
        user: "Hafidz Rahman",
        type: "Refund user",
        amount: "Rp 185.000",
        fee: "-",
        status: "Sengketa",
    },
] as const;

export default function AdminTransaksiPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Banknote className='h-4 w-4' />
                                Monitoring Transaksi
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Fee 10%, refund, sengketa
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pantau seluruh transaksi digital, status payout,
                                dan alert payment gateway.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <RefreshCcw className='h-4 w-4' />
                                Sync gateway
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Filter className='h-4 w-4' />
                                Filter lanjutan
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {[
                        {
                            label: "Total transaksi hari ini",
                            value: "Rp 742.000.000",
                        },
                        { label: "Fee platform 10%", value: "Rp 74.200.000" },
                        { label: "Refund berjalan", value: "32 kasus" },
                        { label: "Status gateway", value: "100% uptime" },
                    ].map((stat) => (
                        <Card
                            key={stat.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>
                                    {stat.label}
                                </CardDescription>
                                <CardTitle className='text-2xl font-bold'>
                                    {stat.value}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Log transaksi
                            </CardTitle>
                            <CardDescription>
                                Booking, payout, refund, dan sengketa.
                            </CardDescription>
                        </div>
                        <Input
                            placeholder='Cari ID / nama'
                            className='max-w-sm border-border/60'
                        />
                    </CardHeader>
                    <CardContent className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Akun</TableHead>
                                    <TableHead>Jenis</TableHead>
                                    <TableHead>Nominal</TableHead>
                                    <TableHead>Fee 10%</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactionLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className='font-semibold text-foreground'>
                                            {log.id}
                                        </TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell>{log.type}</TableCell>
                                        <TableCell>{log.amount}</TableCell>
                                        <TableCell>{log.fee}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest'
                                            >
                                                {log.status}
                                            </Badge>
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
                                Refund & sengketa
                            </CardTitle>
                            <CardDescription>
                                Alur penyelesaian otomatis + manual.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <ArrowDownCircle className='h-4 w-4 text-primary' />
                                    Refund pelanggan
                                </p>
                                <p>SL A rata-rata 1x24 jam • 80% otomatis</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <ArrowUpCircle className='h-4 w-4 text-primary' />
                                    Sengketa barber/user
                                </p>
                                <p>12 kasus membutuhkan bukti foto/video</p>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'>
                                <p className='font-semibold text-primary flex items-center gap-2'>
                                    <AlertTriangle className='h-4 w-4' />
                                    Alert chargeback
                                </p>
                                <p>
                                    Peringatan otomatis jika dispute {">"} Rp 3
                                    jt dalam 6 jam terakhir.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Payout & dompet
                            </CardTitle>
                            <CardDescription>
                                Distribusi dana owner/freelancer.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-sm text-muted-foreground'>
                            {[
                                {
                                    title: "Payout owner 70%",
                                    value: "Rp 205 jt • proses jam 20.00",
                                },
                                {
                                    title: "Payout freelancer",
                                    value: "Rp 74 jt • real time",
                                },
                                {
                                    title: "Saldo escrow",
                                    value: "Rp 18 jt • buffer refund",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4'
                                >
                                    <p className='text-base font-semibold text-foreground'>
                                        {item.title}
                                    </p>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                            <Button
                                variant='outline'
                                className='w-full border-border/60 gap-2'
                            >
                                <Wallet className='h-4 w-4' />
                                Kelola jadwal payout
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Log payment gateway
                        </CardTitle>
                        <CardDescription>
                            Riwayat webhook & retry.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3 text-sm text-muted-foreground'>
                        <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                            <p className='flex items-center gap-2 text-foreground font-semibold'>
                                <History className='h-4 w-4 text-primary' />
                                32 retry sukses
                            </p>
                            <p>
                                Gateway otomatis melakukan retry jika status
                                pending {">"} 5 menit.
                            </p>
                        </div>
                        <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                            <p className='flex items-center gap-2 text-foreground font-semibold'>
                                <Shield className='h-4 w-4 text-primary' />
                                Fraud detection
                            </p>
                            <p>
                                Skor risiko di atas 80 langsung dikirim ke menu
                                Audit & Keamanan.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
