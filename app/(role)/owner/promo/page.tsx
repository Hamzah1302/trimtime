"use client";

import {
    Gift,
    Loader2,
    Percent,
    PlusCircle,
    Sparkles,
    Star,
    Users,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const promos = [
    {
        name: "Payday Fade 20%",
        channel: "App user",
        period: "25-30",
        target: "Semua pelanggan",
        status: "Aktif",
    },
    {
        name: "Birthday Treat + Steam",
        channel: "Push notif",
        period: "Auto bulan ulang tahun",
        target: "Member Gold",
        status: "Terjadwal",
    },
    {
        name: "Refer a friend 40k",
        channel: "Referral code",
        period: "Sampai 31 Mar",
        target: "Member baru",
        status: "Aktif",
    },
] as const;

const loyaltyStats = [
    { label: "Member aktif", value: "8.420 user", helper: "Naik 6% MoM" },
    { label: "Poin ditukarkan", value: "1.430 voucher", helper: "Total Rp 74 jt" },
    { label: "Promo berjalan", value: "6 campaign", helper: "3 auto, 3 manual" },
] as const;

export default function OwnerPromoPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Gift className='h-4 w-4' />
                                Promo & Loyalitas
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Bangun loyalitas pelanggan</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Buat promo layanan, atur poin, dan publikasikan otomatis ke aplikasi user.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <PlusCircle className='h-4 w-4' />
                                Campaign baru
                            </Button>
                            <Button variant='outline' className='border-border/60 gap-2'>
                                <Loader2 className='h-4 w-4 animate-spin text-primary' />
                                Sinkron ke user app
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {loyaltyStats.map((stat) => (
                        <Card key={stat.label} className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>{stat.label}</CardDescription>
                                <CardTitle className='text-2xl font-bold'>{stat.value}</CardTitle>
                                <p className='text-xs text-muted-foreground'>{stat.helper}</p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue='promo' className='space-y-4'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='promo'>Promo layanan</TabsTrigger>
                        <TabsTrigger value='loyalty'>Poin & referral</TabsTrigger>
                    </TabsList>
                    <TabsContent value='promo' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Daftar promo live</CardTitle>
                                <CardDescription>Promo tampil otomatis di halaman user.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                {promos.map((promo) => (
                                    <div key={promo.name} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                        <div className='flex flex-wrap items-center justify-between gap-3'>
                                            <div>
                                                <p className='text-base font-semibold text-foreground'>{promo.name}</p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {promo.channel} • {promo.period}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>Target: {promo.target}</p>
                                            </div>
                                            <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
                                                {promo.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Buat promo baru</CardTitle>
                                <CardDescription>Atur nominal diskon, cabang, dan syarat otomatis.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='promo-title'>Judul promo</Label>
                                        <Input id='promo-title' placeholder='Payday Fade 20%' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='promo-type'>Tipe diskon</Label>
                                        <Input id='promo-type' placeholder='Diskon persentase' />
                                    </div>
                                </div>
                                <div className='grid gap-4 sm:grid-cols-3'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='promo-value'>Nilai diskon</Label>
                                        <Input id='promo-value' placeholder='20%' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='promo-min'>Min transaksi</Label>
                                        <Input id='promo-min' placeholder='Rp 150.000' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='promo-quota'>Kuota</Label>
                                        <Input id='promo-quota' placeholder='500 klaim' />
                                    </div>
                                </div>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <Label>Periode</Label>
                                        <Input type='date' defaultValue='2025-02-10' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label>Selesai</Label>
                                        <Input type='date' defaultValue='2025-02-28' />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='promo-desc'>Detail promo</Label>
                                    <Textarea id='promo-desc' rows={3} placeholder='Masukkan syarat ketentuan' />
                                </div>
                                <div className='flex items-center justify-between rounded-xl border border-border/40 bg-muted/15 px-4 py-3'>
                                    <div className='space-y-1 text-sm text-muted-foreground'>
                                        <p className='font-semibold text-foreground'>Publish ke app user</p>
                                        <p>Promo akan tampil di tab Promo + dikirim push notif</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Button className='w-full gap-2'>
                                    <Percent className='h-4 w-4' />
                                    Simpan & publikasikan
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='loyalty' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Poin pelanggan</CardTitle>
                                <CardDescription>Atur konversi poin, bonus ulang tahun, dan redeem store.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4 sm:grid-cols-3'>
                                    {[
                                        { label: "1 poin = ", value: "Rp 1.000" },
                                        { label: "Bonus ulang tahun", value: "+50 poin" },
                                        { label: "Masa berlaku poin", value: "180 hari" },
                                    ].map((item) => (
                                        <div key={item.label} className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                            <p className='text-xs uppercase tracking-widest'>{item.label}</p>
                                            <p className='text-lg font-bold text-foreground'>{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant='outline' className='w-full border-border/60 gap-2'>
                                    <Sparkles className='h-4 w-4' />
                                    Sinkronkan ke mini store
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Referal & loyalitas</CardTitle>
                                <CardDescription>Berikan hadiah untuk pelanggan yang mengajak teman.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4 text-sm text-muted-foreground'>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>Referensi</p>
                                    <p className='text-lg font-bold text-foreground'>Keduanya dapat Rp 40.000</p>
                                    <p>Otomatis masuk ke dompet TrimTime user</p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>Loyal tier</p>
                                    <p className='text-lg font-bold text-foreground'>Silver • Gold • Platinum</p>
                                    <p>Benefit: prioritas booking, home service gratis, bonus poin</p>
                                </div>
                                <Button className='w-full gap-2'>
                                    <Users className='h-4 w-4' />
                                    Atur benefit tier
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </PageShell>
    );
}
