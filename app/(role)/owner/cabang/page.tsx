"use client";

import {
    Building,
    Building2,
    CalendarCog,
    Camera,
    Clock4,
    MapPin,
    Plus,
    Sparkles,
    UploadCloud,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const branches = [
    {
        name: "TrimTime SCBD",
        address: "District 8, Jakarta",
        schedule: "10:00 - 22:00",
        status: "Aktif",
        occupancy: "92%",
    },
    {
        name: "TrimTime Menteng",
        address: "Jl. HOS Cokroaminoto 82",
        schedule: "09:00 - 21:00",
        status: "Aktif",
        occupancy: "84%",
    },
    {
        name: "TrimTime BSD",
        address: "QBig Extension",
        schedule: "10:00 - 20:00",
        status: "Butuh booster",
        occupancy: "68%",
    },
] as const;

const services = [
    { label: "Signature Fade", price: "Rp 95.000" },
    { label: "Kids Cut", price: "Rp 75.000" },
    { label: "Steam Therapy", price: "Rp 35.000" },
] as const;

export default function OwnerCabangPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Building2 className='h-4 w-4' />
                                Multi Cabang
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Kelola cabang TrimTime</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Tambahkan cabang baru, atur jam buka, layanan, harga, dan foto agar tampil konsisten di aplikasi user.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <Plus className='h-4 w-4' />
                                Registrasi cabang baru
                            </Button>
                            <Button variant='outline' className='border-border/60 gap-2'>
                                <UploadCloud className='h-4 w-4' />
                                Import via template
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Daftar cabang</CardTitle>
                        <CardDescription>Monitor status operasional setiap cabang, lengkap dengan okupansi kursi.</CardDescription>
                    </CardHeader>
                    <CardContent className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cabang</TableHead>
                                    <TableHead>Alamat</TableHead>
                                    <TableHead>Jam buka</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Okupansi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {branches.map((branch) => (
                                    <TableRow key={branch.name}>
                                        <TableCell className='font-semibold text-foreground'>{branch.name}</TableCell>
                                        <TableCell>{branch.address}</TableCell>
                                        <TableCell className='text-sm font-medium text-foreground'>{branch.schedule}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {branch.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='text-sm font-semibold text-foreground'>{branch.occupancy}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-[1.4fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Form registrasi cabang</CardTitle>
                            <CardDescription>Lengkapi detail cabang. Admin TrimTime akan memverifikasi dalam 1x24 jam.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='branch-name'>Nama cabang</Label>
                                    <Input id='branch-name' placeholder='TrimTime Kemang' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='branch-phone'>Kontak cabang</Label>
                                    <Input id='branch-phone' placeholder='0821xxxxxxx' />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='branch-address'>Alamat lengkap</Label>
                                <Textarea id='branch-address' rows={3} placeholder='Jl. Example No. 12A, Jakarta Selatan' />
                            </div>
                            <div className='grid gap-4 sm:grid-cols-3'>
                                <div className='space-y-2'>
                                    <Label htmlFor='branch-open'>Jam buka</Label>
                                    <Input id='branch-open' placeholder='09:00' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='branch-close'>Jam tutup</Label>
                                    <Input id='branch-close' placeholder='21:00' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='branch-slot'>Slot kursi</Label>
                                    <Input id='branch-slot' placeholder='10 kursi' />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label>Layanan & harga</Label>
                                <div className='space-y-2 rounded-xl border border-border/40 bg-muted/15 p-3 text-sm text-muted-foreground'>
                                    {services.map((service) => (
                                        <div key={service.label} className='flex items-center justify-between'>
                                            <span>{service.label}</span>
                                            <span className='font-semibold text-foreground'>{service.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label>Fitur cabang</Label>
                                <div className='grid gap-3 sm:grid-cols-2'>
                                    {["Booking online", "Home service", "Mini store", "Kids friendly"].map((label) => (
                                        <label key={label} className='flex items-center gap-3 rounded-lg border border-border/40 bg-background/70 px-3 py-2 text-sm'>
                                            <Checkbox checked className='border-border/50' />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label>Foto cabang</Label>
                                <div className='flex items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/15 p-6 text-center text-sm text-muted-foreground'>
                                    <div className='space-y-2'>
                                        <Camera className='mx-auto h-6 w-6 text-primary' />
                                        <p>Unggah 3 foto interior/eksterior (minimal 1080px)</p>
                                        <Button variant='outline' className='border-border/60'>
                                            Pilih foto
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Button className='w-full'>Ajukan verifikasi</Button>
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Jam operasional mingguan</CardTitle>
                            <CardDescription>Sinkron dengan auto schedule TrimTime Premium.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {["Senin - Jumat: 09:00 - 21:00", "Sabtu: 08:00 - 22:00", "Minggu: 10:00 - 18:00"].map((slot) => (
                                <div key={slot} className='rounded-lg border border-border/40 bg-muted/15 px-3 py-2 text-sm text-muted-foreground'>
                                    <div className='flex items-center gap-2'>
                                        <Clock4 className='h-4 w-4 text-primary' />
                                        <span>{slot}</span>
                                    </div>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground'>
                                <p className='font-semibold text-primary flex items-center gap-2'>
                                    <Sparkles className='h-4 w-4' />
                                    Tips coverage
                                </p>
                                <p>Tambah slot malam Jumat–Sabtu untuk cabang CBD, demand tinggi habis payday.</p>
                            </div>
                            <Button variant='outline' className='w-full border-border/60 gap-2'>
                                <CalendarCog className='h-4 w-4' />
                                Sinkron ke Google Calendar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
