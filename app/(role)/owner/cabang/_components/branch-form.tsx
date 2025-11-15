"use client";

import Link from "next/link";

import { ArrowLeft, Info, UploadCloud } from "lucide-react";

import { BranchFeature, MockBranch, branchFeatureOptions, defaultBranchServices } from "../_data/mock-branches";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PHOTO_UPLOAD_HINT = "Unggah 3 foto interior/eksterior (minimal 1080px)";

type BranchFormProps = {
    mode: "create" | "edit";
    branch?: MockBranch;
};

const STATUS_COPY: Record<MockBranch["status"], { tone: string; description: string }> = {
    Aktif: {
        tone: "text-primary",
        description: "Cabang sudah tayang di aplikasi pelanggan dan dapat menerima booking.",
    },
    Menunggu: {
        tone: "text-muted-foreground",
        description: "Tim Admin TrimTime sedang meninjau dokumen dan validasi lokasi Anda (maks 1x24 jam).",
    },
    "Butuh booster": {
        tone: "text-amber-600",
        description: "Aktif, namun performa cabang menurun. Gunakan promo & push notifikasi untuk menaikkan demand.",
    },
};

export function BranchForm({ mode, branch }: BranchFormProps) {
    const [openTime = "", closeTime = ""] = branch?.schedule?.split(" - ") ?? [];

    const selectedFeatures = new Set<BranchFeature>(branch?.features ?? []);
    const services = branch?.services ?? defaultBranchServices;

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between gap-4'>
                <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                        <Info className='h-4 w-4 text-primary' />
                        {mode === "create" ? "Registrasi cabang" : "Edit detail cabang"}
                    </div>
                    <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                        {mode === "create"
                            ? "Lengkapi detail cabang baru"
                            : `Perbarui cabang ${branch?.name ?? "TrimTime"}`}
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Admin TrimTime akan melakukan verifikasi dalam 1x24 jam setelah dokumen dan foto lengkap diunggah.
                    </p>
                </div>
                <Button variant='ghost' className='hidden gap-2 text-primary sm:inline-flex' asChild>
                    <Link href='/owner/cabang'>
                        <ArrowLeft className='h-4 w-4' />
                        Kembali ke daftar cabang
                    </Link>
                </Button>
            </div>

            {branch && (
                <Card className='border-border/60 bg-muted/10'>
                    <CardContent className='flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='space-y-1'>
                            <div className='flex flex-wrap items-center gap-2'>
                                <Badge variant='outline' className='border-border/60 text-xs uppercase tracking-widest text-muted-foreground'>
                                    Status cabang
                                </Badge>
                                <Badge className='bg-primary/10 text-primary'>
                                    {branch.status}
                                </Badge>
                            </div>
                            <p className={`text-sm ${STATUS_COPY[branch.status].tone}`}>
                                {STATUS_COPY[branch.status].description}
                            </p>
                        </div>
                        <div className='text-sm text-muted-foreground'>
                            <span className='font-semibold text-foreground'>Kontak PIC: </span>
                            {branch.contact ?? "Belum diisi"}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Profil cabang</CardTitle>
                    <CardDescription>Data ini akan tampil di aplikasi pelanggan TrimTime.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='branch-name'>Nama cabang</Label>
                            <Input id='branch-name' placeholder='TrimTime Kemang' defaultValue={branch?.name ?? ""} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='branch-contact'>Kontak cabang / PIC</Label>
                            <Input id='branch-contact' placeholder='0821xxxxxxxx' defaultValue={branch?.contact ?? ""} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='branch-address'>Alamat lengkap</Label>
                        <Textarea
                            id='branch-address'
                            rows={3}
                            placeholder='Jl. Example No. 12A, Jakarta Selatan'
                            defaultValue={branch?.address ?? ""}
                        />
                    </div>
                    <div className='grid gap-4 sm:grid-cols-3'>
                        <div className='space-y-2'>
                            <Label htmlFor='branch-open'>Jam buka</Label>
                            <Input id='branch-open' placeholder='09:00' defaultValue={openTime} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='branch-close'>Jam tutup</Label>
                            <Input id='branch-close' placeholder='21:00' defaultValue={closeTime} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='branch-seat'>Jumlah kursi</Label>
                            <Input id='branch-seat' placeholder='10 kursi' />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Layanan & harga</CardTitle>
                    <CardDescription>Informasi ini membantu pelanggan memilih paket grooming yang tepat.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                    <div className='space-y-2 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm text-muted-foreground'>
                        {services.map((service) => (
                            <div key={service.name} className='flex items-center justify-between rounded-lg bg-background/60 px-3 py-2 text-foreground'>
                                <span>{service.name}</span>
                                <span className='font-semibold'>{service.price}</span>
                            </div>
                        ))}
                    </div>
                    <Button variant='outline' className='border-dashed border-border/60 text-sm text-muted-foreground'>
                        Tambah layanan custom
                    </Button>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Fasilitas pendukung</CardTitle>
                    <CardDescription>Highlight fasilitas unggulan cabang Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid gap-3 sm:grid-cols-2'>
                        {branchFeatureOptions.map((feature) => (
                            <label
                                key={feature}
                                className='flex items-center gap-3 rounded-lg border border-border/50 bg-background/70 px-3 py-2 text-sm text-foreground'
                            >
                                <Checkbox defaultChecked={selectedFeatures.has(feature)} className='border-border/50' />
                                {feature}
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Galeri cabang</CardTitle>
                    <CardDescription>Foto berkualitas tinggi meningkatkan keyakinan pelanggan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid gap-3 sm:grid-cols-3'>
                        {[1, 2, 3].map((slot) => (
                            <div
                                key={slot}
                                className='flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 p-4 text-center text-sm text-muted-foreground'
                            >
                                <UploadCloud className='mb-3 h-6 w-6 text-primary' />
                                <p>{PHOTO_UPLOAD_HINT}</p>
                                <Button variant='outline' size='sm' className='mt-3 border-border/60 text-xs'>
                                    Pilih foto
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 bg-muted/10 shadow-sm'>
                <CardContent className='flex flex-col gap-3 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <span className='font-semibold text-foreground'>Tips verifikasi cepat:</span> Pastikan koordinat Google Maps tepat,
                        jam operasional sesuai, dan nomor kontak responsif.
                    </div>
                    <Button size='sm' variant='outline' className='border-border/60 text-sm text-primary' asChild>
                        <Link href='/owner/cabang'>
                            Panduan lihat contoh cabang sukses
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card className='border border-dashed border-primary/50 bg-primary/5'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold text-primary'>
                        {mode === "create" ? "Siap ajukan cabang baru?" : "Simpan pembaruan cabang"}
                    </CardTitle>
                    <CardDescription className='text-sm text-primary/80'>
                        {mode === "create"
                            ? "TrimTime akan mengirimkan update status via email dan WhatsApp PIC."
                            : "Perubahan akan tercermin di aplikasi pelanggan dalam hitungan menit."}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <Button variant='outline' className='w-full border-border/60 text-sm text-muted-foreground sm:w-auto' asChild>
                        <Link href='/owner/cabang'>
                            Batal
                        </Link>
                    </Button>
                    <Button className='w-full sm:w-auto'>
                        {mode === "create" ? "Ajukan verifikasi" : "Simpan perubahan"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
