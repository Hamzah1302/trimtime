"use client";

import {
    BadgeCheck,
    Briefcase,
    CalendarClock,
    Mail,
    MapPin,
    Plus,
    Send,
    ShieldCheck,
    UserRound,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const barberList = [
    {
        name: "Rama Putra",
        branch: "SCBD",
        level: "Lead Stylist",
        status: "Aktif",
        shift: "10:00 - 18:00",
    },
    {
        name: "Hafidz Rahman",
        branch: "Menteng",
        level: "Senior",
        status: "Cuti",
        shift: "12:00 - 20:00",
    },
    {
        name: "Yoga Mahendra",
        branch: "BSD",
        level: "Junior",
        status: "Aktif",
        shift: "11:00 - 19:00",
    },
] as const;

const skills = [
    "Skin fade",
    "Beard sculpting",
    "Kids specialist",
    "Colouring basic",
] as const;

export default function OwnerBarberPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <UserRound className='h-4 w-4' />
                                Manajemen barber
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Atur tim barber & shift</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Tambah barber baru, aktif/nonaktifkan akun, kirim credential otomatis, dan pantau status shift real-time.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <Plus className='h-4 w-4' />
                                Tambah barber
                            </Button>
                            <Button variant='outline' className='border-border/60 gap-2'>
                                <Send className='h-4 w-4' />
                                Kirim ulang credential
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Daftar barber</CardTitle>
                        <CardDescription>Kelola shift, lokasi bertugas, dan status aktif/nonaktif.</CardDescription>
                    </CardHeader>
                    <CardContent className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Barber</TableHead>
                                    <TableHead>Cabang</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Shift</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {barberList.map((barber) => (
                                    <TableRow key={barber.name}>
                                        <TableCell className='flex items-center gap-3'>
                                            <Avatar className='h-9 w-9'>
                                                <AvatarImage src='/placeholder.jpg' alt={barber.name} />
                                                <AvatarFallback>{barber.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='font-semibold text-foreground'>{barber.name}</p>
                                                <p className='text-xs text-muted-foreground'>ID #{barber.name.slice(0, 3).toUpperCase()}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{barber.branch}</TableCell>
                                        <TableCell>{barber.level}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {barber.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='text-sm font-medium text-foreground'>
                                            {barber.shift}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-[1.3fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Form barber baru</CardTitle>
                            <CardDescription>Isi data barber, skill, dan cabang bertugas. Akun akan dikirim otomatis.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='barber-name'>Nama lengkap</Label>
                                    <Input id='barber-name' placeholder='Nama barber' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='barber-email'>Email</Label>
                                    <Input id='barber-email' placeholder='barber@trimtime.com' />
                                </div>
                            </div>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2 '>
                                    <Label htmlFor='barber-phone'>Nomor telpon</Label>
                                    <Input id='barber-phone' placeholder='08xxx' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='barber-branch'>Cabang</Label>
                                    <Input id='barber-branch' placeholder='Pilih cabang' />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label>Skillset</Label>
                                <div className='grid gap-3 sm:grid-cols-2'>
                                    {skills.map((skill) => (
                                        <label key={skill} className='flex items-center gap-3 rounded-lg border border-border/40 bg-background/80 px-3 py-2 text-sm'>
                                            <Checkbox checked className='border-border/60' />
                                            {skill}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label>Shift default</Label>
                                <div className='grid gap-3 sm:grid-cols-2'>
                                    {["Pagi (09:00-17:00)", "Sore (13:00-21:00)"].map((shift) => (
                                        <label key={shift} className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2 text-sm'>
                                            <Checkbox className='border-border/60' />
                                            {shift}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <Button className='w-full gap-2'>
                                <Mail className='h-4 w-4' />
                                Kirim undangan akun
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Status shift hari ini</CardTitle>
                            <CardDescription>Sinkron dengan auto schedule 70/30 TrimTime Premium.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>Shift pagi</p>
                                <p className='text-lg font-bold text-foreground'>23 barber aktif</p>
                                <p>SCBD, Menteng, Kelapa Gading</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>Shift sore</p>
                                <p className='text-lg font-bold text-foreground'>19 barber aktif</p>
                                <p>BSD, Bandung, Surabaya</p>
                            </div>
                            <div className='space-y-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'>
                                <p className='font-semibold text-primary flex items-center gap-2'>
                                    <CalendarClock className='h-4 w-4' />
                                    Schedule otomatis
                                </p>
                                <p>
                                    TrimTime Premium bisa membagi shift berdasarkan demand cabang, rating barber, dan komisi otomatis 70/30.
                                </p>
                                <Button variant='outline' className='w-full border-border/60 gap-2'>
                                    <ShieldCheck className='h-4 w-4' />
                                    Aktifkan auto-schedule
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
