"use client";

import {
    CheckCircle2,
    Headphones,
    MessageCircle,
    PauseCircle,
    Send,
    Slack,
    Zap,
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

const tickets = [
    {
        id: "#TCK-2109",
        channel: "Owner portal",
        subject: "Refund belum diterima",
        priority: "Tinggi",
        sla: "00:42:10",
        status: "Open",
    },
    {
        id: "#TCK-2103",
        channel: "Freelancer app",
        subject: "GPS tidak update",
        priority: "Sedang",
        sla: "01:12:00",
        status: "On Hold",
    },
    {
        id: "#TCK-2091",
        channel: "User help center",
        subject: "Kesalahan pembayaran",
        priority: "Tinggi",
        sla: "00:05:30",
        status: "Resolved",
    },
] as const;

export default function AdminSupportPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Headphones className='h-4 w-4' />
                                Customer Support
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Kelola tiket pengaduan</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Auto-reply, statistik masalah, dan eskalasi antar tim.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <Zap className='h-4 w-4' />
                                Aktifkan auto-reply
                            </Button>
                            <Button variant='outline' className='border-border/60 gap-2'>
                                <Slack className='h-4 w-4' />
                                Kirim ke Slack
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {[
                        { label: "Tiket terbuka", value: "56 tiket" },
                        { label: "Auto-reply terjawab", value: "78%" },
                        { label: "SLA < 1 jam", value: "44%" },
                    ].map((item) => (
                        <Card key={item.label} className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>{item.label}</CardDescription>
                                <CardTitle className='text-2xl font-bold'>{item.value}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>Daftar tiket</CardTitle>
                            <CardDescription>Kumpulan tiket dari owner, freelancer, dan user.</CardDescription>
                        </div>
                        <Input placeholder='Cari tiket/subject' className='max-w-sm border-border/60' />
                    </CardHeader>
                    <CardContent className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Channel</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Prioritas</TableHead>
                                    <TableHead>SLA</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className='font-semibold text-foreground'>{ticket.id}</TableCell>
                                        <TableCell>{ticket.channel}</TableCell>
                                        <TableCell>{ticket.subject}</TableCell>
                                        <TableCell>
                                            <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
                                                {ticket.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{ticket.sla}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`text-[10px] uppercase tracking-widest ${
                                                    ticket.status === "Resolved"
                                                        ? "bg-emerald-500/15 text-emerald-600"
                                                        : ticket.status === "On Hold"
                                                        ? "bg-amber-500/15 text-amber-600"
                                                        : "bg-primary/15 text-primary"
                                                }`}
                                            >
                                                {ticket.status}
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
                            <CardTitle className='text-xl font-semibold'>Auto-reply template</CardTitle>
                            <CardDescription>Balasan cepat via WhatsApp/email.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {[
                                "Refund dalam proses • jelaskan estimasi 1x24 jam",
                                "Issue home service • minta bukti foto & waktu",
                                "Akun suspend • arahkan ke verifikasi ulang",
                            ].map((item, index) => (
                                <div key={item} className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                    <p className='font-semibold text-foreground'>Template #{index + 1}</p>
                                    <p>{item}</p>
                                </div>
                            ))}
                            <Button variant='outline' className='w-full border-border/60 gap-2'>
                                <MessageCircle className='h-4 w-4' />
                                Tambah template
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Analitik masalah</CardTitle>
                            <CardDescription>Kelompokkan komplain per kategori.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            {[
                                { label: "Pembayaran/refund", value: "41%" },
                                { label: "Kualitas layanan", value: "33%" },
                                { label: "Aplikasi/teknis", value: "17%" },
                                { label: "Lainnya", value: "9%" },
                            ].map((item) => (
                                <div key={item.label} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='flex items-center gap-2 text-foreground font-semibold'>
                                        <CheckCircle2 className='h-4 w-4 text-primary' />
                                        {item.label}
                                    </p>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Notif & integrasi</CardTitle>
                        <CardDescription>Atur jalur eskalasi otomatis.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3 text-sm text-muted-foreground'>
                        <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                            <p className='font-semibold text-foreground'>Telegram / Slack</p>
                            <p>Kirim alert tiket prioritas tinggi ke channel #trimtime-alert.</p>
                        </div>
                        <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                            <p className='font-semibold text-foreground'>Forward ke owner</p>
                            <p>Komplain pelanggan dapat diarahkan ke owner jika terkait layanan internal.</p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
