"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
    Activity,
    BadgeCheck,
    CheckCircle2,
    Clock,
    Filter,
    MapPin,
    Menu,
    MessageCircle,
    PencilLine,
    Route,
    Search,
    Scissors,
    SquarePen,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PageShell } from "@/components/layout/page-shell";
import {
    freelancerBookingList,
    freelancerBookingSummary,
    freelancerQueueLine,
    freelancerQueueStatusBadgeStyles,
    freelancerQueueStatusLabels,
    freelancerQueueTimeline,
    freelancerQueueTimelineStyles,
    freelancerStatusActions,
    freelancerStatusBadgeStyles,
    freelancerStatusLabels,
    type FreelancerBookingStatus,
} from "@/data/freelancer-booking";

type BookingActionMenuProps = {
    bookingSlug: string;
    telHref: string;
    status: FreelancerBookingStatus;
    handlePlaceholderAction: (event: Event) => void;
    align?: "start" | "center" | "end";
};

function BookingActionMenu({
    bookingSlug,
    telHref,
    status,
    handlePlaceholderAction,
    align = "end",
}: BookingActionMenuProps) {
    return (
        <DropdownMenuContent
            align={align}
            className='min-w-[16rem] space-y-1 rounded-lg border border-border/50 bg-card/95 p-2 shadow-lg backdrop-blur'
        >
            <DropdownMenuLabel className='text-[11px] uppercase tracking-widest text-muted-foreground'>
                Tindakan Booking
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link
                    href={`/freelancer/jobs/${bookingSlug}`}
                    className='flex items-start gap-3 text-sm'
                >
                    <BadgeCheck className='mt-0.5 h-4 w-4 text-primary' />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-foreground'>
                            Lihat detail booking
                        </span>
                        <span className='text-[11px] text-muted-foreground'>
                            Cek informasi lengkap & timeline aktivitas
                        </span>
                    </div>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a href={telHref} className='flex items-start gap-3 text-sm'>
                    <MessageCircle className='mt-0.5 h-4 w-4 text-primary' />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-foreground'>
                            Hubungi pelanggan
                        </span>
                        <span className='text-[11px] text-muted-foreground'>
                            Telepon cepat sebelum sesi dimulai
                        </span>
                    </div>
                </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-border/40' />
            {freelancerStatusActions[status]?.map(
                ({ label, description, icon: Icon }) => (
                    <DropdownMenuItem
                        key={label}
                        onSelect={handlePlaceholderAction}
                        className='flex items-start gap-3 text-sm text-muted-foreground'
                    >
                        <Icon className='mt-0.5 h-4 w-4 text-primary' />
                        <div className='flex flex-col'>
                            <span className='font-semibold text-foreground'>
                                {label}
                            </span>
                            {description ? (
                                <span className='text-[11px] leading-snug text-muted-foreground'>
                                    {description}
                                </span>
                            ) : null}
                        </div>
                    </DropdownMenuItem>
                )
            )}
            <DropdownMenuSeparator className='bg-border/40' />
            <DropdownMenuItem
                onSelect={handlePlaceholderAction}
                className='flex items-start gap-3 text-sm text-muted-foreground'
            >
                <SquarePen className='mt-0.5 h-4 w-4 text-primary' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-foreground'>
                        Tambah catatan manual
                    </span>
                    <span className='text-[11px] text-muted-foreground'>
                        Simpan insight untuk owner atau tim CS
                    </span>
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default function FreelancerBookingPage() {
    const handlePlaceholderAction = useCallback((event: Event) => {
        event.preventDefault();
    }, []);

    const activeQueue = freelancerQueueLine[0];

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-9 lg:pb-4'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-12 w-12 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Naya Pratama'
                                />
                                <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                    NP
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Freelancer
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Home Service
                                    </Badge>
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    Mobile Grooming Specialist
                                </p>
                                <h2 className='text-xl font-bold tracking-tight text-foreground'>
                                    Naya Pratama
                                </h2>
                            </div>
                        </div>
                        <div className='grid gap-3 text-xs text-muted-foreground sm:grid-cols-2 lg:w-auto lg:grid-cols-3'>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Route className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Perjalanan aktif
                                    </p>
                                    <p>Armada siap: 3/4</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <MapPin className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Basis freelancer
                                    </p>
                                    <p>TrimTime HQ, SCBD</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Clock className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Jadwal berikutnya
                                    </p>
                                    <p>11 Feb • 13:30 WIB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                        <Card className='border-border/50 bg-card/80 shadow-sm'>
                            <CardContent className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center'>
                                <div className='space-y-4'>
                                    <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                        <Route className='h-4 w-4' />
                                        Board Home Service
                                    </div>
                                    <div className='space-y-3'>
                                        <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                            Permintaan Freelancer Hari Ini
                                        </h1>
                                        <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                            Kelola home service, konfirmasi
                                            keberangkatan, dan pastikan
                                            pelanggan menerima update status
                                            secara realtime.
                                        </p>
                                    </div>
                                    <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
                                        <Badge className='bg-primary/10 text-primary'>
                                            Auto-sync GPS
                                        </Badge>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            Notifikasi WhatsApp & SMS
                                        </Badge>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 rounded-2xl border border-border/50 bg-muted/20 p-4'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                            Agenda aktif
                                        </span>
                                        <Badge
                                            variant='outline'
                                            className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            Auto-sync
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className='text-2xl font-bold text-foreground'>
                                            6 perjalanan
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Termasuk 2 kantor langganan & 1
                                            family pack.
                                        </p>
                                    </div>
                                    <Button asChild>
                                        <Link href='/freelancer/jobs/new'>
                                            Catat job manual
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:space-y-7 lg:px-8 lg:pt-4 lg:pb-6'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Ringkasan permintaan
                            </CardTitle>
                            <CardDescription>
                                Pantau slot OTW, tiba, dan progres layanan home
                                service.
                            </CardDescription>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <Button
                                variant='outline'
                                size='sm'
                                className='border-border/60'
                            >
                                <Filter className='h-3.5 w-3.5' />
                                Filter status
                            </Button>
                            <Button
                                variant='outline'
                                size='sm'
                                className='border-border/60'
                            >
                                <Menu className='h-3.5 w-3.5' />
                                Urutkan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                        {freelancerBookingSummary.map(
                            ({ label, value, helper, icon: Icon }) => (
                                <div
                                    key={label}
                                    className='rounded-xl border border-border/40 bg-muted/20 p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow'
                                >
                                    <div className='flex items-center justify-between'>
                                        <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                            <Icon className='h-5 w-5' />
                                        </span>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            {label}
                                        </Badge>
                                    </div>
                                    <p className='mt-4 text-2xl font-bold text-foreground'>
                                        {value}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {helper}
                                    </p>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Sistem antrian perjalanan
                            </CardTitle>
                            <CardDescription>
                                Monitor perjalanan aktif dan request berikutnya.
                            </CardDescription>
                        </div>
                        <Badge
                            variant='outline'
                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                        >
                            Auto-sync GPS
                        </Badge>
                    </CardHeader>
                    <CardContent className='grid gap-5 lg:grid-cols-[1.3fr_1fr]'>
                        <div className='space-y-5'>
                            <div className='rounded-2xl border border-border/50 bg-primary/5 p-5 shadow-sm'>
                                <div className='flex flex-wrap items-start justify-between gap-3'>
                                    <div>
                                        <p className='text-xs font-semibold uppercase tracking-widest text-primary'>
                                            Sedang dilayani
                                        </p>
                                        <p className='mt-1 text-2xl font-bold text-foreground'>
                                            {activeQueue.customer}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {activeQueue.service}
                                        </p>
                                    </div>
                                    <Badge className='bg-primary text-primary-foreground shadow-sm'>
                                        {activeQueue.chair}
                                    </Badge>
                                </div>
                                <div className='mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2'>
                                    <div className='flex items-center gap-2 rounded-xl border border-primary/20 bg-white/40 px-3 py-2 text-primary'>
                                        <Clock className='h-4 w-4' />
                                        Mulai {activeQueue.start}
                                    </div>
                                    <div className='flex items-center gap-2 rounded-xl border border-primary/20 bg-white/40 px-3 py-2 text-primary'>
                                        <Activity className='h-4 w-4' />
                                        {activeQueue.eta}
                                    </div>
                                </div>
                                <div className='mt-5 space-y-3'>
                                    <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                        Progress perjalanan
                                    </p>
                                    <div className='space-y-3'>
                                        {freelancerQueueTimeline.map((step) => (
                                            <div
                                                key={step.label}
                                                className='flex items-start gap-3 rounded-2xl border bg-card/80 p-3'
                                            >
                                                <span
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                                                        freelancerQueueTimelineStyles[
                                                            step.status
                                                        ]
                                                    }`}
                                                >
                                                    {step.status === "done" ? (
                                                        <CheckCircle2 className='h-4 w-4' />
                                                    ) : step.status ===
                                                      "current" ? (
                                                        <Activity className='h-4 w-4' />
                                                    ) : (
                                                        <Clock className='h-4 w-4' />
                                                    )}
                                                </span>
                                                <div className='space-y-1 text-sm'>
                                                    <div className='flex flex-wrap items-center gap-2'>
                                                        <p className='font-semibold text-foreground'>
                                                            {step.label}
                                                        </p>
                                                        <Badge
                                                            variant='outline'
                                                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                                        >
                                                            {step.time}
                                                        </Badge>
                                                    </div>
                                                    <p className='text-xs leading-relaxed text-muted-foreground'>
                                                        {step.note}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                    Request berikutnya
                                </p>
                                <Badge
                                    variant='outline'
                                    className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                >
                                    {freelancerQueueLine.length - 1} request
                                </Badge>
                            </div>
                            <div className='space-y-3'>
                                {freelancerQueueLine.slice(1).map((queue) => (
                                    <div
                                        key={queue.id}
                                        className='rounded-2xl border border-border/40 bg-muted/20 p-4'
                                    >
                                        <div className='flex items-start justify-between gap-3'>
                                            <div>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {queue.customer}
                                                </p>
                                                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                    {queue.id}
                                                </p>
                                            </div>
                                            <Badge
                                                className={
                                                    freelancerQueueStatusBadgeStyles[
                                                        queue.status
                                                    ]
                                                }
                                            >
                                                {
                                                    freelancerQueueStatusLabels[
                                                        queue.status
                                                    ]
                                                }
                                            </Badge>
                                        </div>
                                        <div className='mt-3 space-y-1 text-xs text-muted-foreground'>
                                            <p className='inline-flex items-center gap-1'>
                                                <Scissors className='h-3.5 w-3.5 text-primary' />
                                                {queue.service}
                                            </p>
                                            <p className='inline-flex items-center gap-1'>
                                                <Clock className='h-3.5 w-3.5 text-primary' />
                                                {queue.start} • {queue.eta}
                                            </p>
                                            <p className='inline-flex items-center gap-1'>
                                                <MapPin className='h-3.5 w-3.5 text-primary' />
                                                {queue.chair}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Daftar home service
                            </CardTitle>
                            <CardDescription>
                                Update status: konfirmasi → mulai → selesai agar
                                pelanggan menerima notifikasi otomatis.
                            </CardDescription>
                        </div>
                        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                            <div className='relative w-full sm:w-64'>
                                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                                <Input
                                    placeholder='Cari nama atau ID booking'
                                    className='pl-9'
                                />
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60'
                            >
                                <Clock className='h-4 w-4' />
                                Agenda saya
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-3 lg:hidden'>
                            {freelancerBookingList.map((item) => {
                                const phoneDigits = item.phone.replace(
                                    /\D/g,
                                    ""
                                );
                                const telHref = phoneDigits
                                    ? `tel:+${
                                          phoneDigits.startsWith("0")
                                              ? `62${phoneDigits.slice(1)}`
                                              : phoneDigits
                                      }`
                                    : "tel:+62";
                                return (
                                    <div
                                        key={`${item.id}-compact`}
                                        className='space-y-3 rounded-2xl border border-border/50 bg-muted/15 p-4 shadow-sm'
                                    >
                                        <div className='flex flex-wrap items-start justify-between gap-3'>
                                            <div className='flex items-center gap-3'>
                                                <Avatar className='h-10 w-10 border border-border/40'>
                                                    <AvatarImage
                                                        src='/placeholder.jpg'
                                                        alt={item.customer}
                                                    />
                                                    <AvatarFallback className='bg-primary/10 text-xs font-semibold text-primary'>
                                                        {item.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className='text-sm font-semibold text-foreground'>
                                                        {item.customer}
                                                    </p>
                                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                        {item.id}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end gap-2 text-right'>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/50 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground'
                                                >
                                                    {item.type}
                                                </Badge>
                                                <span className='text-sm font-semibold text-foreground'>
                                                    {item.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='space-y-2 text-xs text-muted-foreground'>
                                            <span className='inline-flex items-center gap-1.5'>
                                                <Clock className='h-3.5 w-3.5 text-primary' />
                                                {item.schedule}
                                            </span>
                                            <span className='inline-flex items-center gap-1.5'>
                                                <MapPin className='h-3.5 w-3.5 text-primary' />
                                                {item.location}
                                            </span>
                                            <span className='inline-flex items-center gap-1.5'>
                                                <Scissors className='h-3.5 w-3.5 text-primary' />
                                                {item.service}
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <Badge
                                                className={
                                                    freelancerStatusBadgeStyles[
                                                        item.status
                                                    ]
                                                }
                                            >
                                                {
                                                    freelancerStatusLabels[
                                                        item.status
                                                    ]
                                                }
                                            </Badge>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60'
                                                asChild
                                            >
                                                <a href={telHref}>
                                                    Telepon pelanggan
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className='space-y-3 max-lg:hidden'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pelanggan</TableHead>
                                        <TableHead>Jadwal & lokasi</TableHead>
                                        <TableHead>Layanan</TableHead>
                                        <TableHead className='text-center'>
                                            Tipe
                                        </TableHead>
                                        <TableHead className='text-center'>
                                            Status
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            Tarif
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {freelancerBookingList.map((item) => {
                                        const bookingSlug =
                                            item.id.toLowerCase();
                                        const phoneDigits = item.phone.replace(
                                            /\D/g,
                                            ""
                                        );
                                        const telHref = phoneDigits
                                            ? `tel:+${
                                                  phoneDigits.startsWith("0")
                                                      ? `62${phoneDigits.slice(
                                                            1
                                                        )}`
                                                      : phoneDigits
                                              }`
                                            : "tel:+62";
                                        return (
                                            <TableRow
                                                key={item.id}
                                                className='transition-colors hover:bg-muted/20'
                                            >
                                                <TableCell className='align-top'>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className='h-9 w-9 border border-border/40'>
                                                            <AvatarImage
                                                                src='/placeholder.jpg'
                                                                alt={
                                                                    item.customer
                                                                }
                                                            />
                                                            <AvatarFallback className='bg-primary/10 text-xs font-semibold text-primary'>
                                                                {item.initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className='text-sm font-semibold text-foreground'>
                                                                {item.customer}
                                                            </p>
                                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                                {item.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className='align-top text-xs text-muted-foreground'>
                                                    <p className='flex items-center gap-2'>
                                                        <Clock className='h-3.5 w-3.5 text-primary' />
                                                        {item.schedule}
                                                    </p>
                                                    <p className='flex items-center gap-2'>
                                                        <MapPin className='h-3.5 w-3.5 text-primary' />
                                                        {item.location}
                                                    </p>
                                                </TableCell>
                                                <TableCell className='align-top text-sm text-foreground'>
                                                    {item.service}
                                                </TableCell>
                                                <TableCell className='align-top text-center'>
                                                    <Badge
                                                        variant='outline'
                                                        className='border-border/50 bg-muted/10 text-xs text-muted-foreground'
                                                    >
                                                        {item.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className='align-top text-center'>
                                                    <Badge
                                                        className={
                                                            freelancerStatusBadgeStyles[
                                                                item.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            freelancerStatusLabels[
                                                                item.status
                                                            ]
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className='align-top text-right text-sm font-semibold text-foreground'>
                                                    {item.price}
                                                </TableCell>
                                                <TableCell className='align-top text-right'>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant='outline'
                                                                size='icon-sm'
                                                                className='border-border/60'
                                                                aria-label='Buka tindakan booking'
                                                            >
                                                                <PencilLine className='h-4 w-4' />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <BookingActionMenu
                                                            bookingSlug={
                                                                bookingSlug
                                                            }
                                                            telHref={telHref}
                                                            status={item.status}
                                                            handlePlaceholderAction={
                                                                handlePlaceholderAction
                                                            }
                                                        />
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableCaption>
                                    Data di-update otomatis dari aplikasi
                                    TrimTime. Pastikan status diperbarui agar
                                    pelanggan mendapat notifikasi realtime.
                                </TableCaption>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
