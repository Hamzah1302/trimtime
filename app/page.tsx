"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
    ArrowRight,
    CalendarCheck,
    Crown,
    HeartHandshake,
    LayoutDashboard,
    LineChart,
    Scissors,
    ShieldCheck,
    Sparkles,
    Star,
    Store,
    UserRound,
    Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const featureHighlights = [
    {
        icon: Scissors,
        title: "Smart scheduling",
        description: "Kelola antrian walk-in & booking online dalam satu dashboard real-time.",
    },
    {
        icon: Users,
        title: "Customer loyalty",
        description: "Program poin otomatis dengan reminder WhatsApp tanpa biaya tambahan.",
    },
    {
        icon: Store,
        title: "Mini store",
        description: "Jual produk grooming resmi, sinkron stok antar cabang secara otomatis.",
    },
];

const heroStats = [
    {
        icon: LayoutDashboard,
        label: "Cabang aktif",
        value: "120+",
    },
    {
        icon: LineChart,
        label: "Growth omzet",
        value: "35%",
    },
    {
        icon: HeartHandshake,
        label: "Retensi pelanggan",
        value: "92%",
    },
];

const ecosystemPillars = [
    {
        title: "Booking & Scheduling",
        description:
            "Kelola antrian walk-in, booking online, serta reminder otomatis untuk semua cabang.",
        icon: CalendarCheck,
    },
    {
        title: "Operasional & Komisi",
        description:
            "Pantau performa barber, atur shift, dan hitung komisi otomatis tanpa spreadsheet.",
        icon: LayoutDashboard,
    },
    {
        title: "Growth & Loyalty",
        description:
            "Promo bertarget, mini store, dan sistem poin yang langsung terhubung ke pelanggan.",
        icon: Store,
    },
];

const journeySteps = [
    {
        title: "Onboarding cepat",
        description:
            "Registrasi cabang & barber, impor layanan, dan verifikasi admin TrimTime dalam 24 jam.",
    },
    {
        title: "Optimasi harian",
        description:
            "Dashboard operasional menampilkan booking, status barber, stok produk, dan KPI real-time.",
    },
    {
        title: "Scale multi-cabang",
        description:
            "Insight performa, integrasi laporan keuangan, dan API premium untuk ekspansi cabang baru.",
    },
];

const rolesOverview = [
    {
        role: "User (Pelanggan)",
        icon: UserRound,
        focus: "Booking instan, bebas antre, dan fleksibel ke rumah.",
        highlights: [
            "Login mudah (Google, Email, WhatsApp OTP) & profil personal",
            "Cari barbershop terdekat dengan filter harga, rating, dan home service",
            "Booking realtime, bayar via QRIS/e-wallet, poin & promo otomatis",
        ],
    },
    {
        role: "Barber",
        icon: Scissors,
        focus: "Atur jadwal, status, dan pendapatan dalam satu panel.",
        highlights: [
            "Dashboard harian dengan status booking & toggle Aktif/Istirahat",
            "Smart Break 15–60 menit dan tracking home service dari Maps",
            "Laporan pendapatan mingguan, rating rata-rata, dan mode offline",
        ],
    },
    {
        role: "Owner",
        icon: Crown,
        focus: "Kelola cabang, barber, dan laporan bisnis end-to-end.",
        highlights: [
            "Registrasi cabang, jam operasional, layanan, dan harga terpusat",
            "Dashboard multi-cabang, komisi otomatis, ekspor laporan PDF/Excel",
            "Aktifkan promo, loyalti, mini store, serta monitoring review",
        ],
    },
    {
        role: "Admin TrimTime",
        icon: ShieldCheck,
        focus: "Menjaga ekosistem tetap aman, rapi, dan terukur.",
        highlights: [
            "Dashboard global user, booking, dan revenue lintas wilayah",
            "Verifikasi owner, kelola transaksi & refund, audit keamanan RBAC",
            "CMS promo, iklan partner premium, dan insight layanan populer",
        ],
    },
];

const testimonials = [
    {
        name: "TrimTime SCBD",
        quote: "Occupancy kursi naik ke 92% dalam 3 bulan karena reminder booking & katalog promosi terkurasi.",
    },
    {
        name: "TrimTime Menteng",
        quote: "Staff lebih fokus melayani pelanggan. Semua pembayaran & tips tercatat otomatis di dashboard owner.",
    },
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.16,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: "easeOut",
        },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function Home() {
    return (
        <div className='min-h-screen bg-background text-foreground'>
            <motion.header
                className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5'
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <motion.div
                    className='relative mx-auto flex max-w-6xl flex-col gap-12 px-5 py-16 lg:px-8 lg:py-24'
                    initial='hidden'
                    animate='visible'
                    variants={staggerContainer}
                >
                    <motion.nav
                        className='flex items-center justify-between text-sm text-muted-foreground'
                        variants={fadeIn}
                    >
                        <div className='flex items-center gap-2 font-semibold text-foreground'>
                            <Sparkles className='h-5 w-5 text-primary' />
                            TrimTime
                        </div>
                        <div className='hidden items-center gap-6 md:flex'>
                            <Link href='/login' className='transition-colors hover:text-primary'>Masuk</Link>
                            <Link href='/register' className='transition-colors hover:text-primary'>Daftar</Link>
                            <Button size='sm' asChild>
                                <Link href='/owner/dashboard'>Coba dashboard owner</Link>
                            </Button>
                        </div>
                    </motion.nav>

                    <motion.div
                        className='grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'
                        variants={staggerContainer}
                    >
                        <motion.div className='space-y-10' variants={fadeUp}>
                            <div className='space-y-4'>
                                <Badge variant='outline' className='border-primary/40 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary'>
                                    Super app untuk ekosistem barbershop
                                </Badge>
                                <motion.h1
                                    className='text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl'
                                    variants={fadeUp}
                                >
                                    Operasional rapi, pelanggan loyal, barber makin produktif
                                </motion.h1>
                                <motion.p className='text-lg text-muted-foreground' variants={fadeUp}>
                                    TrimTime menyederhanakan booking, operasional, serta growth marketing dalam satu platform terpadu—tanpa lagi pindah-pindah aplikasi.
                                </motion.p>
                            </div>
                            <motion.div className='flex flex-wrap gap-3' variants={fadeUp}>
                                <Button size='lg' className='gap-2' asChild>
                                    <Link href='/owner/cabang'>Mulai kelola cabang</Link>
                                </Button>
                                <Button size='lg' variant='outline' className='gap-2 border-border/60' asChild>
                                    <Link href='/owner/premium'>Lihat paket premium</Link>
                                </Button>
                            </motion.div>
                            <motion.div className='grid gap-4 sm:grid-cols-3' variants={staggerContainer}>
                                {heroStats.map(({ icon: Icon, label, value }) => (
                                    <motion.div
                                        key={label}
                                        className='rounded-2xl border border-border/50 bg-background/90 p-4 text-sm text-muted-foreground shadow-sm backdrop-blur'
                                        variants={scaleIn}
                                    >
                                        <div className='flex items-center gap-2 text-primary'>
                                            <Icon className='h-4 w-4' />
                                            <span className='text-xs font-semibold uppercase tracking-widest'>{label}</span>
                                        </div>
                                        <p className='mt-2 text-2xl font-semibold text-foreground'>{value}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                        <motion.div variants={scaleIn}>
                            <Card className='border-border/60 bg-card/85 shadow-xl backdrop-blur'>
                                <CardHeader className='space-y-3'>
                                    <CardTitle className='text-xl font-semibold'>Kenapa owner mempercayai TrimTime?</CardTitle>
                                    <CardDescription>
                                        Kami bantu merapikan alur booking hingga laporan keuangan, dengan insight yang mudah dibaca kapan pun dibutuhkan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='grid gap-4'>
                                    {featureHighlights.map((item) => (
                                        <motion.div
                                            key={item.title}
                                            className='flex gap-3 rounded-xl border border-border/40 bg-muted/10 p-4'
                                            variants={fadeUp}
                                        >
                                            <item.icon className='mt-1 h-5 w-5 text-primary' />
                                            <div>
                                                <p className='font-semibold text-foreground'>{item.title}</p>
                                                <p className='text-sm text-muted-foreground'>{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.header>

            <main className='mx-auto flex max-w-6xl flex-col gap-20 px-5 py-16 lg:px-8 lg:py-24'>
                <motion.section
                    className='space-y-10'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <motion.div className='space-y-4 text-center' variants={fadeUp}>
                        <Badge variant='outline' className='border-border/60 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                            Arsitektur TrimTime
                        </Badge>
                        <motion.h2 className='text-3xl font-bold sm:text-4xl' variants={fadeUp}>
                            Semua pilar operasional disatukan
                        </motion.h2>
                        <motion.p className='mx-auto max-w-2xl text-base text-muted-foreground' variants={fadeUp}>
                            Automasi booking, koordinasi barber, hingga loyalty campaign—dengan insight real-time untuk setiap cabang dan peran.
                        </motion.p>
                    </motion.div>
                    <motion.div className='grid gap-6 md:grid-cols-3' variants={staggerContainer}>
                        {ecosystemPillars.map(({ title, description, icon: Icon }) => (
                            <motion.div key={title} variants={scaleIn}>
                                <Card className='h-full border-border/60 bg-card/90 shadow-sm backdrop-blur'>
                                    <CardHeader className='space-y-3'>
                                        <div className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary'>
                                            <Icon className='h-4 w-4' />
                                            {title}
                                        </div>
                                        <CardDescription className='text-sm text-muted-foreground'>{description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section
                    className='space-y-12'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <motion.div className='space-y-4 text-center' variants={fadeUp}>
                        <Badge variant='outline' className='border-border/60 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                            Dirancang untuk semua peran
                        </Badge>
                        <motion.h2 className='text-3xl font-bold sm:text-4xl' variants={fadeUp}>
                            Satu platform, empat pengalaman unggul
                        </motion.h2>
                        <motion.p className='mx-auto max-w-3xl text-base text-muted-foreground' variants={fadeUp}>
                            TrimTime menyatukan pelanggan, barber, owner, dan tim admin dalam alur kerja yang saling terhubung—dari booking pertama sampai laporan keuangan.
                        </motion.p>
                    </motion.div>
                    <motion.div className='grid gap-6 md:grid-cols-2' variants={staggerContainer}>
                        {rolesOverview.map(({ role, icon: Icon, focus, highlights }) => (
                            <motion.div key={role} variants={scaleIn}>
                                <Card className='h-full border-border/60 bg-card/85 backdrop-blur'>
                                    <CardHeader className='space-y-3'>
                                        <div className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary'>
                                            <Icon className='h-4 w-4' />
                                            {role}
                                        </div>
                                        <CardTitle className='text-lg font-semibold text-foreground'>{focus}</CardTitle>
                                    </CardHeader>
                                    <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                        <ul className='space-y-2'>
                                            {highlights.map((item) => (
                                                <li key={item} className='flex items-start gap-2'>
                                                    <span className='mt-1 h-1.5 w-1.5 rounded-full bg-primary' />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div className='grid gap-3 rounded-3xl border border-border/50 bg-muted/10 p-6 text-left md:grid-cols-3' variants={staggerContainer}>
                        {journeySteps.map(({ title, description }) => (
                            <motion.div key={title} className='space-y-2' variants={fadeUp}>
                                <p className='text-xs font-semibold uppercase tracking-widest text-primary'>
                                    {title}
                                </p>
                                <p className='text-sm text-muted-foreground'>{description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section
                    className='grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <motion.div className='space-y-5' variants={fadeUp}>
                        <Badge variant='outline' className='border-amber-400/50 bg-amber-50 text-xs font-semibold uppercase tracking-widest text-amber-600'>
                            Cerita sukses
                        </Badge>
                        <motion.h2 className='text-3xl font-bold sm:text-4xl' variants={fadeUp}>
                            Dipercaya jaringan barbershop premium
                        </motion.h2>
                        <motion.p className='text-base text-muted-foreground' variants={fadeUp}>
                            TrimTime tumbuh bersama brand lokal hingga scale-up nasional. Kami bantu adaptasi SOP digital dan training frontliner dalam waktu singkat.
                        </motion.p>
                        <motion.div className='grid gap-4' variants={staggerContainer}>
                            {testimonials.map((testimonial) => (
                                <motion.div key={testimonial.name} variants={scaleIn}>
                                    <Card className='border-border/60 bg-muted/10'>
                                        <CardContent className='space-y-3 p-5'>
                                            <div className='flex items-center gap-2 text-sm font-semibold text-primary'>
                                                <Star className='h-4 w-4' />
                                                {testimonial.name}
                                            </div>
                                            <p className='text-sm text-muted-foreground'>{testimonial.quote}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div variants={scaleIn}>
                        <Card className='border-border/60 shadow-lg'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Blueprint implementasi 30 hari</CardTitle>
                                <CardDescription>
                                    Tim TrimTime akan mendampingi Anda step-by-step agar cabang berjalan optimal sejak hari pertama.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4 text-sm text-muted-foreground'>
                                <div className='rounded-lg border border-border/50 bg-background/90 p-4'>
                                    <p className='font-semibold text-foreground'>Minggu 1 • Kick-off digital</p>
                                    <p>Audit operasional, migrasi data cabang, setup akun owner & barber.</p>
                                </div>
                                <div className='rounded-lg border border-border/50 bg-background/90 p-4'>
                                    <p className='font-semibold text-foreground'>Minggu 2 • Aktivasi cabang</p>
                                    <p>Training staff, penjadwalan otomatis, dan integrasi mini store.</p>
                                </div>
                                <div className='rounded-lg border border-border/50 bg-background/90 p-4'>
                                    <p className='font-semibold text-foreground'>Minggu 3 • Growth playbook</p>
                                    <p>Optimasi loyalitas, automasi kampanye, dan insight performa.</p>
                                </div>
                                <div className='rounded-lg border border-border/50 bg-background/90 p-4'>
                                    <p className='font-semibold text-foreground'>Minggu 4 • Scale</p>
                                    <p>Review KPI, support ekspansi cabang baru, dan rencana monetisasi.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.section>

                <motion.section
                    className='overflow-hidden rounded-3xl border border-primary/40 bg-linear-to-br from-primary/10 via-primary/5 to-background p-8 sm:p-12'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={scaleIn}
                >
                    <motion.div
                        className='grid gap-6 text-center md:grid-cols-[1.2fr_0.8fr] md:items-center md:text-left'
                        variants={staggerContainer}
                    >
                        <motion.div className='space-y-3' variants={fadeUp}>
                            <Badge variant='outline' className='border-primary/40 bg-primary/10 text-primary'>Grow faster with TrimTime</Badge>
                            <motion.h2 className='text-3xl font-bold text-primary sm:text-4xl' variants={fadeUp}>
                                Siap tingkatkan omzet barbershop Anda?
                            </motion.h2>
                            <motion.p className='max-w-xl text-base text-primary/80' variants={fadeUp}>
                                Jadwalkan demo personal bersama tim TrimTime dan temukan bagaimana ekosistem kami bisa mengakselerasi pertumbuhan bisnis grooming Anda.
                            </motion.p>
                        </motion.div>
                        <motion.div className='flex flex-col gap-3 sm:flex-row sm:justify-end' variants={fadeUp}>
                            <Button size='lg' className='gap-2 bg-primary text-primary-foreground hover:bg-primary/90' asChild>
                                <Link href='/contact'>Request demo <ArrowRight className='h-4 w-4' /></Link>
                            </Button>
                            <Button size='lg' variant='outline' className='gap-2 border-primary/40 text-primary hover:bg-primary/10' asChild>
                                <Link href='/owner/premium'>Lihat paket premium</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </main>

            <footer className='border-t border-border/60 bg-background/90'>
                <div className='mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground lg:px-8'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div className='inline-flex items-center gap-2 font-semibold text-foreground'>
                            <Sparkles className='h-5 w-5 text-primary' /> TrimTime
                        </div>
                        <div className='flex flex-wrap items-center gap-4'>
                            <Link href='/about' className='hover:text-primary'>Tentang kami</Link>
                            <Link href='/owner/premium' className='hover:text-primary'>Paket & harga</Link>
                            <Link href='/contact' className='hover:text-primary'>Hubungi sales</Link>
                            <Link href='/privacy' className='hover:text-primary'>Kebijakan privasi</Link>
                        </div>
                    </div>
                    <p>&copy; {new Date().getFullYear()} TrimTime. Semua hak cipta dilindungi.</p>
                </div>
            </footer>
        </div>
    );
}
