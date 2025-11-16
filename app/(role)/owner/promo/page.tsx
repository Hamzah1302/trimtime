"use client";

import Link from "next/link";

import { Gift, Loader2, PlusCircle, Sparkles, Star, Users } from "lucide-react";

import { ownerLoyaltyStats, ownerPromos } from "./_data/mock-promos";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OwnerPromoPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Gift className='h-4 w-4' />
                                Promo & Loyalitas
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Bangun loyalitas pelanggan
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Buat promo layanan, atur poin, dan publikasikan
                                otomatis ke aplikasi user.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2' asChild>
                                <Link href='/owner/promo/create'>
                                    <PlusCircle className='h-4 w-4' />
                                    Campaign baru
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Loader2 className='h-4 w-4 animate-spin text-primary' />
                                Sinkron ke user app
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {ownerLoyaltyStats.map((stat) => (
                        <Card
                            key={stat.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>
                                    {stat.label}
                                </CardDescription>
                                <CardTitle className='text-2xl font-bold'>
                                    {stat.value}
                                </CardTitle>
                                <p className='text-xs text-muted-foreground'>
                                    {stat.helper}
                                </p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue='promo' className='space-y-4'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='promo'>Promo layanan</TabsTrigger>
                        <TabsTrigger value='loyalty'>
                            Poin & referral
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='promo' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>
                                    Daftar promo live
                                </CardTitle>
                                <CardDescription>
                                    Promo tampil otomatis di halaman user.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                {ownerPromos.map((promo) => (
                                    <div
                                        key={promo.slug}
                                        className='rounded-xl border border-border/40 bg-muted/15 p-4'
                                    >
                                        <div className='flex flex-wrap items-center justify-between gap-3'>
                                            <div className='space-y-1'>
                                                <p className='text-base font-semibold text-foreground'>
                                                    {promo.name}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {promo.channel} •{" "}
                                                    {promo.period.label}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    Target: {promo.target}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/40 text-[10px] uppercase tracking-widest'
                                                >
                                                    {promo.status}
                                                </Badge>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='gap-1 text-xs font-semibold text-primary'
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/owner/promo/${promo.slug}`}
                                                    >
                                                        Detail
                                                        <Star className='h-3.5 w-3.5' />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3'>
                                            <div className='rounded-lg border border-border/30 bg-background/60 px-3 py-2'>
                                                <p className='font-semibold text-foreground'>
                                                    Min transaksi
                                                </p>
                                                <p>{promo.minTransaction}</p>
                                            </div>
                                            <div className='rounded-lg border border-border/30 bg-background/60 px-3 py-2'>
                                                <p className='font-semibold text-foreground'>
                                                    Kuota
                                                </p>
                                                <p>{promo.quota}</p>
                                            </div>
                                            <div className='rounded-lg border border-border/30 bg-background/60 px-3 py-2'>
                                                <p className='font-semibold text-foreground'>
                                                    Cabang aktif
                                                </p>
                                                <p>
                                                    {
                                                        promo.branchCoverage
                                                            .length
                                                    }{" "}
                                                    cabang
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>
                                    Mulai campaign baru
                                </CardTitle>
                                <CardDescription>
                                    Gunakan template siap pakai untuk membuat
                                    promo marketplace.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4 text-sm text-muted-foreground'>
                                <p>
                                    Isi detail lengkap promo, pilih segmen
                                    pelanggan, dan atur distribusi cabang pada
                                    form khusus. Sistem akan membantu publikasi
                                    ke aplikasi user dan dashboard barber.
                                </p>
                                <div className='grid gap-3 sm:grid-cols-2'>
                                    <div className='rounded-xl border border-border/40 bg-muted/15 p-3'>
                                        <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                            Email template
                                        </p>
                                        <p className='font-semibold text-foreground'>
                                            A/B testing copy promo
                                        </p>
                                    </div>
                                    <div className='rounded-xl border border-border/40 bg-muted/15 p-3'>
                                        <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                            Segmentasi
                                        </p>
                                        <p className='font-semibold text-foreground'>
                                            Filter member marketplace
                                        </p>
                                    </div>
                                </div>
                                <Button className='w-full gap-2' asChild>
                                    <Link href='/owner/promo/create'>
                                        <Sparkles className='h-4 w-4' />
                                        Buka form create promo
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='loyalty' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>
                                    Poin pelanggan
                                </CardTitle>
                                <CardDescription>
                                    Atur konversi poin, bonus ulang tahun, dan
                                    redeem store.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4 sm:grid-cols-3'>
                                    {[
                                        {
                                            label: "1 poin = ",
                                            value: "Rp 1.000",
                                        },
                                        {
                                            label: "Bonus ulang tahun",
                                            value: "+50 poin",
                                        },
                                        {
                                            label: "Masa berlaku poin",
                                            value: "180 hari",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'
                                        >
                                            <p className='text-xs uppercase tracking-widest'>
                                                {item.label}
                                            </p>
                                            <p className='text-lg font-bold text-foreground'>
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    variant='outline'
                                    className='w-full border-border/60 gap-2'
                                >
                                    <Sparkles className='h-4 w-4' />
                                    Sinkronkan ke mini store
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>
                                    Referal & loyalitas
                                </CardTitle>
                                <CardDescription>
                                    Berikan hadiah untuk pelanggan yang mengajak
                                    teman.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4 text-sm text-muted-foreground'>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                        Referensi
                                    </p>
                                    <p className='text-lg font-bold text-foreground'>
                                        Keduanya dapat Rp 40.000
                                    </p>
                                    <p>
                                        Otomatis masuk ke dompet TrimTime user
                                    </p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                        Loyal tier
                                    </p>
                                    <p className='text-lg font-bold text-foreground'>
                                        Silver • Gold • Platinum
                                    </p>
                                    <p>
                                        Benefit: prioritas booking, home service
                                        gratis, bonus poin
                                    </p>
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
