"use client";

import {
    Briefcase,
    Building,
    Coins,
    Megaphone,
    Sparkles,
    Target,
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
import { Textarea } from "@/components/ui/textarea";

const sponsorSlots = [
    {
        slot: "Homepage Hero",
        partner: "Pomade Alpha",
        period: "1-31 Mar",
        status: "Terbooking",
    },
    {
        slot: "Freelancer highlight",
        partner: "Bank BETA",
        period: "10-20 Feb",
        status: "Avail",
    },
] as const;

const premiumPerks = [
    {
        title: "Prioritas pencarian",
        description: "Barbershop Premium muncul paling atas di halaman pencarian user.",
    },
    {
        title: "Badge premium",
        description: "Menambah kepercayaan pelanggan + conversion rate booking.",
    },
] as const;

export default function AdminIklanPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Megaphone className='h-4 w-4' />
                                Iklan & Partner Premium
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Kelola slot sponsor & mitra produk</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pastikan inventory iklan terisi dan relevan dengan ekosistem TrimTime.
                            </p>
                        </div>
                        <Button>Hubungi tim partnership</Button>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Slot iklan</CardTitle>
                        <CardDescription>Status inventory sponsor.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        {sponsorSlots.map((slot) => (
                            <div key={slot.slot} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <div className='flex flex-wrap items-center justify-between'>
                                    <div>
                                        <p className='text-base font-semibold text-foreground'>{slot.slot}</p>
                                        <p className='text-xs text-muted-foreground'>
                                            Partner: {slot.partner || "Belum terisi"}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>Periode: {slot.period}</p>
                                    </div>
                                    <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
                                        {slot.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        <Button variant='outline' className='w-full border-border/60'>
                            Tambah slot baru
                        </Button>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Form kerjasama sponsor</CardTitle>
                            <CardDescription>Isi detail brand & paket iklan.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='partner-name'>Nama partner</Label>
                                <Input id='partner-name' placeholder='Brand Grooming XYZ' />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='partner-slot'>Slot iklan</Label>
                                <Input id='partner-slot' placeholder='Homepage hero / Marketplace / Push notif' />
                            </div>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label>Durasi mulai</Label>
                                    <Input type='date' />
                                </div>
                                <div className='space-y-2'>
                                    <Label>Selesai</Label>
                                    <Input type='date' />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='partner-notes'>Deskripsi kampanye</Label>
                                <Textarea id='partner-notes' rows={3} placeholder='Detail benefit, CTA, kode tracking' />
                            </div>
                            <Button className='w-full'>Kirim permintaan media kit</Button>
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>TrimTime Premium listing</CardTitle>
                            <CardDescription>Owner yang upgrade mendapat slot promosi tambahan.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            {premiumPerks.map((perk) => (
                                <div key={perk.title} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                    <p className='flex items-center gap-2 text-foreground font-semibold'>
                                        <Sparkles className='h-4 w-4 text-primary' />
                                        {perk.title}
                                    </p>
                                    <p>{perk.description}</p>
                                </div>
                            ))}
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Target className='h-4 w-4 text-primary' />
                                    Segmentasi iklan
                                </p>
                                <p>Owner bisa memilih lokasi & demografi target di portal Premium.</p>
                            </div>
                            <Button variant='outline' className='w-full border-border/60 gap-2'>
                                <Building className='h-4 w-4' />
                                Lihat daftar Premium aktif
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>ROI Iklan</CardTitle>
                        <CardDescription>Monitor performa sponsor.</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-3 text-sm text-muted-foreground'>
                        {[
                            { label: "CTR rata-rata", value: "3.4%" },
                            { label: "Biaya per booking", value: "Rp 12.000" },
                            { label: "Pendapatan sponsor", value: "Rp 180 jt" },
                        ].map((item) => (
                            <div key={item.label} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Coins className='h-4 w-4 text-primary' />
                                    {item.label}
                                </p>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
