"use client";

import { useState } from "react";
import Link from "next/link";
import {
    CalendarCheck,
    CheckCircle2,
    Clock,
    MapPin,
    Phone,
    Scissors,
    ShieldCheck,
    TrendingUp,
    Users,
    Wallet,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const summaryMetrics = [
    {
        label: "Booking Hari Ini",
        value: "8 pelanggan",
        helper: "6 sudah dikonfirmasi",
        trend: "+2 dibanding kemarin",
        icon: CalendarCheck,
    },
    {
        label: "Pendapatan Hari Ini",
        value: "Rp 1.250.000",
        helper: "Target harian tercapai 82%",
        trend: "+12% dibanding rata-rata",
        icon: Wallet,
    },
    {
        label: "Home Service Aktif",
        value: "3 Selesai",
        helper: "1 belum Selesai",
        trend: "Prioritas cek GPS",
        icon: Users,
    },
    {
        label: "Rating Rata-rata",
        value: "4.9 / 5",
        helper: "32 ulasan baru minggu ini",
        trend: "Pertahankan kualitas",
        icon: TrendingUp,
    },
] as const;

type BarberStatus = "active" | "break" | "offline";

const quickStatusOptions: Array<{
    value: BarberStatus;
    label: string;
    helper: string;
}> = [
    {
        value: "active",
        label: "Aktif",
        helper: "Tampil di daftar booking & terima pelanggan",
    },
    {
        value: "break",
        label: "Istirahat",
        helper: "Tutup sementara pakai Smart Break",
    },
    {
        value: "offline",
        label: "Pulang",
        helper: "Sembunyikan jadwal hingga besok",
    },
];

const statusInfo: Record<
    BarberStatus,
    { label: string; description: string; tone: string }
> = {
    active: {
        label: "Aktif",
        description: "Barber siap menerima booking baru.",
        tone: "text-emerald-600",
    },
    break: {
        label: "Istirahat sementara",
        description: "Smart Break aktif, jadwal akan auto-aktif saat selesai.",
        tone: "text-amber-600",
    },
    offline: {
        label: "Pulang",
        description: "Tidak menerima booking sampai status diubah.",
        tone: "text-muted-foreground",
    },
};

const breakDurations = [15, 30, 45, 60] as const;

const todaysClients = [
    {
        id: "TT-3021",
        name: "Dimas Saputra",
        initials: "DS",
        time: "09:00 WIB",
        service: "Signature Fade + Steam",
        status: "Menunggu check-in",
        statusTone: "pending",
        channel: "Walk-in",
    },
    {
        id: "TT-3022",
        name: "Hafidz Rahman",
        initials: "HR",
        time: "10:30 WIB",
        service: "Classic Cut & Beard",
        status: "Sedang dikerjakan",
        statusTone: "ongoing",
        channel: "Booking aplikasi",
    },
    {
        id: "TT-3023",
        name: "Reyhan Fadil",
        initials: "RF",
        time: "11:30 WIB",
        service: "Home service deluxe",
        status: "On the way",
        statusTone: "tracking",
        channel: "Home service",
    },
    {
        id: "TT-3024",
        name: "Vino Mahardika",
        initials: "VM",
        time: "13:00 WIB",
        service: "Kids haircut",
        status: "Selesai",
        statusTone: "done",
        channel: "Walk-in",
    },
] as const;

const bookingFunnel = [
    {
        label: "Menunggu Konfirmasi",
        current: 2,
        total: 8,
        tone: "pending",
    },
    {
        label: "Sedang Dikerjakan",
        current: 3,
        total: 8,
        tone: "ongoing",
    },
    {
        label: "Sudah Selesai",
        current: 3,
        total: 8,
        tone: "done",
    },
] as const;

const activityTimeline = [
    {
        time: "08:45",
        title: "Check-in pelanggan",
        description: "Dimas Saputra sudah tiba di barbershop.",
        icon: CheckCircle2,
    },
    {
        time: "09:20",
        title: "Home service berangkat",
        description: "Reyhan Fadil sedang OTW ke Menara BCA.",
        icon: MapPin,
    },
    {
        time: "10:05",
        title: "Pembayaran diterima",
        description: "Transaksi QRIS Rp 230.000 dari Hafidz.",
        icon: Wallet,
    },
    {
        time: "10:30",
        title: "Booking baru",
        description: "Sesi kids haircut untuk Vino pukul 13:00.",
        icon: CalendarCheck,
    },
] as const;

const statusBadgeStyles = {
    pending: "bg-amber-500/15 text-amber-600",
    ongoing: "bg-primary/10 text-primary",
    tracking: "bg-sky-500/15 text-sky-600",
    done: "bg-emerald-500/15 text-emerald-600",
} satisfies Record<string, string>;

const workloadPercentage = 78;

export default function BarberDashboardPage() {
    const [currentStatus, setCurrentStatus] = useState<BarberStatus>("active");
    const [isBreakDialogOpen, setBreakDialogOpen] = useState(false);
    const [selectedBreakDuration, setSelectedBreakDuration] =
        useState<number>(15);
    const [activeBreak, setActiveBreak] = useState<number | null>(null);

    const handleStatusSelect = (status: BarberStatus) => {
        if (status === "break") {
            setBreakDialogOpen(true);
            return;
        }
        setCurrentStatus(status);
        setActiveBreak(null);
    };

    const handleStartBreak = () => {
        setCurrentStatus("break");
        setActiveBreak(selectedBreakDuration);
        setBreakDialogOpen(false);
    };

    const handleEndBreak = () => {
        setCurrentStatus("active");
        setActiveBreak(null);
    };

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                    <div className='flex items-start gap-4'>
                        <div className='relative'>
                            <Avatar className='h-16 w-16 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Rama Putra'
                                />
                                <AvatarFallback className='bg-primary/10 text-base font-semibold text-primary'>
                                    RP
                                </AvatarFallback>
                            </Avatar>
                            <Badge className='absolute -bottom-2 left-1/2 -translate-x-1/2 border border-primary/40 bg-primary text-primary-foreground shadow'>
                                Top Barber
                            </Badge>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
                                Dashboard Barber
                            </p>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Rama Putra
                            </h1>
                            <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                                <span className='inline-flex items-center gap-1'>
                                    <MapPin className='h-3.5 w-3.5 text-primary' />
                                    Menara BCA, Jakarta
                                </span>
                                <span className='inline-flex items-center gap-1'>
                                    <Phone className='h-3.5 w-3.5 text-primary' />
                                    0812-8890-1122
                                </span>
                                <span className='inline-flex items-center gap-1'>
                                    <ShieldCheck className='h-3.5 w-3.5 text-primary' />
                                    Status: Aktif
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start gap-3 rounded-2xl border border-border/40 bg-card/80 p-4 shadow-sm backdrop-blur lg:items-end'>
                        <Badge
                            variant='outline'
                            className='border-border/60 bg-muted/30 text-xs font-semibold uppercase tracking-widest'
                        >
                            Shift Pagi
                        </Badge>
                        <p className='text-sm text-muted-foreground'>
                            Slot tersisa{" "}
                            <span className='font-semibold text-foreground'>
                                2
                            </span>{" "}
                            dari 10 antrian.
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            <Button
                                variant='outline'
                                className='border-border/60'
                            >
                                Atur Jadwal
                            </Button>
                            <Button asChild>
                                <Link href='/booking/create'>
                                    Tambah Booking
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Status cepat
                                </CardTitle>
                                <CardDescription>
                                    Atur ketersediaan kamu hanya dengan sekali
                                    klik.
                                </CardDescription>
                            </div>
                            <Badge className='w-fit rounded-full bg-primary/10 text-[11px] font-semibold uppercase tracking-widest text-primary'>
                                {statusInfo[currentStatus].label}
                            </Badge>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='grid gap-2 sm:grid-cols-3'>
                                {quickStatusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type='button'
                                        onClick={() =>
                                            handleStatusSelect(option.value)
                                        }
                                        className={`rounded-xl border px-4 py-3 text-left transition ${
                                            currentStatus === option.value
                                                ? "border-primary bg-primary/10 text-primary shadow-sm"
                                                : "border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                        }`}
                                    >
                                        <p className='text-sm font-semibold'>
                                            {option.label}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            {option.helper}
                                        </p>
                                    </button>
                                ))}
                            </div>
                            <div className='rounded-xl border border-dashed border-border/50 bg-muted/20 p-3 text-sm'>
                                <p
                                    className={`font-semibold ${statusInfo[currentStatus].tone}`}
                                >
                                    {statusInfo[currentStatus].label}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {statusInfo[currentStatus].description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Smart Break
                            </CardTitle>
                            <CardDescription>
                                Tutup sementara 15–60 menit. Status akan
                                otomatis kembali aktif.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {currentStatus === "break" && activeBreak ? (
                                <div className='rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700'>
                                    <p className='font-semibold'>
                                        Istirahat {activeBreak} menit
                                    </p>
                                    <p className='text-xs'>
                                        Sistem akan mengaktifkan profilmu
                                        otomatis setelah break selesai.
                                    </p>
                                </div>
                            ) : (
                                <div className='rounded-xl border border-border/40 bg-muted/20 px-4 py-3 text-sm text-muted-foreground'>
                                    <p className='font-semibold text-foreground'>
                                        Tidak ada break yang aktif
                                    </p>
                                    <p className='text-xs'>
                                        Gunakan Smart Break ketika perlu
                                        istirahat singkat tanpa mengganggu
                                        antrian pelanggan.
                                    </p>
                                </div>
                            )}
                            <div className='flex flex-wrap gap-2'>
                                <Button
                                    variant='outline'
                                    className='border-border/60'
                                    type='button'
                                    onClick={() => setBreakDialogOpen(true)}
                                >
                                    Atur Smart Break
                                </Button>
                                {currentStatus === "break" ? (
                                    <Button
                                        type='button'
                                        onClick={handleEndBreak}
                                    >
                                        Akhiri sekarang
                                    </Button>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Dialog
                    open={isBreakDialogOpen}
                    onOpenChange={(open) => setBreakDialogOpen(open)}
                >
                    <DialogContent className='max-w-md rounded-2xl border border-border/50 bg-card'>
                        <DialogHeader>
                            <DialogTitle>Smart Break</DialogTitle>
                            <DialogDescription>
                                Pilih durasi break. Status barber akan otomatis
                                kembali aktif setelah waktu berakhir.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-3 text-sm'>
                                {breakDurations.map((duration) => (
                                    <button
                                        key={duration}
                                        type='button'
                                        onClick={() =>
                                            setSelectedBreakDuration(duration)
                                        }
                                        className={`rounded-xl border px-4 py-3 font-semibold transition ${
                                            selectedBreakDuration === duration
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border/40 text-muted-foreground hover:border-primary/40"
                                        }`}
                                    >
                                        {duration} menit
                                    </button>
                                ))}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                                Kamu masih bisa mengakhiri break kapan saja
                                sebelum waktu habis.
                            </p>
                        </div>
                        <DialogFooter className='flex w-full flex-row-reverse gap-2'>
                            <Button type='button' onClick={handleStartBreak}>
                                Mulai break
                            </Button>
                            <Button
                                type='button'
                                variant='outline'
                                className='border-border/60'
                                onClick={() => setBreakDialogOpen(false)}
                            >
                                Batalkan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {summaryMetrics.map(
                        ({ label, value, helper, trend, icon: Icon }) => (
                            <Card
                                key={label}
                                className='border-border/50 bg-card/90 shadow-sm transition-all hover:shadow-md'
                            >
                                <CardHeader className='gap-3'>
                                    <div className='flex items-center justify-between gap-3'>
                                        <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                                            <Icon className='h-5 w-5' />
                                        </span>
                                        <Badge
                                            variant='outline'
                                            className='border-border/40 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground'
                                        >
                                            {label}
                                        </Badge>
                                    </div>
                                    <CardTitle className='text-2xl font-bold text-card-foreground'>
                                        {value}
                                    </CardTitle>
                                    <CardDescription className='text-xs leading-relaxed text-muted-foreground'>
                                        {helper}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='border-t border-border/40 pt-4'>
                                    <p className='text-xs font-semibold text-emerald-600'>
                                        {trend}
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.35fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Pelanggan hari ini
                                </CardTitle>
                                <CardDescription>
                                    Monitor kedatangan dan progres layanan
                                    on-site & home service.
                                </CardDescription>
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60'
                            >
                                Lihat agenda lengkap
                            </Button>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {todaysClients.map((client) => (
                                <div
                                    key={client.id}
                                    className='flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'
                                >
                                    <div className='flex items-start gap-3'>
                                        <Avatar className='h-11 w-11 border border-border/40 shadow-sm'>
                                            <AvatarImage
                                                src='/placeholder.jpg'
                                                alt={client.name}
                                            />
                                            <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                                {client.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='space-y-1'>
                                            <p className='text-sm font-semibold text-card-foreground'>
                                                {client.name}
                                            </p>
                                            <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                                                <span className='inline-flex items-center gap-1'>
                                                    <Clock className='h-3.5 w-3.5 text-primary' />
                                                    {client.time}
                                                </span>
                                                <span className='inline-flex items-center gap-1'>
                                                    <Scissors className='h-3.5 w-3.5 text-primary' />
                                                    {client.service}
                                                </span>
                                            </div>
                                            <div className='flex flex-wrap items-center gap-2 pt-1'>
                                                <Badge
                                                    className={
                                                        statusBadgeStyles[
                                                            client.statusTone
                                                        ]
                                                    }
                                                >
                                                    {client.status}
                                                </Badge>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/50 bg-background/60 text-xs text-muted-foreground'
                                                >
                                                    {client.channel}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start gap-2 text-xs text-muted-foreground sm:items-end'>
                                        <p className='font-semibold uppercase tracking-widest text-foreground'>
                                            {client.id}
                                        </p>
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            className='border-border/60'
                                            asChild
                                        >
                                            <Link
                                                href={`/barber/booking/${client.id.toLowerCase()}`}
                                            >
                                                Detail
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2'>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Status booking
                            </CardTitle>
                            <CardDescription>
                                Update progres layanan realtime dan kapasitas
                                kursi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {bookingFunnel.map((segment) => {
                                const percent = Math.round(
                                    (segment.current / segment.total) * 100
                                );
                                return (
                                    <div
                                        key={segment.label}
                                        className='rounded-lg border border-border/40 bg-muted/20 p-4'
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {segment.label}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {segment.current} dari{" "}
                                                    {segment.total} antrian
                                                </p>
                                            </div>
                                            <Badge
                                                className={
                                                    statusBadgeStyles[
                                                        segment.tone
                                                    ]
                                                }
                                            >
                                                {percent}%
                                            </Badge>
                                        </div>
                                        <div className='mt-3 space-y-2'>
                                            <Progress value={percent} />
                                            <p className='text-[10px] uppercase tracking-widest text-muted-foreground'>
                                                Perbarui status agar pelanggan
                                                menerima notifikasi tepat waktu.
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Beban kerja hari ini
                                </p>
                                <p className='mt-1 leading-relaxed text-muted-foreground'>
                                    Kursi aktif terpakai {workloadPercentage}%
                                    dengan estimasi jeda antar pelanggan 12
                                    menit.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.2fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Aktivitas terbaru
                                </CardTitle>
                                <CardDescription>
                                    Catatan otomatis dari sistem booking
                                    TrimTime.
                                </CardDescription>
                            </div>
                            <Badge
                                variant='outline'
                                className='border-border/60 bg-muted/20 text-xs font-semibold uppercase tracking-widest'
                            >
                                Update 15 menit lalu
                            </Badge>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {activityTimeline.map(
                                ({ time, title, description, icon: Icon }) => (
                                    <div
                                        key={`${time}-${title}`}
                                        className='flex gap-3 rounded-xl border border-border/40 bg-background/70 px-4 py-3 shadow-sm'
                                    >
                                        <span className='mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                            <Icon className='h-4 w-4' />
                                        </span>
                                        <div className='space-y-1'>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {title}
                                                </p>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/50 text-[10px] tracking-widest text-muted-foreground'
                                                >
                                                    {time}
                                                </Badge>
                                            </div>
                                            <p className='text-xs leading-relaxed text-muted-foreground'>
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='space-y-3'>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Rekap pendapatan
                            </CardTitle>
                            <CardDescription>
                                Monitoring performa harian dan target mingguan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                    Hari ini
                                </p>
                                <p className='text-2xl font-bold text-foreground'>
                                    Rp 1.250.000
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Termasuk 3 layanan premium & 1 home service.
                                </p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                    Target mingguan
                                </p>
                                <div className='mt-1 space-y-2'>
                                    <div className='flex items-center justify-between text-sm text-foreground'>
                                        <span>Tercapai</span>
                                        <span>85%</span>
                                    </div>
                                    <Progress value={85} />
                                </div>
                                <p className='mt-2 text-xs text-muted-foreground'>
                                    Jaga performa home service untuk menutup
                                    sisa target Rp 1.100.000.
                                </p>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Tips hari ini
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Ucapkan terima kasih setelah layanan dan
                                    minta pelanggan memberi rating melalui
                                    aplikasi untuk boost visibilitas.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
