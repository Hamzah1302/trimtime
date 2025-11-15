import Link from "next/link";

import {
    BriefcaseBusiness,
    Crown,
    Scissors,
    Sparkles,
    UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const loginOptions = [
    {
        label: "Owner Barbershop",
        href: "/login/owner",
        icon: Crown,
        description: "Kelola cabang, barber, dan laporan pendapatan secara real-time.",
    },
    {
        label: "Barber Partner",
        href: "/login/barber",
        icon: Scissors,
        description: "Kendalikan jadwal, status booking, dan pendapatan harian Anda.",
    },
    {
        label: "Pelanggan TrimTime",
        href: "/login/user",
        icon: UserRound,
        description: "Booking cepat tanpa antre dan pantau progres barber pilihan Anda.",
    },
    {
        label: "Freelancer TrimTime",
        href: "/login/freelancer",
        icon: BriefcaseBusiness,
        description: "Gabung jaringan job home service eksklusif dengan jadwal fleksibel.",
    },
] as const;

export default function LoginPage() {
    return (
        <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-background via-background to-muted/60 px-6 py-12 text-foreground'>
            <span className='pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-primary/25 blur-3xl' />
            <span className='pointer-events-none absolute bottom-[-6rem] right-[-2rem] h-80 w-80 rounded-full bg-secondary/20 blur-[140px]' />
            <div className='relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur md:grid-cols-[1.05fr_1fr]'>
                <div className='flex flex-col justify-between gap-10 border-b border-border/40 bg-linear-to-br from-primary/15 via-primary/5 to-transparent p-8 md:border-b-0 md:border-r md:p-10'>
                    <div className='space-y-6'>
                        <Badge className='w-fit border border-primary/30 bg-primary/10 text-xs font-semibold uppercase tracking-widest text-primary'>
                            Selamat datang
                        </Badge>
                        <div className='space-y-4'>
                            <h1 className='text-3xl font-semibold leading-tight md:text-4xl'>
                                Masuk ke ekosistem TrimTime
                            </h1>
                            <p className='text-sm text-primary/80 md:text-base'>
                                Pilih peran login agar dashboard Anda otomatis menyesuaikan kebutuhan booking, operasional, maupun laporan.
                            </p>
                        </div>
                        <div className='grid gap-4 text-sm text-primary/80'>
                            <div className='flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/10/50 p-3'>
                                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary'>
                                    <Sparkles className='h-4 w-4' />
                                </span>
                                <div className='space-y-1'>
                                    <p className='font-medium text-foreground'>Satu platform terpadu</p>
                                    <p>Data booking, jadwal barber, dan laporan owner tersinkron otomatis.</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 rounded-2xl border border-primary/10 bg-background/80 p-3'>
                                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary'>
                                    <Scissors className='h-4 w-4' />
                                </span>
                                <div className='space-y-1'>
                                    <p className='font-medium text-foreground'>Role-based access</p>
                                    <p>Setiap peran hanya melihat fitur yang relevan sehingga operasional tetap aman.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-2xl border border-border/40 bg-background/80 p-4 text-sm text-muted-foreground'>
                        <p className='font-medium text-foreground'>Butuh bantuan akses?</p>
                        <p>Hubungi support@trimtime.id untuk reset akun owner atau barber Anda.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8 p-8 md:p-10'>
                    <div className='space-y-2 text-center md:text-left'>
                        <h2 className='text-2xl font-semibold text-foreground'>Masuk sesuai peran Anda</h2>
                        <p className='text-sm text-muted-foreground'>Pilih akses yang tepat agar pengalaman TrimTime tetap lancar dan aman.</p>
                    </div>
                    <div className='grid gap-4'>
                        {loginOptions.map(({ label, href, icon: Icon, description }) => (
                            <Link
                                key={href}
                                href={href}
                                className='group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                            >
                                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground'>
                                    <Icon className='h-5 w-5' />
                                </span>
                                <div className='flex flex-1 flex-col gap-1'>
                                    <div className='flex items-center justify-between gap-2'>
                                        <span className='text-sm font-semibold text-foreground'>{label}</span>
                                        <span className='text-[11px] font-semibold uppercase tracking-widest text-muted-foreground transition group-hover:text-primary'>Masuk</span>
                                    </div>
                                    <p className='text-xs leading-relaxed text-muted-foreground'>{description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='space-y-3 rounded-2xl border border-border/40 bg-muted/15 p-5 text-sm text-muted-foreground'>
                        <p className='text-center md:text-left'>
                            Belum punya akun?{" "}
                            <Link href='/register' className='font-semibold text-primary hover:underline'>
                                Daftar sebagai pelanggan
                            </Link>
                            .
                        </p>
                        <p className='text-center text-xs md:text-left'>Akses admin internal dikelola terpisah oleh tim TrimTime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
