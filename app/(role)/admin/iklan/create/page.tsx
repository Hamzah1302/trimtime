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
    FileText,
    Megaphone,
    Target,
} from "lucide-react";

const slotOptions = [
    "Homepage Hero",
    "Freelancer highlight",
    "Marketplace banner",
    "Push notification",
    "Mini store module",
] as const;

const onboardingSteps = [
    {
        label: "Tandatangani IO",
        helper: "Upload dokumen purchase order",
    },
    {
        label: "Upload creative",
        helper: "Hero banner + copy push notif",
    },
    {
        label: "Review legal",
        helper: "NDA & data sharing agreement",
    },
] as const;

type AdminIklanCreatePageProps = {
    searchParams?: Record<string, string | undefined>;
};

export default function AdminIklanCreatePage({
    searchParams,
}: AdminIklanCreatePageProps) {
    const prefilledSlot = searchParams?.slot ?? "Homepage Hero";

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Megaphone className='h-4 w-4' />
                                Tambah Sponsor Baru
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    Booking slot iklan TrimTime
                                </h1>
                                <p className='text-sm text-muted-foreground lg:text-base'>
                                    Catat detail brand, nilai kerjasama, dan
                                    channel aktivasi dalam satu formulir.
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
                                    href='/admin/iklan'
                                    className='inline-flex items-center gap-2'
                                >
                                    <ArrowLeft className='h-4 w-4' />
                                    Kembali ke daftar slot
                                </Link>
                            </Button>
                            <Button className='gap-2'>
                                <CalendarClock className='h-4 w-4' />
                                Jadwalkan kickoff
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-10'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Data brand & kontak
                        </CardTitle>
                        <CardDescription>
                            Informasi dasar partner serta PIC penanggung jawab.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='partner-name'>Nama partner</Label>
                            <Input
                                id='partner-name'
                                placeholder='Brand Grooming XYZ'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='category'>Kategori produk</Label>
                            <Input
                                id='category'
                                placeholder='Grooming / Bank / Lifestyle'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='pic'>PIC partner</Label>
                            <Input
                                id='pic'
                                placeholder='Nama lengkap + jabatan'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='contact'>Kontak utama</Label>
                            <Input
                                id='contact'
                                placeholder='Email / WhatsApp'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='investment'>Nilai investasi</Label>
                            <Input
                                id='investment'
                                placeholder='Contoh: Rp 150.000.000'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='coverage'>Coverage kampanye</Label>
                            <Input
                                id='coverage'
                                placeholder='Nasional / Regional'
                                className='border-border/60'
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Slot & deliverables
                        </CardTitle>
                        <CardDescription>
                            Pilih channel iklan dan asset yang akan disiapkan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 lg:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label>Slot iklan</Label>
                            <div className='grid gap-2 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm'>
                                {slotOptions.map((slot) => (
                                    <label
                                        key={slot}
                                        className='flex items-center gap-3'
                                    >
                                        <Checkbox
                                            defaultChecked={
                                                slot === prefilledSlot
                                            }
                                            className='border-border/60'
                                        />
                                        <span>{slot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='deliverables'>
                                Deliverables utama
                            </Label>
                            <Textarea
                                id='deliverables'
                                className='min-h-[120px] border-border/60'
                                placeholder='Contoh: Hero banner, push notif, bundling marketplace'
                            />
                        </div>
                        <div className='space-y-2 lg:col-span-2'>
                            <Label>Checklist onboarding</Label>
                            <div className='grid gap-3 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm'>
                                {onboardingSteps.map((step) => (
                                    <label
                                        key={step.label}
                                        className='flex items-start gap-3'
                                    >
                                        <Checkbox className='mt-1 border-border/60' />
                                        <span>
                                            <span className='font-semibold text-foreground'>
                                                {step.label}
                                            </span>
                                            <br />
                                            <span className='text-xs text-muted-foreground'>
                                                {step.helper}
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-6 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Timeline & KPI
                            </CardTitle>
                            <CardDescription>
                                Periode tayang beserta target performa.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label>Mulai</Label>
                                    <Input
                                        type='date'
                                        className='border-border/60'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label>Selesai</Label>
                                    <Input
                                        type='date'
                                        className='border-border/60'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='ctr'>Target CTR</Label>
                                    <Input
                                        id='ctr'
                                        placeholder='Contoh: 3.5%'
                                        className='border-border/60'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='booking'>
                                        Target booking
                                    </Label>
                                    <Input
                                        id='booking'
                                        placeholder='Contoh: 350 booking'
                                        className='border-border/60'
                                    />
                                </div>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Catatan KPI
                                </p>
                                <p>
                                    Opsional: tambahkan insentif extra jika CTR
                                    &lt; 3%.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Dokumen & SLA
                            </CardTitle>
                            <CardDescription>
                                Upload bukti kerjasama dan catatan hukum.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Building className='h-4 w-4 text-primary' />
                                    PIC TrimTime
                                </p>
                                <p>
                                    Masukkan nama ops lead TrimTime yang
                                    bertanggung jawab.
                                </p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <FileText className='h-4 w-4 text-primary' />
                                    Dokumen pendukung
                                </p>
                                <p>
                                    IO, NDA, creative brief, invoice, atau bukti
                                    pembayaran.
                                </p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/10 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Target className='h-4 w-4 text-primary' />
                                    Action items
                                </p>
                                <p>
                                    Tulis langkah yang harus selesai sebelum
                                    kampanye live.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Catatan tambahan
                        </CardTitle>
                        <CardDescription>
                            Brief internal untuk tim kreatif / engineering.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            className='min-h-[140px] border-border/60'
                            placeholder='Ringkasan meeting, dependency, SLA response support, dsb.'
                        />
                    </CardContent>
                    <CardFooter className='flex flex-wrap gap-3 border-t border-border/40 bg-muted/5 px-6 py-4'>
                        <Button
                            asChild
                            variant='outline'
                            className='border-border/60 gap-2'
                        >
                            <Link
                                href='/admin/iklan'
                                className='inline-flex items-center gap-2'
                            >
                                <ArrowLeft className='h-4 w-4' />
                                Batalkan
                            </Link>
                        </Button>
                        <Button className='gap-2'>
                            <Megaphone className='h-4 w-4' />
                            Simpan sponsor baru
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </PageShell>
    );
}
