"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
    BadgeCheck,
    Building2,
    Clock4,
    Mail,
    MapPin,
    MessageCircle,
    PhoneCall,
    Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.18,
        },
    },
};

export default function ContactPage() {
    return (
        <div className='relative min-h-screen bg-background text-foreground'>
            <motion.header
                className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <motion.div
                    className='relative mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 lg:px-8 lg:py-20'
                    initial='hidden'
                    animate='visible'
                    variants={staggerContainer}
                >
                    <motion.div className='space-y-4 text-center lg:text-left' variants={fadeUp}>
                        <Badge className='mx-auto w-fit border border-primary/20 bg-primary/10 text-xs font-semibold uppercase tracking-widest text-primary lg:mx-0'>
                            Hubungi TrimTime
                        </Badge>
                        <motion.h1 className='text-3xl font-semibold sm:text-4xl lg:text-5xl' variants={fadeUp}>
                            Tim kami siap bantu kembangkan barbershop Anda
                        </motion.h1>
                        <motion.p className='mx-auto max-w-2xl text-sm text-muted-foreground lg:mx-0 lg:text-base' variants={fadeUp}>
                            Diskusikan kebutuhan operasional, demo produk, atau kolaborasi marketing. Kami biasanya merespons dalam 1×24 jam kerja.
                        </motion.p>
                    </motion.div>
                    <motion.div className='grid gap-6 sm:grid-cols-2' variants={staggerContainer}>
                        {[
                            {
                                icon: BadgeCheck,
                                title: "Request demo personal",
                                description: "Lihat bagaimana TrimTime mengautomasi booking, komisi, dan promo cabang Anda.",
                                href: "/owner/premium",
                            },
                            {
                                icon: MessageCircle,
                                title: "Jadwalkan konsultasi",
                                description: "Tim success akan bantu memilih paket terbaik dan roadmap implementasi 30 hari.",
                                href: "/owner/cabang",
                            },
                        ].map(({ icon: Icon, title, description, href }) => (
                            <motion.div key={title} variants={fadeUp}>
                                <Link
                                    href={href}
                                    className='group flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-background/90 p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5'
                                >
                                    <div className='space-y-2'>
                                        <div className='inline-flex items-center gap-2 text-sm font-semibold text-foreground'>
                                            <Icon className='h-4 w-4 text-primary' />
                                            {title}
                                        </div>
                                        <p className='text-sm text-muted-foreground'>{description}</p>
                                    </div>
                                    <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground transition group-hover:text-primary'>Pelajari</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.header>

            <main className='mx-auto flex max-w-6xl flex-col gap-16 px-5 py-16 lg:px-8 lg:py-24'>
                <motion.section
                    className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <motion.div className='space-y-6' variants={fadeUp}>
                        <Card className='border-border/60 bg-card/90 shadow-lg backdrop-blur'>
                            <CardHeader className='space-y-3'>
                                <CardTitle className='text-xl font-semibold'>Kantor TrimTime Indonesia</CardTitle>
                                <p className='text-sm text-muted-foreground'>Silakan buat janji sebelum berkunjung agar tim kami siap menyambut.</p>
                            </CardHeader>
                            <CardContent className='space-y-5 text-sm text-muted-foreground'>
                                <div className='flex items-start gap-3'>
                                    <MapPin className='mt-1 h-4 w-4 text-primary' />
                                    <div>
                                        <p className='font-semibold text-foreground'>District 8, SCBD</p>
                                        <p>Jl. Senopati Raya No. 8, Jakarta Selatan 12190</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Clock4 className='mt-1 h-4 w-4 text-primary' />
                                    <div>
                                        <p className='font-semibold text-foreground'>Jam operasional kantor</p>
                                        <p>Senin–Jumat 09.00–18.00 WIB</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Building2 className='mt-1 h-4 w-4 text-primary' />
                                    <div>
                                        <p className='font-semibold text-foreground'>Demo onsite</p>
                                        <p>Demo platform & training frontliner tersedia dengan jadwal yang disesuaikan.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className='border-border/60 bg-card/90 shadow-sm backdrop-blur'>
                            <CardHeader className='space-y-3'>
                                <CardTitle className='text-xl font-semibold'>Channel komunikasi</CardTitle>
                                <p className='text-sm text-muted-foreground'>Pilih cara yang paling nyaman bagi Anda untuk menghubungi kami.</p>
                            </CardHeader>
                            <CardContent className='grid gap-4 text-sm text-muted-foreground'>
                                <div className='flex items-start gap-3 rounded-2xl border border-border/40 bg-background p-4'>
                                    <PhoneCall className='mt-1 h-4 w-4 text-primary' />
                                    <div>
                                        <p className='font-semibold text-foreground'>Telepon & WhatsApp</p>
                                        <p>+62 821-0000-7777 (Senin–Jumat 09.00–18.00)</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3 rounded-2xl border border-border/40 bg-background p-4'>
                                    <Mail className='mt-1 h-4 w-4 text-primary' />
                                    <div>
                                        <p className='font-semibold text-foreground'>Email support</p>
                                        <p>support@trimtime.id • SLA 1×24 jam kerja</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3 rounded-2xl border border-border/40 bg-background p-4'>
                                    <Sparkles className='mt-1 h-4 w-4 text-primary' />
                                    <div>
                                        <p className='font-semibold text-foreground'>Program partner & sponsorship</p>
                                        <p>partnership@trimtime.id untuk kerjasama produk atau event komunitas.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <Card className='border-border/60 bg-card/90 shadow-lg backdrop-blur'>
                            <CardHeader className='space-y-2 text-center lg:text-left'>
                                <CardTitle className='text-xl font-semibold'>Kirim pesan langsung</CardTitle>
                                <p className='text-sm text-muted-foreground'>Isi formulir berikut dan kami akan menghubungi Anda segera.</p>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-foreground'>Nama lengkap</label>
                                        <Input placeholder='Rizky Pratama' />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-foreground'>Email bisnis</label>
                                        <Input placeholder='rizky@trimtime.id' type='email' />
                                    </div>
                                </div>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-foreground'>Nomor kontak</label>
                                        <Input placeholder='+62 821-0000-1111' />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-foreground'>Jenis kebutuhan</label>
                                        <Input placeholder='Demo platform / Implementasi / Konsultasi' />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium text-foreground'>Pesan</label>
                                    <Textarea placeholder='Ceritakan cabang Anda dan kebutuhan spesifik yang ingin dibahas…' rows={5} />
                                </div>
                                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                                    <p className='text-xs text-muted-foreground'>Dengan mengirim formulir ini, Anda setuju dengan kebijakan privasi TrimTime.</p>
                                    <Button className='w-full sm:w-auto'>Kirim pesan</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.section>

                <motion.section
                    className='grid gap-6 rounded-3xl border border-border/50 bg-linear-to-br from-primary/10 via-primary/5 to-background p-6 text-center shadow-md sm:grid-cols-3 sm:text-left'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {[
                        {
                            title: "Owner onboarding",
                            copy: "Tim sukses membantu aktivasi dashboard, training barber, dan integrasi mini store dalam 30 hari.",
                        },
                        {
                            title: "Support pelanggan",
                            copy: "Customer support kami sigap menjawab chat dan mengelola tiket pengguna setiap hari.",
                        },
                        {
                            title: "Ekosistem partner",
                            copy: "Kemitraan dengan brand grooming, finansial, hingga event komunitas untuk mendorong pertumbuhan pangsa pasar Anda.",
                        },
                    ].map(({ title, copy }) => (
                        <motion.div key={title} className='space-y-2' variants={fadeUp}>
                            <p className='text-xs font-semibold uppercase tracking-widest text-primary'>{title}</p>
                            <p className='text-sm text-muted-foreground'>{copy}</p>
                        </motion.div>
                    ))}
                </motion.section>
            </main>
        </div>
    );
}
