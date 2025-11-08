import Link from "next/link";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarClock,
    ClipboardCheck,
    Clock,
    History,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
    SquarePen,
    UserCheck,
    UserRound,
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
import { Separator } from "@/components/ui/separator";

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

type BookingDetail = {
    id: string;
    externalId: string;
    status: keyof typeof statusBadgeStyles;
    statusLabel: string;
    customer: {
        name: string;
        initials: string;
        phone: string;
        location: string;
        memberSince: string;
    };
    schedule: {
        date: string;
        time: string;
        duration: string;
        room: string;
    };
    service: {
        name: string;
        freelancer: string;
        notes: string;
        channel: string;
    };
    payment: {
        items: Array<{ name: string; price: number }>;
        subtotal: number;
        discount: number;
        total: number;
        promoCode?: string;
        method: string;
        tip: string;
        status: string;
    };
    timeline: Array<{
        time: string;
        title: string;
        description: string;
        icon: typeof CalendarClock;
        status?: "upcoming";
    }>;
    progress: number;
    actionLabel: string;
};

const bookingDetails: Record<string, BookingDetail> = {
    "hs-9921": {
        id: "HS-9921",
        externalId: "INV-HS-9921",
        status: "pending",
        statusLabel: "Menunggu konfirmasi keberangkatan",
        customer: {
            name: "Mira Aulia",
            initials: "MA",
            phone: "0812-8890-1122",
            location: "Verde 2 Residence, Kuningan",
            memberSince: "Januari 2024",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "08:30 WIB",
            duration: "45 menit",
            room: "Lobby Verde 2 • akses lift tamu",
        },
        service: {
            name: "Signature Home Grooming",
            freelancer: "Naya Pratama",
            notes: "Bawa kursi lipat & cape ekstra. Pelanggan minta styling matte.",
            channel: "Home visit",
        },
        payment: {
            items: [
                { name: "Signature Home Grooming", price: 320000 },
                { name: "Biaya perjalanan zona 2", price: 40000 },
            ],
            subtotal: 360000,
            discount: 0,
            total: 360000,
            method: "Transfer saat sesi selesai",
            tip: "Belum diatur",
            status: "Menunggu konfirmasi pelanggan",
        },
        timeline: [
            {
                time: "07:45",
                title: "Reminder dikirim",
                description:
                    "Sistem mengirim WhatsApp otomatis ke pelanggan terkait estimasi kedatangan.",
                icon: BadgeCheck,
            },
            {
                time: "08:00",
                title: "Freelancer standby",
                description:
                    "Periksa alat portable & pastikan alamat sudah di-set di maps.",
                icon: Clock,
            },
            {
                time: "08:20",
                title: "Estimasi berangkat",
                description:
                    "Update status begitu meninggalkan basecamp agar pelanggan siap menerima.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 25,
        actionLabel: "Konfirmasi keberangkatan",
    },
    "hs-9922": {
        id: "HS-9922",
        externalId: "INV-HS-9922",
        status: "confirmed",
        statusLabel: "Siap mulai di kantor klien",
        customer: {
            name: "Satrio Pramana",
            initials: "SP",
            phone: "0813-2200-4422",
            location: "CoHive Citylofts, Sudirman",
            memberSince: "Mei 2023",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "10:00 WIB",
            duration: "40 menit",
            room: "Ruang rapat Lantai 3 • akses resepsionis",
        },
        service: {
            name: "Office Pop-up Session",
            freelancer: "Naya Pratama",
            notes: "Client minta latar belakang branding untuk konten reels kantor.",
            channel: "Office event",
        },
        payment: {
            items: [
                { name: "Office Pop-up Session", price: 275000 },
                { name: "Transport zona 1", price: 30000 },
            ],
            subtotal: 305000,
            discount: 5000,
            total: 300000,
            promoCode: "LOYAL5",
            method: "QRIS kantor",
            tip: "Belum diatur",
            status: "Siap ditagihkan",
        },
        timeline: [
            {
                time: "09:20",
                title: "Peralatan siap",
                description:
                    "Blow dryer portable & micellar spray sudah dicek.",
                icon: BadgeCheck,
            },
            {
                time: "09:40",
                title: "Menuju lokasi",
                description: "Perjalanan menuju Sudirman ± 15 menit.",
                icon: Clock,
            },
            {
                time: "09:55",
                title: "Briefing resepsionis",
                description: "Serah terima kartu akses lalu mulai setup.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 55,
        actionLabel: "Mulai sesi kantor",
    },
    "hs-9923": {
        id: "HS-9923",
        externalId: "INV-HS-9923",
        status: "ongoing",
        statusLabel: "Home service sedang berjalan",
        customer: {
            name: "Reyhan Fadil",
            initials: "RF",
            phone: "0812-9988-7744",
            location: "Menara BCA Lt. 32",
            memberSince: "Juli 2022",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "12:30 WIB",
            duration: "60 menit",
            room: "Lift karyawan • parkir B2 disediakan",
        },
        service: {
            name: "Executive Home Service",
            freelancer: "Naya Pratama",
            notes: "Tambahkan essential oil favorit pelanggan & foto progress.",
            channel: "Home visit",
        },
        payment: {
            items: [
                { name: "Executive Home Service", price: 420000 },
                { name: "Biaya perjalanan zona 2", price: 40000 },
            ],
            subtotal: 460000,
            discount: 20000,
            total: 440000,
            promoCode: "TRIM10",
            method: "E-wallet (dibayar di awal)",
            tip: "Belum diatur",
            status: "Dalam sesi",
        },
        timeline: [
            {
                time: "12:10",
                title: "Check-in keamanan",
                description:
                    "Kartu visitor sudah di-scan, tinggal naik ke lantai 32.",
                icon: BadgeCheck,
            },
            {
                time: "12:25",
                title: "Setup alat",
                description: "Mat ras & lighting portable sudah siap.",
                icon: Clock,
            },
            {
                time: "12:30",
                title: "Sesi dimulai",
                description: "Update status selesai jika layanan rampung.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 70,
        actionLabel: "Tandai sesi selesai",
    },
    "hs-9924": {
        id: "HS-9924",
        externalId: "INV-HS-9924",
        status: "done",
        statusLabel: "Selesai • siap minta rating",
        customer: {
            name: "Vino Mahardika",
            initials: "VM",
            phone: "0813-6655-2200",
            location: "Apartemen Botanica, Permata Hijau",
            memberSince: "September 2021",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "15:00 WIB",
            duration: "90 menit",
            room: "Tower Selatan • akses lobby private",
        },
        service: {
            name: "Family Grooming Pack",
            freelancer: "Naya Pratama",
            notes: "2 dewasa + 1 anak. Sediakan cape anak & boneka kecil.",
            channel: "Home visit",
        },
        payment: {
            items: [
                { name: "Family Grooming Pack", price: 540000 },
                { name: "Biaya perjalanan zona 3", price: 50000 },
            ],
            subtotal: 590000,
            discount: 0,
            total: 590000,
            method: "Transfer full (DP lunas)",
            tip: "Rp 50.000 (tunai)",
            status: "Sudah dibayar",
        },
        timeline: [
            {
                time: "14:45",
                title: "Sesi berakhir",
                description: "Pelanggan menyetujui hasil styling.",
                icon: BadgeCheck,
            },
            {
                time: "14:50",
                title: "Peralatan dibersihkan",
                description: "Semua cape & alat disteril ulang.",
                icon: Clock,
            },
            {
                time: "14:55",
                title: "Kirim permintaan rating",
                description: "Reminder otomatis akan terkirim via WhatsApp.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 100,
        actionLabel: "Kirim permintaan rating",
    },
    "hs-9925": {
        id: "HS-9925",
        externalId: "INV-HS-9925",
        status: "pending",
        statusLabel: "Menunggu DP pelanggan",
        customer: {
            name: "Indra Syahputra",
            initials: "IS",
            phone: "0817-5522-3311",
            location: "Cluster Kemang Pratama",
            memberSince: "November 2023",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "17:00 WIB",
            duration: "45 menit",
            room: "Pos keamanan • akses mobil disediakan",
        },
        service: {
            name: "Nomad Groom Basic",
            freelancer: "Naya Pratama",
            notes: "Klien baru, minta dokumentasi foto sebelum-sesudah.",
            channel: "Home visit",
        },
        payment: {
            items: [{ name: "Nomad Groom Basic", price: 280000 }],
            subtotal: 280000,
            discount: 0,
            total: 280000,
            method: "DP 50% via transfer",
            tip: "Belum diatur",
            status: "Menunggu DP",
        },
        timeline: [
            {
                time: "16:00",
                title: "Reminder DP",
                description: "Sistem mengirim link pembayaran otomatis.",
                icon: BadgeCheck,
            },
            {
                time: "16:20",
                title: "Tunggu konfirmasi",
                description: "Hubungi pelanggan jika belum respon.",
                icon: Clock,
            },
            {
                time: "16:40",
                title: "Estimasi berangkat",
                description: "Aktif segera setelah DP masuk.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 15,
        actionLabel: "Verifikasi DP",
    },
};

type FreelancerBookingDetailPageProps = {
    params: Promise<{ id: string }>;
};

export default async function FreelancerBookingDetailPage({
    params,
}: FreelancerBookingDetailPageProps) {
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
    const bookingBasePath = `/freelancer/jobs/${id}`;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative flex flex-col gap-6'>
                    <div className='flex flex-wrap items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                            <Link
                                href='/freelancer/jobs'
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
                        <div className='grid cols-1 gap-8'>
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
                                        <Badge
                                            variant='outline'
                                            className='border-border/50'
                                        >
                                            <UserRound className='mr-1.5 h-3.5 w-3.5 text-primary' />
                                            {booking.service.channel}
                                        </Badge>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50'
                                        >
                                            <ShieldCheck className='mr-1.5 h-3.5 w-3.5 text-primary' />
                                            Priority client
                                        </Badge>
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

                                    <div className='rounded-xl border border-border/40 bg-background/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
                                        <div className='space-y-1.5'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Aksi cepat
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                Kelola komunikasi dan update
                                                status pelanggan langsung dari
                                                dashboard freelancer.
                                            </p>
                                        </div>
                                        <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                                            {telHref ? (
                                                <Button
                                                    size='sm'
                                                    variant='outline'
                                                    className='border-border/60 justify-start gap-2 text-xs'
                                                    asChild
                                                >
                                                    <a
                                                        href={telHref}
                                                        className='inline-flex items-center gap-2'
                                                    >
                                                        <Phone className='h-3.5 w-3.5' />
                                                        Hubungi via telepon
                                                    </a>
                                                </Button>
                                            ) : null}
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=send-message`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <Send className='h-3.5 w-3.5' />
                                                    Kirim pesan instan
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}/messages`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <MessageCircle className='h-3.5 w-3.5' />
                                                    Riwayat pesan
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=confirm-attendance`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <UserCheck className='h-3.5 w-3.5' />
                                                    Konfirmasi kehadiran
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=mark-check-in`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <ClipboardCheck className='h-3.5 w-3.5' />
                                                    Tandai check-in
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=add-note`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <SquarePen className='h-3.5 w-3.5' />
                                                    Tambah catatan internal
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='grid gap-4 lg:grid-cols-2'>
                                        <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Layanan
                                            </p>
                                            <p className='mt-1 text-lg font-semibold text-foreground'>
                                                {booking.service.name}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                Freelancer:{" "}
                                                {booking.service.freelancer}
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
                                            <div className='flex items-start justify-between'>
                                                <div>
                                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                        Pembayaran
                                                    </p>
                                                    <p className='mt-1 text-xs text-muted-foreground'>
                                                        Status:{" "}
                                                        {booking.payment.status}
                                                    </p>
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
                                            <div className='mt-3 space-y-1 text-xs text-muted-foreground'>
                                                <p>
                                                    Metode:{" "}
                                                    {booking.payment.method}
                                                </p>
                                                <p>
                                                    Tip: {booking.payment.tip}
                                                </p>
                                            </div>
                                            <div className='mt-3 flex flex-wrap gap-2'>
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
                                                        Konfirmasi pembayaran
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size='sm'
                                                    variant='outline'
                                                    className='border-border/60 gap-2 text-xs'
                                                    asChild
                                                >
                                                    <Link
                                                        href={`${bookingBasePath}?action=view-transactions#payment`}
                                                        className='inline-flex items-center gap-2'
                                                    >
                                                        <History className='h-3.5 w-3.5' />
                                                        Lihat riwayat transaksi
                                                    </Link>
                                                </Button>
                                            </div>
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
                                <CardContent className='space-y-4 text-sm text-muted-foreground'>
                                    <div className='space-y-2'>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-semibold text-foreground'>
                                                {booking.progress}% selesai
                                            </p>
                                            <Badge
                                                variant='outline'
                                                className='border-border/60'
                                            >
                                                Status: {booking.statusLabel}
                                            </Badge>
                                        </div>
                                        <Progress value={booking.progress} />
                                    </div>
                                    <div className='grid gap-3'>
                                        <Button>{booking.actionLabel}</Button>
                                        <Button
                                            variant='outline'
                                            className='border-border/60'
                                        >
                                            Tandai selesai & kirim permintaan
                                            rating
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                                <div>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Timeline aktivitas
                                    </CardTitle>
                                    <CardDescription>
                                        Riwayat otomatis dari sistem booking
                                        TrimTime.
                                    </CardDescription>
                                </div>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 bg-background/60 text-xs font-semibold uppercase tracking-widest text-muted-foreground'
                                >
                                    Update realtime
                                </Badge>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {booking.timeline.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={`${item.time}-${item.title}`}
                                            className='flex gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 text-sm text-muted-foreground'
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
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
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
                                <Link href='/freelancer/jobs'>
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
