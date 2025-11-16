"use client";

import Link from "next/link";

import {
    ArrowLeft,
    CalendarDays,
    Info,
    Megaphone,
    Sparkles,
    Target,
} from "lucide-react";

import { ownerLoyaltyStats, promoChannels, promoDiscountTypes, promoSegmentOptions, type OwnerPromo } from "../_data/mock-promos";
import { mockBranches } from "../../cabang/_data/mock-branches";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export type PromoFormMode = "create" | "edit";

type PromoFormProps = {
    mode: PromoFormMode;
    promo?: OwnerPromo;
};

const branchOptions = mockBranches.map((branch) => ({
    value: branch.slug,
    label: branch.name,
    description: branch.address,
}));

export function PromoForm({ mode, promo }: PromoFormProps) {
    const selectedSegments = new Set(promo?.segments ?? []);
    const selectedBranches = new Set(promo?.branchCoverage ?? []);

    return (
        <div className='space-y-6'>
            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div className='space-y-2'>
                    <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                        <Info className='h-4 w-4 text-primary' />
                        {mode === "create" ? "Campaign promo baru" : "Detail campaign promo"}
                    </div>
                    <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                        {mode === "create" ? "Buat campaign promo" : promo?.name ?? "Promo TrimTime"}
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        {mode === "create"
                            ? "Atur benefit, target pelanggan, dan jadwal tayang promo sebelum disebarkan ke aplikasi user."
                            : "Perbarui detail campaign, pantau performa, dan kelola distribusi promo lintas cabang."}
                    </p>
                </div>
                <Button variant='ghost' className='gap-2 text-primary' asChild>
                    <Link href='/owner/promo'>
                        <ArrowLeft className='h-4 w-4' />
                        Kembali ke daftar promo
                    </Link>
                </Button>
            </div>

            <div className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
                <div className='space-y-6'>
                    <Card className='border-border/60 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-lg font-semibold'>Informasi promo</CardTitle>
                            <CardDescription>Detail utama yang tampil di aplikasi dan dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-name'>Judul promo</Label>
                                    <Input id='promo-name' placeholder='Contoh: Payday Fade 20%' defaultValue={promo?.name ?? ""} />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-code'>Kode / ID promo</Label>
                                    <Input id='promo-code' placeholder='PROMO-XXXX' defaultValue={promo?.id ?? ""} disabled={mode === "edit"} />
                                </div>
                            </div>
                            <div className='grid gap-4 sm:grid-cols-3'>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-channel'>Channel distribusi</Label>
                                    <Select defaultValue={promo?.channel ?? undefined}>
                                        <SelectTrigger id='promo-channel' className='w-full justify-between border-border/60'>
                                            <SelectValue placeholder='Pilih channel' />
                                        </SelectTrigger>
                                        <SelectContent className='min-w-52'>
                                            {promoChannels.map((channel) => (
                                                <SelectItem key={channel} value={channel}>
                                                    {channel}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-discount-type'>Tipe diskon</Label>
                                    <Select defaultValue={promo?.discountType ?? undefined}>
                                        <SelectTrigger id='promo-discount-type' className='w-full justify-between border-border/60'>
                                            <SelectValue placeholder='Pilih tipe diskon' />
                                        </SelectTrigger>
                                        <SelectContent className='min-w-52'>
                                            {promoDiscountTypes.map((discount) => (
                                                <SelectItem key={discount} value={discount}>
                                                    {discount}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-discount-value'>Nilai diskon</Label>
                                    <Input id='promo-discount-value' placeholder='Contoh: 20% / Rp 25.000' defaultValue={promo?.discountValue ?? ""} />
                                </div>
                            </div>
                            <div className='grid gap-4 sm:grid-cols-3'>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-target'>Target pelanggan</Label>
                                    <Input id='promo-target' placeholder='Contoh: Member Gold' defaultValue={promo?.target ?? ""} />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-min'>Minimal transaksi</Label>
                                    <Input id='promo-min' placeholder='Contoh: Rp 150.000' defaultValue={promo?.minTransaction ?? ""} />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-quota'>Kuota</Label>
                                    <Input id='promo-quota' placeholder='Contoh: 500 klaim' defaultValue={promo?.quota ?? ""} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/60 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-lg font-semibold'>Periode & penayangan</CardTitle>
                            <CardDescription>Pastikan tanggal tayang sesuai jadwal campaign.</CardDescription>
                        </CardHeader>
                        <CardContent className='grid gap-4 sm:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='promo-start'>Mulai</Label>
                                <Input
                                    id='promo-start'
                                    type='date'
                                    defaultValue={promo?.period.start ?? ""}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='promo-end'>Selesai</Label>
                                <Input
                                    id='promo-end'
                                    type='date'
                                    defaultValue={promo?.period.end ?? ""}
                                />
                            </div>
                            <div className='sm:col-span-2 space-y-2'>
                                <Label htmlFor='promo-period-label'>Label periode untuk tampilan</Label>
                                <Input id='promo-period-label' placeholder='Contoh: 25 Jan - 30 Jan 2025' defaultValue={promo?.period.label ?? ""} />
                            </div>
                            <div className='sm:col-span-2 flex items-center justify-between rounded-xl border border-border/40 bg-muted/10 px-4 py-3'>
                                <div className='space-y-1 text-sm text-muted-foreground'>
                                    <p className='font-semibold text-foreground'>Publish otomatis ke aplikasi user</p>
                                    <p>Promo akan tampil di tab Promo dan dikirim push notification.</p>
                                </div>
                                <Switch defaultChecked={promo?.publishToApp ?? true} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/60 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-lg font-semibold'>Targeting & cabang</CardTitle>
                            <CardDescription>Pilih segmen pelanggan dan cabang yang ikut campaign.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-2'>
                                <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                    <Target className='h-4 w-4 text-primary' />
                                    Segmen pelanggan
                                </div>
                                <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                                    {promoSegmentOptions.map((segment) => (
                                        <label
                                            key={segment}
                                            className='flex items-center gap-3 rounded-lg border border-border/40 bg-muted/10 px-3 py-2 text-sm'
                                        >
                                            <Checkbox defaultChecked={selectedSegments.has(segment)} className='border-border/60' />
                                            {segment}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                    <Megaphone className='h-4 w-4 text-primary' />
                                    Cabang terlibat
                                </div>
                                <div className='grid gap-2 sm:grid-cols-2'>
                                    {branchOptions.map((branch) => (
                                        <label
                                            key={branch.value}
                                            className='flex items-start gap-3 rounded-lg border border-border/40 bg-muted/10 px-3 py-2 text-sm'
                                        >
                                            <Checkbox defaultChecked={selectedBranches.has(branch.label)} className='mt-1 border-border/60' />
                                            <span>
                                                <span className='font-medium text-foreground'>{branch.label}</span>
                                                <span className='block text-xs text-muted-foreground'>{branch.description}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/60 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-lg font-semibold'>Konten & benefit</CardTitle>
                            <CardDescription>Sampaikan alasan pelanggan harus klaim promo ini.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='promo-description'>Deskripsi promo</Label>
                                <Textarea
                                    id='promo-description'
                                    rows={4}
                                    placeholder='Tulis syarat dan ketentuan singkat, benefit tambahan, atau CTA booking.'
                                    defaultValue={promo?.description ?? ""}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='promo-benefits'>Benefit utama</Label>
                                <Textarea
                                    id='promo-benefits'
                                    rows={3}
                                    placeholder='Pisahkan tiap benefit dengan baris baru.'
                                    defaultValue={promo?.benefits?.join("\n") ?? ""}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='promo-notes'>Catatan internal</Label>
                                <Textarea
                                    id='promo-notes'
                                    rows={3}
                                    placeholder='Catatan untuk tim operasional, contoh: pantau stok produk steam.'
                                    defaultValue={promo?.notes ?? ""}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                            <Button variant='outline' className='w-full border-border/60 text-muted-foreground sm:w-auto'>
                                Simpan sebagai draft
                            </Button>
                            <Button className='w-full sm:w-auto'>
                                {mode === "create" ? "Publikasikan campaign" : "Simpan perubahan"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className='space-y-6'>
                    {mode === "edit" && promo ? (
                        <>
                            <Card className='border-border/60 bg-muted/10 shadow-sm'>
                                <CardHeader>
                                    <CardTitle className='flex items-center justify-between text-sm font-semibold uppercase tracking-widest'>
                                        Status campaign
                                        <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
                                            {promo.status}
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription>ID {promo.id}</CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                    {promo.timeline.map((item) => (
                                        <div key={item.label} className='flex items-start justify-between gap-2 rounded-lg border border-border/30 bg-background/60 px-3 py-2'>
                                            <span className='font-medium text-foreground'>{item.label}</span>
                                            <span className='text-right'>{item.value}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className='border-border/60 shadow-sm'>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2 text-sm font-semibold uppercase tracking-widest'>
                                        <Sparkles className='h-4 w-4 text-primary' />
                                        Insight performa
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-3'>
                                    {promo.metrics.map((metric) => (
                                        <div key={metric.label} className='space-y-1 rounded-xl border border-border/40 bg-muted/10 p-3'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>{metric.label}</p>
                                            <p className='text-lg font-semibold text-foreground'>{metric.value}</p>
                                            {metric.helper && <p className='text-xs text-muted-foreground'>{metric.helper}</p>}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card className='border-dashed border-primary/30 bg-primary/5 shadow-none'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary'>
                                    <Sparkles className='h-4 w-4' />
                                    Checklist campaign sukses
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                <p className='rounded-lg border border-primary/20 bg-background/80 px-3 py-2'>
                                    • Gunakan judul promo yang jelas dan singkat.
                                </p>
                                <p className='rounded-lg border border-primary/20 bg-background/80 px-3 py-2'>
                                    • Tentukan target segmen agar promo tersampaikan tepat sasaran.
                                </p>
                                <p className='rounded-lg border border-primary/20 bg-background/80 px-3 py-2'>
                                    • Pantau performa di menu Laporan &gt; Promo setelah campaign berjalan.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <Card className='border-border/60 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground'>
                                <CalendarDays className='h-4 w-4 text-primary' />
                                Snapshot loyalitas
                            </CardTitle>
                            <CardDescription>Koordinasikan promo dengan performa member aktif.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {ownerLoyaltyStats.map((stat) => (
                                <div key={stat.label} className='rounded-xl border border-border/40 bg-muted/10 p-3'>
                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>{stat.label}</p>
                                    <p className='text-lg font-semibold text-foreground'>{stat.value}</p>
                                    <p className='text-xs text-muted-foreground'>{stat.helper}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
