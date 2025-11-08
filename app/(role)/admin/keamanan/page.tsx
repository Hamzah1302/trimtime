"use client";

import {
    Activity,
    AlertOctagon,
    Database,
    Key,
    Lock,
    MonitorSmartphone,
    ShieldCheck,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const auditLogs = [
    {
        time: "11 Feb • 10:12",
        actor: "admin@trimtime.com",
        action: "Update RBAC role",
        status: "Sukses",
    },
    {
        time: "11 Feb • 09:55",
        actor: "ops@trimtime.com",
        action: "Suspend akun user",
        status: "Sukses",
    },
    {
        time: "11 Feb • 09:12",
        actor: "unknown IP",
        action: "Percobaan login",
        status: "Ditolak",
    },
] as const;

export default function AdminKeamananPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <ShieldCheck className='h-4 w-4' />
                                Audit & Keamanan
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Log aktivitas, backup, deteksi fraud</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                TrimTime menjaga keamanan data dengan backup harian, monitoring RBAC, dan alert fraud.
                            </p>
                        </div>
                        <Button>
                            Unduh log 7 hari
                        </Button>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-4 sm:grid-cols-4'>
                    {[
                        { icon: Lock, label: "RBAC role", value: "12 role" },
                        { icon: MonitorSmartphone, label: "Perangkat admin aktif", value: "32 device" },
                        { icon: Database, label: "Backup terakhir", value: "11 Feb • 03:00" },
                        { icon: AlertOctagon, label: "Fraud alert", value: "2 kasus" },
                    ].map((tile) => (
                        <Card key={tile.label} className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <p className='flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground'>
                                    <tile.icon className='h-4 w-4 text-primary' />
                                    {tile.label}
                                </p>
                                <CardTitle className='text-xl font-bold text-foreground'>{tile.value}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Log aktivitas</CardTitle>
                        <CardDescription>Semua tindakan sensitif dicatat untuk audit.</CardDescription>
                    </CardHeader>
                    <CardContent className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead>Aksi</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditLogs.map((log) => (
                                    <TableRow key={log.time}>
                                        <TableCell>{log.time}</TableCell>
                                        <TableCell>{log.actor}</TableCell>
                                        <TableCell className='font-semibold text-foreground'>{log.action}</TableCell>
                                        <TableCell>
                                            <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
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
                            <CardTitle className='text-xl font-semibold'>Role-based access</CardTitle>
                            <CardDescription>Pisahkan akses berdasarkan tim (ops, finance, security).</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            {[
                                { role: "Ops Admin", access: "Owner verification, CMS, support" },
                                { role: "Finance Admin", access: "Transaksi, payout, laporan" },
                                { role: "Security Admin", access: "Audit log, RBAC, backup" },
                            ].map((role) => (
                                <div key={role.role} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='text-base font-semibold text-foreground'>{role.role}</p>
                                    <p>{role.access}</p>
                                </div>
                            ))}
                            <Button variant='outline' className='w-full border-border/60 gap-2'>
                                <Key className='h-4 w-4' />
                                Edit role & izin
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Monitoring keamanan</CardTitle>
                            <CardDescription>Fraud detection, firewall, dan backup.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Activity className='h-4 w-4 text-primary' />
                                    Deteksi fraud
                                </p>
                                <p>Algoritma memantau pesanan abnormal & pembayaran duplikat.</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Database className='h-4 w-4 text-primary' />
                                    Backup harian
                                </p>
                                <p>Snapshot database tersimpan di cloud Indonesia & Singapura.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
