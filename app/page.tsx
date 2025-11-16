"use client";
import Link from "next/link";
import {
    Scissors,
    Users,
    Store,
    Calendar,
    TrendingUp,
    Star,
    ArrowRight,
    Sparkles,
    Menu,
    X,
    CheckCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const features = [
    {
        icon: Calendar,
        title: "Smart Booking",
        description: "Kelola jadwal & antrian otomatis",
    },
    {
        icon: Users,
        title: "Loyalty Program",
        description: "Tingkatkan customer retention",
    },
    {
        icon: Store,
        title: "Mini Store",
        description: "Jual produk grooming terintegrasi",
    },
    {
        icon: TrendingUp,
        title: "Analytics",
        description: "Laporan bisnis real-time",
    },
];

const stats = [
    { value: "50+", label: "Barbershop Partner" },
    { value: "25%", label: "Average Growth" },
    { value: "85%", label: "Customer Retention" },
];

const testimonials = [
    {
        name: "Budi Santoso",
        role: "Owner Barbershop Kemang",
        content:
            "TrimTime benar-benar mengubah cara kami mengelola barbershop. Booking online naik 300% dan pelanggan jarang komplain antri lagi.",
        avatar: "BS",
    },
    {
        name: "Ahmad Rahman",
        role: "Owner The Gents Barbershop",
        content:
            "Fitur reminder WhatsApp otomatis sangat membantu. Customer jadi jarang no-show dan revenue bulanan naik 40%.",
        avatar: "AR",
    },
    {
        name: "Dika Pratama",
        role: "Owner Modern Cuts",
        content:
            "Dashboard analytics-nya detail banget. Sekarang bisa track performa setiap barber dan optimasi jadwal dengan data real.",
        avatar: "DP",
    },
];

const pricingPlans = [
    {
        name: "Starter",
        price: "299K",
        period: "/bulan",
        description: "Untuk barbershop kecil dengan 1-2 barber",
        features: [
            "Booking online unlimited",
            "Manajemen 2 barber",
            "Dashboard basic",
            "WhatsApp reminder",
            "Support email",
        ],
        popular: false,
    },
    {
        name: "Professional",
        price: "599K",
        period: "/bulan",
        description: "Untuk barbershop menengah dengan 3-5 barber",
        features: [
            "Semua fitur Starter",
            "Manajemen 5 barber",
            "Analytics advanced",
            "Mini store integration",
            "Loyalty program",
            "Support prioritas",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "999K",
        period: "/bulan",
        description: "Untuk barbershop besar atau multi-cabang",
        features: [
            "Semua fitur Professional",
            "Unlimited barber",
            "Multi-cabang support",
            "Custom branding",
            "API access",
            "Dedicated support",
        ],
        popular: false,
    },
];

const faqs = [
    {
        question: "Apakah TrimTime cocok untuk barbershop kecil?",
        answer: "Tentu saja! TrimTime dirancang untuk semua ukuran barbershop. Paket Starter kami sangat cocok untuk barbershop kecil dengan 1-2 barber.",
    },
    {
        question: "Bagaimana cara migrasi data dari sistem lama?",
        answer: "Tim support kami akan membantu proses migrasi data secara gratis. Kami akan memastikan semua data customer dan transaksi Anda aman terpindah.",
    },
    {
        question: "Apakah ada training untuk menggunakan TrimTime?",
        answer: "Ya, kami menyediakan training online gratis untuk semua pengguna. Interface TrimTime juga sangat intuitif sehingga mudah dipelajari.",
    },
    {
        question: "Bisakah TrimTime digunakan offline?",
        answer: "TrimTime memiliki mode offline terbatas untuk fungsi dasar. Namun untuk fitur lengkap seperti booking online dan analytics real-time, diperlukan koneksi internet.",
    },
    {
        question: "Bagaimana sistem pembayaran di TrimTime?",
        answer: "TrimTime terintegrasi dengan berbagai metode pembayaran seperti QRIS, e-wallet, dan transfer bank. Semua transaksi tercatat otomatis di sistem.",
    },
];

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    return (
        <div className='min-h-screen bg-linear-to-b from-white via-blue-50/40 to-white text-slate-900'>
            {/* Navigation */}
            <nav className='fixed top-0 left-0 right-0 z-50 border-b border-blue-100/60 bg-white/90 backdrop-blur-md'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='flex items-center justify-between py-4'>
                        <Link
                            href='/'
                            className='flex items-center gap-2 font-bold text-xl'
                        >
                            <Sparkles className='h-7 w-7 text-blue-600' />
                            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                TrimTime
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className='hidden md:flex items-center gap-8'>
                            <Link
                                href='/features'
                                className='text-slate-600 hover:text-blue-600 transition-colors'
                            >
                                Fitur
                            </Link>
                            <Link
                                href='/pricing'
                                className='text-slate-600 hover:text-blue-600 transition-colors'
                            >
                                Harga
                            </Link>
                            <Link
                                href='/contact'
                                className='text-slate-600 hover:text-blue-600 transition-colors'
                            >
                                Kontak
                            </Link>
                            <div className='flex items-center gap-3'>
                                <Link
                                    href='/login'
                                    className='text-slate-600 hover:text-blue-600 transition-colors'
                                >
                                    Masuk
                                </Link>
                                <Button
                                    className='bg-blue-600 hover:bg-blue-700'
                                    asChild
                                >
                                    <Link href='/register'>
                                        Daftar Sekarang
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className='md:hidden p-2'
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X className='h-5 w-5' />
                            ) : (
                                <Menu className='h-5 w-5' />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className='md:hidden border-t border-blue-100/60 py-4'>
                            <div className='flex flex-col gap-4'>
                                <Link
                                    href='/features'
                                    className='text-slate-600'
                                >
                                    Fitur
                                </Link>
                                <Link
                                    href='/pricing'
                                    className='text-slate-600'
                                >
                                    Harga
                                </Link>
                                <Link
                                    href='/contact'
                                    className='text-slate-600'
                                >
                                    Kontak
                                </Link>
                                <div className='flex flex-col gap-2 pt-2 border-t border-blue-100/60'>
                                    <Link
                                        href='/login'
                                        className='text-slate-600'
                                    >
                                        Masuk
                                    </Link>
                                    <Button
                                        className='bg-blue-600 hover:bg-blue-700 w-fit'
                                        asChild
                                    >
                                        <Link href='/register'>
                                            Daftar Sekarang
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className='pt-24 pb-16 px-6'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center space-y-8'>
                        <div className='inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700'>
                            <Sparkles className='h-4 w-4' />
                            Aplikasi Management Barbershop Terdepan
                        </div>

                        <h1 className='text-4xl md:text-6xl font-bold leading-tight text-slate-900'>
                            Kelola Barbershop
                            <span className='bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent'>
                                {" "}
                                Lebih Mudah
                            </span>
                        </h1>

                        <p className='mx-auto max-w-2xl text-xl text-slate-600'>
                            Platform all-in-one untuk booking, manajemen, dan
                            pertumbuhan bisnis barbershop Anda
                        </p>

                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <Button
                                size='lg'
                                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3'
                                asChild
                            >
                                <Link href='/register'>
                                    <ArrowRight className='h-5 w-5 mr-2' />
                                    Mulai Sekarang
                                </Link>
                            </Button>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3'
                                asChild
                            >
                                <Link href='/demo'>Lihat Demo</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                        {stats.map((stat, index) => (
                            <div key={index} className='text-center'>
                                <div className='text-3xl font-bold text-blue-600'>
                                    {stat.value}
                                </div>
                                <div className='mt-1 text-slate-500'>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='bg-blue-50/50 py-16'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='text-center mb-12'>
                        <h2 className='mb-4 text-3xl font-bold text-slate-900'>
                            Fitur Unggulan TrimTime
                        </h2>
                        <p className='mx-auto max-w-2xl text-slate-600'>
                            Semua yang Anda butuhkan untuk mengelola barbershop
                            modern dalam satu platform
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    className='border border-blue-100/70 bg-white p-6 transition-shadow hover:shadow-lg'
                                >
                                    <CardContent className='p-0'>
                                        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
                                            <Icon className='h-6 w-6 text-blue-600' />
                                        </div>
                                        <h3 className='mb-2 font-semibold text-slate-900'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-sm text-slate-600'>
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className='py-16'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        <div>
                            <h2 className='mb-6 text-3xl font-bold text-slate-900'>
                                Mengapa Memilih TrimTime?
                            </h2>
                            <p className='mb-6 text-slate-600'>
                                TrimTime hadir sebagai solusi digital terdepan
                                untuk industri barbershop di Indonesia. Kami
                                memahami tantangan yang dihadapi pemilik
                                barbershop dalam mengelola bisnis mereka.
                            </p>
                            <div className='space-y-4'>
                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='mt-1 h-5 w-5 text-blue-500' />
                                    <div>
                                        <h4 className='font-semibold text-slate-900'>
                                            Mudah Digunakan
                                        </h4>
                                        <p className='text-sm text-slate-600'>
                                            Interface yang intuitif, tidak perlu
                                            training khusus
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='mt-1 h-5 w-5 text-blue-500' />
                                    <div>
                                        <h4 className='font-semibold text-slate-900'>
                                            Support 24/7
                                        </h4>
                                        <p className='text-sm text-slate-600'>
                                            Tim support siap membantu kapan saja
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='mt-1 h-5 w-5 text-blue-500' />
                                    <div>
                                        <h4 className='font-semibold text-slate-900'>
                                            Terintegrasi Penuh
                                        </h4>
                                        <p className='text-sm text-slate-600'>
                                            Semua fitur dalam satu platform
                                            terpadu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 p-8'>
                                <div className='rounded-xl bg-white p-6 shadow-lg'>
                                    <div className='mb-4 flex items-center gap-3'>
                                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600'>
                                            <Sparkles className='h-5 w-5 text-white' />
                                        </div>
                                        <div>
                                            <h4 className='font-semibold'>
                                                Dashboard Analytics
                                            </h4>
                                            <p className='text-sm text-slate-500'>
                                                Real-time insights
                                            </p>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <div className='flex justify-between text-sm'>
                                            <span>Revenue Hari Ini</span>
                                            <span className='font-semibold text-blue-600'>
                                                +15%
                                            </span>
                                        </div>
                                        <div className='h-2 w-full rounded-full bg-blue-100'>
                                            <div className='h-2 w-3/4 rounded-full bg-blue-600'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='py-16 bg-blue-50/40'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='text-center mb-12'>
                        <h2 className='mb-4 text-3xl font-bold text-slate-900'>
                            Apa Kata Mereka?
                        </h2>
                        <p className='mx-auto max-w-2xl text-slate-600'>
                            Dengar langsung dari pemilik barbershop yang sudah
                            merasakan manfaat TrimTime
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {testimonials.map((testimonial, index) => (
                            <Card
                                key={index}
                                className='border border-blue-100 bg-white p-6 shadow-sm'
                            >
                                <CardContent className='p-0'>
                                    <div className='mb-4 flex items-center gap-3'>
                                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold'>
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className='font-semibold text-slate-900'>
                                                {testimonial.name}
                                            </h4>
                                            <p className='text-sm text-slate-500'>
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p className='italic text-slate-600'>
                                        &ldquo;{testimonial.content}&rdquo;
                                    </p>
                                    <div className='flex gap-1 mt-4'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className='h-4 w-4 fill-yellow-400 text-yellow-400'
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className='py-16'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='text-center mb-12'>
                        <h2 className='mb-4 text-3xl font-bold text-slate-900'>
                            Pilih Paket Yang Tepat
                        </h2>
                        <p className='mx-auto max-w-2xl text-slate-600'>
                            Paket fleksibel yang disesuaikan dengan kebutuhan
                            barbershop Anda
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {pricingPlans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative p-6 ${
                                    plan.popular
                                        ? "border-2 border-blue-500 shadow-lg"
                                        : "border border-blue-100"
                                }`}
                            >
                                {plan.popular && (
                                    <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                                        <span className='rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white'>
                                            Terpopuler
                                        </span>
                                    </div>
                                )}
                                <CardContent className='p-0'>
                                    <div className='mb-6 text-center'>
                                        <h3 className='mb-2 text-xl font-bold text-blue-600'>
                                            {plan.name}
                                        </h3>
                                        <div className='mb-2'>
                                            <span className='text-3xl font-bold text-blue-600'>
                                                {plan.price}
                                            </span>
                                            <span className='text-slate-500'>
                                                {plan.period}
                                            </span>
                                        </div>
                                        <p className='text-sm text-slate-600'>
                                            {plan.description}
                                        </p>
                                    </div>

                                    <ul className='mb-6 space-y-3'>
                                        {plan.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className='flex items-center gap-2'
                                                >
                                                    <CheckCircle className='h-4 w-4 text-blue-500' />
                                                    <span className='text-sm text-slate-600'>
                                                        {feature}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <Button
                                        className={`w-full ${
                                            plan.popular
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                        }`}
                                        asChild
                                    >
                                        <Link href='/register'>
                                            Pilih Paket
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='py-16 bg-white'>
                <div className='max-w-4xl mx-auto px-6'>
                    <div className='text-center mb-12'>
                        <h2 className='mb-4 text-3xl font-bold text-blue-600'>
                            Pertanyaan yang Sering Ditanyakan
                        </h2>
                        <p className='mx-auto max-w-2xl text-slate-600'>
                            Temukan jawaban untuk pertanyaan umum tentang
                            TrimTime
                        </p>
                    </div>

                    <div className='space-y-4'>
                        {faqs.map((faq, index) => (
                            <Card
                                key={index}
                                className='border border-blue-100 bg-white'
                            >
                                <CardContent className='p-0'>
                                    <button
                                        className='flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-blue-50'
                                        onClick={() =>
                                            setExpandedFAQ(
                                                expandedFAQ === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                    >
                                        <h3 className='pr-4 font-semibold text-blue-600'>
                                            {faq.question}
                                        </h3>
                                        {expandedFAQ === index ? (
                                            <ChevronUp className='h-5 w-5 flex-shrink-0 text-slate-500' />
                                        ) : (
                                            <ChevronDown className='h-5 w-5 flex-shrink-0 text-slate-500' />
                                        )}
                                    </button>
                                    {expandedFAQ === index && (
                                        <div className='px-6 pb-6'>
                                            <p className='text-slate-600'>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='border-t border-blue-100 bg-white py-16'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
                        <div className='col-span-1 md:col-span-2'>
                            <div className='flex items-center gap-2 mb-6'>
                                <Sparkles className='h-8 w-8 text-blue-600' />
                                <span className='text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent'>
                                    TrimTime
                                </span>
                            </div>
                            <p className='mb-6 text-lg leading-relaxed text-slate-600'>
                                Platform manajemen barbershop terdepan untuk
                                mengoptimalkan operasional dan meningkatkan
                                customer experience di seluruh Indonesia.
                            </p>
                            <div className='mb-4 flex items-center gap-3'>
                                <CheckCircle className='h-5 w-5 text-blue-500' />
                                <span className='font-medium text-slate-700'>
                                    Dipercaya oleh 50+ Barbershop
                                </span>
                            </div>
                            <div className='flex gap-4'>
                                <Button
                                    className='bg-blue-600 hover:bg-blue-700'
                                    asChild
                                >
                                    <Link href='/register'>Mulai Gratis</Link>
                                </Button>
                                <Button
                                    variant='outline'
                                    className='border-gray-300'
                                    asChild
                                >
                                    <Link href='/demo'>Lihat Demo</Link>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className='font-bold text-blue-600 mb-6 text-lg'>
                                Produk
                            </h3>
                            <ul className='space-y-3'>
                                <li>
                                    <Link
                                        href='/features'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Fitur Lengkap
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/pricing'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Harga & Paket
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/demo'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Demo Interaktif
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/integrations'
                                        className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
                                    >
                                        Integrasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className='font-bold text-blue-600 mb-6 text-lg'>
                                Dukungan
                            </h3>
                            <ul className='space-y-3'>
                                <li>
                                    <Link
                                        href='/contact'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Hubungi Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/help'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Pusat Bantuan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/docs'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Dokumentasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/training'
                                        className='font-medium text-slate-600 transition-colors hover:text-blue-600'
                                    >
                                        Training Online
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='border-t border-blue-100 pt-8'>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                            <div className='flex items-center gap-6 text-sm text-slate-500'>
                                <span>
                                    &copy; {new Date().getFullYear()} TrimTime.
                                    All rights reserved.
                                </span>
                                <Link
                                    href='/privacy'
                                    className='hover:text-gray-700 transition-colors'
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href='/terms'
                                    className='hover:text-gray-700 transition-colors'
                                >
                                    Terms of Service
                                </Link>
                            </div>
                            <div className='text-sm text-slate-500'>
                                Made with ❤️ in Indonesia
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
