import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
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
import {
    ArrowLeft,
    Building,
    CalendarClock,
    CheckSquare,
    FileText,
    Megaphone,
    Target,
} from "lucide-react";

const deliverableChecklist = [
    {
        label: "Hero banner 1080x1350",
        helper: "File PSD + JPG",
        done: true,
    },
    {
        label: "Push notif copy",
        helper: "Judul 60 karakter",
        done: true,
    },
    {
        label: "Freelancer highlight",
        helper: "Brief + asset video",
        done: false,
    },
    {
        label: "Marketplace bundle",
        helper: "SKU + diskon %",
        done: false,
    },
] as const;

const placementOptions = [
    "Homepage hero",
    "Freelancer highlight",
    "Marketplace banner",
    "Push notif",
] as const;

type AdminIklanEditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function AdminIklanEditPage({
    params,
}: AdminIklanEditPageProps) {
    const { id } = await params;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Megaphone className='h-4 w-4' />
                                Edit Sponsor
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground uppercase tracking-widest'>
                                    Campaign #{id}
                                </p>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    Perbarui slot iklan & KPI
                                </h1>
                                <p className='text-sm text-muted-foreground lg:text-base'>
                                    Atur partner, periode, dan channel aktivasi
                                    sebelum live ke pengguna.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button
                                asChild
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Link
                                    href={`/admin/iklan/${id}`}
                                    className='inline-flex items-center gap-2'
                                >
                                    <ArrowLeft className='h-4 w-4' />
                                    Kembali ke detail
                                </Link>
                            </Button>
                            <Button className='gap-2'>
                                <CalendarClock className='h-4 w-4' />
                                Sinkron jadwal live
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-10'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Informasi sponsor
                        </CardTitle>
                        <CardDescription>
                            Nama brand, kategori, dan nilai kontrak.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='partner'>Nama partner</Label>
                            <Input
                                id='partner'
                                defaultValue='Pomade Alpha'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='category'>Kategori brand</Label>
                            <Input
                                id='category'
                                defaultValue='Grooming Product'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='investment'>Nilai investasi</Label>
                            <Input
                                id='investment'
                                defaultValue='Rp 220.000.000'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='coverage'>Coverage kampanye</Label>
                            <Input
                                id='coverage'
                                defaultValue='Nasional'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Mulai</Label>
                            <Input
                                type='date'
                                defaultValue='2025-03-01'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Selesai</Label>
                            <Input
                                type='date'
                                defaultValue='2025-03-31'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2 md:col-span-2'>
                            <Label htmlFor='cta'>CTA / landing page</Label>
                            <Input
                                id='cta'
                                defaultValue='https://pomadealpha.com/trimtime'
                                className='border-border/60'
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Channel & deliverables
                        </CardTitle>
                        <CardDescription>
                            Pilih slot iklan dan tandai asset yang sudah siap.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 lg:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label>Slot yang dipakai</Label>
                            <div className='grid gap-2 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm'>
                                {placementOptions.map((slot) => (
                                    <label
                                        key={slot}
                                        className='flex items-center gap-3'
                                    >
                                        <Checkbox
                                            defaultChecked={
                                                slot !== "Marketplace banner"
                                            }
                                            className='border-border/60'
                                        />
                                        <span>{slot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label>Checklist deliverables</Label>
                            <div className='grid gap-3 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm'>
                                {deliverableChecklist.map((item) => (
                                    <label
                                        key={item.label}
                                        className='flex items-start gap-3'
                                    >
                                        <Checkbox
                                            defaultChecked={item.done}
                                            className='mt-1 border-border/60'
                                        />
                                        <span>
                                            <span className='font-semibold text-foreground'>
                                                {item.label}
                                            </span>
                                            <br />
                                            <span className='text-xs text-muted-foreground'>
                                                {item.helper}
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-2 lg:col-span-2'>
                            <Label htmlFor='notes'>Catatan internal</Label>
                            <Textarea
                                id='notes'
                                className='min-h-[120px] border-border/60'
                                defaultValue='Freelancer highlight akan live tanggal 18 Nov. Pastikan crew dokumentasi siap pukul 09:00.'
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-6 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                KPI & billing
                            </CardTitle>
                            <CardDescription>
                                Target performa dan catatan pembayaran.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='ctr'>Target CTR</Label>
                                    <Input
                                        id='ctr'
                                        defaultValue='3.5%'
                                        className='border-border/60'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='conversion'>
                                        Target booking
                                    </Label>
                                    <Input
                                        id='conversion'
                                        defaultValue='400 booking'
                                        className='border-border/60'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='cpm'>CPM / Ratecard</Label>
                                    <Input
                                        id='cpm'
                                        defaultValue='Rp 18.000'
                                        className='border-border/60'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='billing'>
                                        Skema pembayaran
                                    </Label>
                                    <Input
                                        id='billing'
                                        defaultValue='50% DP • 50% akhir periode'
                                        className='border-border/60'
                                    />
                                </div>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Reminder payout
                                </p>
                                <p>
                                    Pembayaran termin kedua dijadwalkan 5 Apr
                                    2025.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Dokumen & PIC
                            </CardTitle>
                            <CardDescription>
                                Informasi kontak partner beserta file penting.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Building className='h-4 w-4 text-primary' />
                                    PIC partner
                                </p>
                                <p>
                                    Sarah Prameswari •
                                    partnership@pomadealpha.com
                                </p>
                                <p>WhatsApp: +62 812-8800-111</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <FileText className='h-4 w-4 text-primary' />
                                    Dokumen pendukung
                                </p>
                                <p>IO #ALP-8891, NDA, Creative brief (PDF)</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Target className='h-4 w-4 text-primary' />
                                    Action items
                                </p>
                                <p>
                                    Upload final video highlight sebelum tanggal
                                    17 Nov pukul 14:00.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Lampiran & briefing
                        </CardTitle>
                        <CardDescription>
                            Catatan tambahan untuk tim internal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3 text-sm text-muted-foreground'>
                        <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                            <p className='font-semibold text-foreground'>
                                Meeting summary
                            </p>
                            <p>
                                Partner meminta slot push di jam 09:00 & 17:00,
                                mohon koordinasi dengan tim engineering.
                            </p>
                        </div>
                        <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                            <p className='font-semibold text-foreground'>
                                Checklist legal
                            </p>
                            <p>
                                Pastikan NDA terbaru sudah ditandatangani
                                sebelum share data pengguna.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-wrap gap-3 border-t border-border/40 bg-muted/5 px-6 py-4'>
                        <Button
                            asChild
                            variant='outline'
                            className='border-border/60 gap-2'
                        >
                            <Link
                                href={`/admin/iklan/${id}`}
                                className='inline-flex items-center gap-2'
                            >
                                <ArrowLeft className='h-4 w-4' />
                                Batal
                            </Link>
                        </Button>
                        <Button className='gap-2'>
                            <CheckSquare className='h-4 w-4' />
                            Simpan perubahan
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </PageShell>
    );
}
