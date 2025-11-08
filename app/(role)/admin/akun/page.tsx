"use client";

import {
    BadgeCheck,
    Ban,
    CheckSquare,
    Mail,
    RefreshCcw,
    Search,
    Shield,
    UserMinus,
    UserPlus,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const pendingOwners = [
    {
        name: "Rifky Mahesa",
        brand: "FadeSmith Kemang",
        docs: "NPWP, SIUP, foto outlet",
        status: "Menunggu verifikasi",
    },
    {
        name: "Nadia Lestari",
        brand: "Gentle Club Bandung",
        docs: "NPWP, SIUP (butuh revisi)",
        status: "Butuh revisi",
    },
] as const;

const activeAccounts = [
    {
        name: "TrimTime Group",
        role: "Owner",
        status: "Aktif",
        last: "2 menit lalu",
    },
    {
        name: "Naya Pratama",
        role: "Freelancer",
        status: "Aktif",
        last: "5 menit lalu",
    },
    {
        name: "Rizky Customer",
        role: "User",
        status: "Suspend",
        last: "1 jam lalu",
    },
] as const;

export default function AdminAkunPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Shield className='h-4 w-4' />
                                Manajemen Akun
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Verifikasi & kontrol akses</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Tim admin memastikan owner, barber, dan user mengikuti standar operasional TrimTime.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <UserPlus className='h-4 w-4' />
                                Buat akun admin
                            </Button>
                            <Button variant='outline' className='border-border/60 gap-2'>
                                <RefreshCcw className='h-4 w-4' />
                                Sinkron RBAC
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Verifikasi owner baru</CardTitle>
                        <CardDescription>Validasi legalitas sebelum cabang live di aplikasi.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='flex flex-wrap gap-3'>
                            <Input placeholder='Cari nama/brand' className='max-w-sm border-border/60' />
                            <Button variant='outline' className='gap-2 border-border/60'>
                                <Search className='h-4 w-4' />
                                Filter
                            </Button>
                            <Button variant='outline' className='gap-2 border-border/60'>
                                <CheckSquare className='h-4 w-4' />
                                Approve massal
                            </Button>
                        </div>
                        <div className='grid gap-3'>
                            {pendingOwners.map((owner) => (
                                <div key={owner.brand} className='flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between'>
                                    <div>
                                        <p className='text-base font-semibold text-foreground'>{owner.brand}</p>
                                        <p className='text-sm text-muted-foreground'>PIC: {owner.name}</p>
                                        <p className='text-xs text-muted-foreground'>Dokumen: {owner.docs}</p>
                                    </div>
                                    <div className='flex flex-wrap gap-2'>
                                        <Button size='sm' variant='outline' className='border-border/60 gap-2'>
                                            <Mail className='h-3.5 w-3.5' />
                                            Hubungi
                                        </Button>
                                        <Button size='sm' className='gap-2'>
                                            <BadgeCheck className='h-3.5 w-3.5' />
                                            Verifikasi
                                        </Button>
                                        <Button size='sm' variant='destructive' className='gap-2'>
                                            <Ban className='h-3.5 w-3.5' />
                                            Tolak
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Semua akun</CardTitle>
                        <CardDescription>Reset password, suspend akun, dan cek aktivitas terakhir.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Akun</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aktivitas</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeAccounts.map((account) => (
                                        <TableRow key={account.name}>
                                            <TableCell className='font-semibold text-foreground'>{account.name}</TableCell>
                                            <TableCell>{account.role}</TableCell>
                                            <TableCell>
                                                <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
                                                    {account.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='text-sm text-muted-foreground'>{account.last}</TableCell>
                                            <TableCell>
                                                <div className='flex flex-wrap gap-2 text-xs'>
                                                    <Button size='sm' variant='outline' className='border-border/60'>
                                                        Reset password
                                                    </Button>
                                                    <Button size='sm' variant='outline' className='border-border/60 gap-1'>
                                                        <UserMinus className='h-3.5 w-3.5' />
                                                        Suspend
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                            <p className='font-semibold text-primary'>RBAC aktif</p>
                            <p>Atur granular akses (read/write/delete) untuk admin regional lewat menu Audit & Keamanan.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Checklist keamanan</CardTitle>
                        <CardDescription>Pastikan prosedur KYC dipenuhi.</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                        {[
                            "NPWP valid",
                            "Foto outlet jelas",
                            "Surat izin usaha",
                            "Nomor darurat",
                            "Integrasi POS",
                            "Akun admin ganda",
                        ].map((item) => (
                            <label key={item} className='flex items-center gap-3 rounded-lg border border-border/40 bg-muted/15 px-3 py-2 text-sm'>
                                <Checkbox className='border-border/60' />
                                {item}
                            </label>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
