"use client";

import Link from "next/link";

import {
    Building2,
    CalendarCog,
    CheckCircle2,
    Clock4,
    Pencil,
    Plus,
    Sparkles,
    Trash2,
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
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { mockBranches } from "./_data/mock-branches";

export default function OwnerCabangPage() {
    const totalActive = mockBranches.filter(
        (branch) => branch.status === "Aktif"
    ).length;
    const totalPending = mockBranches.filter(
        (branch) => branch.status === "Menunggu"
    ).length;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Building2 className='h-4 w-4' />
                                Multi Cabang
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Kelola cabang TrimTime
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Tambahkan cabang baru, atur jam buka, layanan,
                                harga, dan foto agar tampil konsisten di
                                aplikasi user.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2' asChild>
                                <Link href='/owner/cabang/create'>
                                    <Plus className='h-4 w-4' />
                                    Registrasi cabang baru
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <UploadCloud className='h-4 w-4' />
                                Import via template
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Daftar cabang
                        </CardTitle>
                        <CardDescription>
                            Monitor status operasional setiap cabang, lengkap
                            dengan okupansi kursi.
                        </CardDescription>
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
                                    <TableHead className='w-[120px] text-right'>
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockBranches.map((branch) => (
                                    <TableRow key={branch.slug}>
                                        <TableCell className='font-semibold text-foreground'>
                                            {branch.name}
                                        </TableCell>
                                        <TableCell>{branch.address}</TableCell>
                                        <TableCell className='text-sm font-medium text-foreground'>
                                            {branch.schedule}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {branch.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='text-sm font-semibold text-foreground'>
                                            {branch.occupancy}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <div className='flex items-center justify-end gap-2'>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='gap-1 text-primary'
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/owner/cabang/${branch.slug}/edit`}
                                                    >
                                                        <Pencil className='h-3.5 w-3.5' />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='sm'
                                                            className='gap-1 text-destructive hover:text-destructive'
                                                        >
                                                            <Trash2 className='h-3.5 w-3.5' />
                                                            Hapus
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Hapus cabang{" "}
                                                                {branch.name}?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Aksi ini akan
                                                                menghapus cabang
                                                                dari dashboard
                                                                owner dan
                                                                menghentikan
                                                                booking
                                                                pelanggan
                                                                terkait. Kami
                                                                sarankan
                                                                mengarsipkan
                                                                data terlebih
                                                                dahulu sebelum
                                                                melanjutkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
                                                                Ya, hapus cabang
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-[1.1fr_0.9fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Alur registrasi cabang
                            </CardTitle>
                            <CardDescription>
                                Persiapkan dokumen agar verifikasi 1x24 jam
                                berjalan mulus.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-sm text-muted-foreground'>
                            <ol className='space-y-3'>
                                {[
                                    "Lengkapi data cabang dan dokumen legalitas di halaman registrasi.",
                                    "Tim Admin TrimTime melakukan verifikasi dan validasi koordinat.",
                                    "Saat status berubah menjadi aktif, cabang langsung tampil di aplikasi user.",
                                ].map((item, index) => (
                                    <li
                                        key={item}
                                        className='flex items-start gap-3 rounded-lg border border-border/40 bg-muted/10 px-3 py-2'
                                    >
                                        <span className='mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary'>
                                            {index + 1}
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                            <Separator className='border-border/60' />
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'>
                                <p className='flex items-center gap-2 text-sm font-semibold text-primary'>
                                    <Sparkles className='h-4 w-4' />
                                    Tips konversi tinggi
                                </p>
                                <ul className='mt-2 list-disc space-y-1 pl-5 text-sm'>
                                    <li>
                                        Upload foto interior terang dan
                                        konsisten dengan brand.
                                    </li>
                                    <li>
                                        Aktifkan layanan Home Service untuk
                                        cakupan area lebih luas.
                                    </li>
                                    <li>
                                        Pastikan jam operasional update saat
                                        tanggal merah.
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className='flex flex-col gap-2 border-t border-border/50 bg-muted/10 px-6 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
                            <span>Siap tambah cabang baru?</span>
                            <Button size='sm' className='gap-2' asChild>
                                <Link href='/owner/cabang/create'>
                                    <Plus className='h-4 w-4' />
                                    Mulai registrasi
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Jam operasional mingguan
                            </CardTitle>
                            <CardDescription>
                                Sinkron dengan auto schedule TrimTime Premium.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {mockBranches[0]?.weeklySchedule?.map((slot) => (
                                <div
                                    key={slot}
                                    className='rounded-lg border border-border/40 bg-muted/15 px-3 py-2 text-sm text-muted-foreground'
                                >
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
                                <p>
                                    Tambah slot malam Jumat–Sabtu untuk cabang
                                    CBD, demand tinggi habis payday.
                                </p>
                            </div>
                            <Button
                                variant='outline'
                                className='w-full border-border/60 gap-2'
                            >
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
