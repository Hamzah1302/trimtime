import Link from "next/link";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarClock,
    ClipboardCheck,
    Clock,
    XCircle,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    SquarePen,
    UserCheck,
    Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { bookingDetails } from "@/data/barber-booking";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const statusBadgeStyles = {
    pending: "bg-amber-500/15 text-amber-600",
    confirmed: "bg-primary/10 text-primary",
    ongoing: "bg-sky-500/15 text-sky-600",
    done: "bg-emerald-500/15 text-emerald-600",
    cancelled: "bg-destructive/10 text-destructive",
} satisfies Record<string, string>;

type ProgressStatusCardConfig = {
    icon: LucideIcon;
    title: string;
    description: string;
    surfaceClass: string;
    iconClass: string;
    primaryLabel?: string;
    primaryVariant:
        | "default"
        | "secondary"
        | "outline"
        | "destructive"
        | "ghost";
    secondaryLabel?: string;
    secondaryVariant:
        | "default"
        | "secondary"
        | "outline"
        | "destructive"
        | "ghost";
};

const progressStatusContent: Record<
    keyof typeof statusBadgeStyles,
    ProgressStatusCardConfig
> = {
    pending: {
        icon: Clock,
        title: "Menunggu konfirmasi",
        description:
            "Hubungi pelanggan atau kirim pengingat agar check-in tepat waktu.",
        surfaceClass:
            "border-amber-200/60 bg-amber-100/80 text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/10",
        iconClass:
            "bg-amber-500/20 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300",
        primaryLabel: "Konfirmasi kehadiran",
        primaryVariant: "default",
        secondaryLabel: "Kirim pengingat WhatsApp",
        secondaryVariant: "outline",
    },
    confirmed: {
        icon: BadgeCheck,
        title: "Booking terkonfirmasi",
        description:
            "Siapkan barber dan kursi terbaik. Tandai mulai layanan saat pelanggan tiba.",
        surfaceClass:
            "border-primary/40 bg-primary/10 text-primary-900 dark:border-primary/30 dark:bg-primary/15",
        iconClass:
            "bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary-100",
        primaryLabel: "Mulai sesi layanan",
        primaryVariant: "default",
        secondaryLabel: "Atur ulang barber/kursi",
        secondaryVariant: "outline",
    },
    ongoing: {
        icon: CalendarClock,
        title: "Layanan sedang berjalan",
        description:
            "Update progress tiap tahapan agar tim front desk dan owner sinkron.",
        surfaceClass:
            "border-sky-200/60 bg-sky-100/70 text-sky-900 dark:border-sky-400/40 dark:bg-sky-500/10",
        iconClass:
            "bg-sky-500/20 text-sky-700 dark:bg-sky-500/25 dark:text-sky-200",
        primaryLabel: "Tandai tahap berikutnya",
        primaryVariant: "default",
        secondaryLabel: "Tambah catatan layanan",
        secondaryVariant: "outline",
    },
    done: {
        icon: ClipboardCheck,
        title: "Layanan selesai",
        description:
            "Kirim permintaan rating dan rangkum pembayaran untuk tutup transaksi.",
        surfaceClass:
            "border-emerald-200/60 bg-emerald-100/70 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-500/10",
        iconClass:
            "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-200",
        primaryLabel: "Kirim permintaan rating",
        primaryVariant: "default",
        secondaryLabel: "Lihat ringkasan pembayaran",
        secondaryVariant: "outline",
    },
    cancelled: {
        icon: XCircle,
        title: "Booking dibatalkan",
        description:
            "Tawarkan jadwal pengganti atau catat sebagai no-show untuk laporan.",
        surfaceClass:
            "border-destructive/40 bg-destructive/10 text-destructive dark:border-destructive/50 dark:bg-destructive/20",
        iconClass:
            "bg-destructive/20 text-destructive dark:bg-destructive/30 dark:text-destructive-100",
        primaryLabel: "Jadwalkan ulang",
        primaryVariant: "outline",
        secondaryLabel: "Catat sebagai no-show",
        secondaryVariant: "ghost",
    },
} satisfies Record<
    keyof typeof statusBadgeStyles,
    {
        icon: LucideIcon;
        title: string;
        description: string;
        surfaceClass: string;
        iconClass: string;
        primaryLabel?: string;
        primaryVariant?:
            | "default"
            | "secondary"
            | "outline"
            | "destructive"
            | "ghost";
        secondaryLabel?: string;
        secondaryVariant?:
            | "default"
            | "secondary"
            | "outline"
            | "destructive"
            | "ghost";
    }
>;

type BarberBookingDetailPageProps = {
    params: Promise<{ id: string }>;
};

export default async function BarberBookingDetailPage({
    params,
}: BarberBookingDetailPageProps) {
    const { id } = await params;
    const bookingKey = id?.toLowerCase?.() ?? "";
    const booking = bookingDetails[bookingKey];
    const phoneDigits = booking?.customer.phone
        ? booking.customer.phone.replace(/\D/g, "")
        : "";
    const normalizedPhone = phoneDigits.startsWith("0")
        ? `62${phoneDigits.slice(1)}`
        : phoneDigits;
    const telHref = normalizedPhone ? `tel:+${normalizedPhone}` : undefined;
    const bookingBasePath = `/barber/booking/${id}`;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative flex flex-col gap-6'>
                    <div className='flex flex-wrap items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                            <Link
                                href='/barber/booking'
                                className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                            >
                                <ArrowLeft className='h-3.5 w-3.5' />
                                Kembali ke daftar booking
                            </Link>
                            <Badge
                                variant='outline'
                                className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                            >
                                Detail Booking
                            </Badge>
                        </div>
                        {booking ? (
                            <Badge
                                className={statusBadgeStyles[booking.status]}
                            >
                                {booking.statusLabel}
                            </Badge>
                        ) : null}
                    </div>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                        <div className='space-y-3'>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                {booking
                                    ? booking.customer.name
                                    : "Booking tidak ditemukan"}
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                {booking
                                    ? `Pantau status layanan dan kelola komunikasi pelanggan secara real-time.`
                                    : `Periksa kembali ID booking atau hubungi admin TrimTime.`}
                            </p>
                        </div>
                        {booking ? (
                            <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 bg-background/80'
                                >
                                    ID internal: {booking.id}
                                </Badge>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 bg-background/80'
                                >
                                    Invoice: {booking.externalId}
                                </Badge>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            <main className='space-y-7 px-5 py-6 lg:space-y-8 lg:px-8 lg:py-8'>
                {booking ? (
                    <>
                        <div className='grid cols-2 gap-8'>
                            <Card className='border-border/50 shadow-sm'>
                                <CardHeader className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='h-12 w-12 border border-border/50'>
                                            <AvatarImage
                                                src='/placeholder.jpg'
                                                alt={booking.customer.name}
                                            />
                                            <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                                {booking.customer.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className='text-xl font-semibold'>
                                                {booking.customer.name}
                                            </CardTitle>
                                            <CardDescription className='text-sm text-muted-foreground'>
                                                Pelanggan sejak{" "}
                                                {booking.customer.memberSince}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                        <div className='ml-auto flex flex-wrap items-center gap-2'>
                                            {[
                                                {
                                                    icon: Phone,
                                                    label: "Hubungi via telepon",
                                                    href: telHref,
                                                },
                                                {
                                                    icon: Send,
                                                    label: "Kirim pesan instan",
                                                    href: `${bookingBasePath}?action=send-message`,
                                                },
                                                {
                                                    icon: MessageCircle,
                                                    label: "Riwayat pesan",
                                                    href: `${bookingBasePath}/messages`,
                                                },
                                                {
                                                    icon: UserCheck,
                                                    label: "Konfirmasi kehadiran",
                                                    href: `${bookingBasePath}?action=confirm-attendance`,
                                                },
                                                {
                                                    icon: ClipboardCheck,
                                                    label: "Tandai check-in",
                                                    href: `${bookingBasePath}?action=mark-check-in`,
                                                },
                                                {
                                                    icon: SquarePen,
                                                    label: "Tambah catatan internal",
                                                    href: `${bookingBasePath}?action=add-note`,
                                                },
                                            ]
                                                .filter((action) => action.href)
                                                .map(
                                                    ({
                                                        icon: Icon,
                                                        label,
                                                        href,
                                                    }) => (
                                                        <Tooltip key={label}>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={href!}
                                                                    className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-muted/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary'
                                                                >
                                                                    <Icon className='h-4 w-4' />
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent side='top'>
                                                                {label}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className='space-y-6 text-sm text-muted-foreground'>
                                    <div className='grid gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 sm:grid-cols-2'>
                                        <div className='space-y-2'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Jadwal
                                            </p>
                                            <div className='space-y-1'>
                                                <p className='inline-flex items-center gap-2 text-sm font-semibold text-foreground'>
                                                    <CalendarClock className='h-4 w-4 text-primary' />
                                                    {booking.schedule.date}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <Clock className='h-4 w-4 text-primary' />
                                                    {booking.schedule.time} •{" "}
                                                    {booking.schedule.duration}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <MapPin className='h-4 w-4 text-primary' />
                                                    {booking.schedule.room}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Kontak pelanggan
                                            </p>
                                            <div className='space-y-1'>
                                                <p className='flex items-center gap-2'>
                                                    <Phone className='h-4 w-4 text-primary' />
                                                    {booking.customer.phone}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <MapPin className='h-4 w-4 text-primary' />
                                                    {booking.customer.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid gap-4 lg:grid-cols-1'>
                                        <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Layanan
                                            </p>
                                            <p className='mt-1 text-lg font-semibold text-foreground'>
                                                {booking.service.name}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                Barber: {booking.service.barber}
                                            </p>
                                            <Separator className='my-3' />
                                            <p className='text-xs leading-relaxed text-muted-foreground'>
                                                {booking.service.notes}
                                            </p>
                                        </div>
                                        <div
                                            id='payment'
                                            className='rounded-xl border border-border/40 bg-muted/20 p-4'
                                        >
                                            <div className='flex items-start justify-between mb-4'>
                                                <div>
                                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                        Pembayaran
                                                    </p>
                                                    <div className='flex items-center gap-2 mt-1'>
                                                        <Badge
                                                            variant={
                                                                booking.payment
                                                                    .status ===
                                                                "Lunas"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                            className={
                                                                booking.payment
                                                                    .status ===
                                                                "Lunas"
                                                                    ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20"
                                                                    : ""
                                                            }
                                                        >
                                                            {
                                                                booking.payment
                                                                    .status
                                                            }
                                                        </Badge>
                                                        <span className='text-xs text-muted-foreground'>
                                                            via{" "}
                                                            {
                                                                booking.payment
                                                                    .method
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {booking.payment.promoCode ? (
                                                    <Badge
                                                        variant='outline'
                                                        className='border-primary/40 bg-primary/10 text-[11px] uppercase tracking-widest text-primary'
                                                    >
                                                        Promo{" "}
                                                        {
                                                            booking.payment
                                                                .promoCode
                                                        }
                                                    </Badge>
                                                ) : null}
                                            </div>
                                            <div className='mt-3 space-y-2 text-sm text-muted-foreground'>
                                                {booking.payment.items.map(
                                                    (item) => (
                                                        <div
                                                            key={`payment-${item.name}`}
                                                            className='flex items-center justify-between'
                                                        >
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                            <span className='font-semibold text-foreground'>
                                                                {formatCurrency(
                                                                    item.price
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                                <Separator className='my-2' />
                                                <div className='flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground'>
                                                    <span>Subtotal</span>
                                                    <span className='text-sm font-semibold text-foreground'>
                                                        {formatCurrency(
                                                            booking.payment
                                                                .subtotal
                                                        )}
                                                    </span>
                                                </div>
                                                {booking.payment.discount >
                                                0 ? (
                                                    <div className='flex items-center justify-between text-xs uppercase tracking-widest text-emerald-600'>
                                                        <span>Diskon</span>
                                                        <span className='text-sm font-semibold'>
                                                            -
                                                            {formatCurrency(
                                                                booking.payment
                                                                    .discount
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                <div className='flex items-center justify-between border-t border-border/40 pt-3 text-sm font-semibold text-foreground'>
                                                    <span>Total</span>
                                                    <span>
                                                        {formatCurrency(
                                                            booking.payment
                                                                .total
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            {booking.payment.proofImage ? (
                                                <div className='mt-4 space-y-3'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                            Bukti Pembayaran
                                                        </p>
                                                        <p className='text-xs text-muted-foreground'>
                                                            Diunggah:{" "}
                                                            {
                                                                booking.payment
                                                                    .proofUploadedAt
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className='rounded-lg border border-border/30 bg-background/60 p-3'>
                                                        <div className='flex items-center justify-center h-48 bg-muted/50 rounded-md border border-dashed border-border/30'>
                                                            <div className='text-center space-y-2'>
                                                                <div className='w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center'>
                                                                    <Wallet className='h-6 w-6 text-primary' />
                                                                </div>
                                                                <p className='text-xs font-medium text-foreground'>
                                                                    Bukti
                                                                    Pembayaran
                                                                    QRIS
                                                                </p>
                                                                <p className='text-xs text-muted-foreground'>
                                                                    Screenshot
                                                                    transaksi
                                                                    berhasil
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='mt-4 rounded-lg border border-dashed border-border/50 bg-muted/30 p-4 text-center'>
                                                    <p className='text-xs text-muted-foreground'>
                                                        Bukti pembayaran belum
                                                        diunggah
                                                    </p>
                                                </div>
                                            )}

                                            <div className='mt-4 space-y-1 text-xs text-muted-foreground'>
                                                <p>
                                                    Tip: {booking.payment.tip}
                                                </p>
                                            </div>

                                            {booking.payment.status !==
                                                "Lunas" && (
                                                <div className='mt-4 flex flex-wrap gap-2'>
                                                    <Button
                                                        size='sm'
                                                        className='gap-2 text-xs'
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`${bookingBasePath}?action=confirm-payment`}
                                                            className='inline-flex items-center gap-2'
                                                        >
                                                            <Wallet className='h-3.5 w-3.5' />
                                                            Konfirmasi
                                                            pembayaran
                                                        </Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className='border-border/50 shadow-sm'>
                                <CardHeader className='space-y-2'>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Progress layanan
                                    </CardTitle>
                                    <CardDescription>
                                        Update status booking agar pelanggan
                                        menerima notifikasi realtime dari
                                        TrimTime.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-6 text-sm text-muted-foreground'>
                                    {(() => {
                                        const statusContent =
                                            progressStatusContent[
                                                booking.status
                                            ] ?? progressStatusContent.pending;
                                        const StatusIcon = statusContent.icon;
                                        return (
                                            <div className='flex w-full flex-col justify-center space-y-4 lg:self-center'>
                                                <div
                                                    className={cn(
                                                        "space-y-3 rounded-xl border p-4 shadow-sm transition",
                                                        statusContent.surfaceClass
                                                    )}
                                                >
                                                    <div className='flex items-start gap-3'>
                                                        <span
                                                            className={cn(
                                                                "flex h-10 w-10 items-center justify-center rounded-full",
                                                                statusContent.iconClass
                                                            )}
                                                        >
                                                            <StatusIcon className='h-5 w-5' />
                                                        </span>
                                                        <div className='space-y-1'>
                                                            <p className='text-sm font-semibold text-foreground'>
                                                                {
                                                                    statusContent.title
                                                                }
                                                            </p>
                                                            <p className='text-xs leading-relaxed'>
                                                                {
                                                                    statusContent.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='space-y-2'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='font-semibold text-foreground'>
                                                            {booking.progress}%
                                                            selesai
                                                        </p>
                                                        <Badge
                                                            variant='outline'
                                                            className='border-border/60'
                                                        >
                                                            Status:{" "}
                                                            {
                                                                booking.statusLabel
                                                            }
                                                        </Badge>
                                                    </div>
                                                    <Progress
                                                        value={booking.progress}
                                                    />
                                                </div>

                                                <div className='grid w-full gap-3'>
                                                    {statusContent.primaryLabel ? (
                                                        <Button
                                                            variant={
                                                                statusContent.primaryVariant ??
                                                                "default"
                                                            }
                                                            className={cn(
                                                                "w-full",
                                                                statusContent.primaryVariant ===
                                                                    "outline"
                                                                    ? "border-border/60"
                                                                    : undefined
                                                            )}
                                                        >
                                                            {
                                                                statusContent.primaryLabel
                                                            }
                                                        </Button>
                                                    ) : null}
                                                    {statusContent.secondaryLabel ? (
                                                        <Button
                                                            variant={
                                                                statusContent.secondaryVariant ??
                                                                "outline"
                                                            }
                                                            className={cn(
                                                                "w-full",
                                                                statusContent.secondaryVariant ===
                                                                    "outline"
                                                                    ? "border-border/60"
                                                                    : undefined
                                                            )}
                                                        >
                                                            {
                                                                statusContent.secondaryLabel
                                                            }
                                                        </Button>
                                                    ) : null}
                                                    {!statusContent.primaryLabel &&
                                                    !statusContent.secondaryLabel ? (
                                                        <Button className='w-full'>
                                                            {
                                                                booking.actionLabel
                                                            }
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                    <div className='space-y-4'>
                                        <div className='flex flex-wrap items-center justify-between gap-2'>
                                            <div>
                                                <p className='text-base font-semibold text-foreground'>
                                                    Timeline aktivitas
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    Riwayat otomatis dari sistem
                                                    booking TrimTime.
                                                </p>
                                            </div>
                                            <Badge
                                                variant='outline'
                                                className='border-border/60 bg-background/60 text-xs font-semibold uppercase tracking-widest text-muted-foreground'
                                            >
                                                Update realtime
                                            </Badge>
                                        </div>
                                        <div className='space-y-3'>
                                            {booking.timeline.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <div
                                                        key={`${item.time}-${item.title}`}
                                                        className='flex gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 text-muted-foreground'
                                                    >
                                                        <span className='mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                                                            <Icon className='h-4 w-4' />
                                                        </span>
                                                        <div className='flex-1 space-y-1'>
                                                            <div className='flex flex-wrap items-center gap-2'>
                                                                <p className='text-base font-semibold text-foreground'>
                                                                    {item.title}
                                                                </p>
                                                                <Badge
                                                                    variant='outline'
                                                                    className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                                                >
                                                                    {item.time}
                                                                </Badge>
                                                                {item.status ===
                                                                "upcoming" ? (
                                                                    <Badge className='bg-primary/15 text-primary'>
                                                                        Selanjutnya
                                                                    </Badge>
                                                                ) : null}
                                                            </div>
                                                            <p className='text-xs leading-relaxed'>
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                ) : (
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle>Booking tidak ditemukan</CardTitle>
                            <CardDescription>
                                ID booking yang kamu cari belum tercatat.
                                Silakan kembali ke daftar booking.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href='/barber/booking'>
                                    Kembali ke daftar booking
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </PageShell>
    );
}
