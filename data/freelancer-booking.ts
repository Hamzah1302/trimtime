import {
    BadgeCheck,
    CalendarClock,
    CheckCircle2,
    Clock,
    MessageCircle,
    RefreshCcw,
    Route,
    SquarePen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const freelancerBookingSummary = [
    {
        label: "Menunggu konfirmasi",
        value: 2,
        helper: "Siapkan perlengkapan sebelum berangkat",
        icon: Clock,
    },
    {
        label: "Sedang OTW",
        value: 1,
        helper: "Pantau estimasi jarak & ongkir",
        icon: Route,
    },
    {
        label: "Home service aktif",
        value: 1,
        helper: "Update progres layanan real-time",
        icon: CalendarClock,
    },
    {
        label: "Selesai hari ini",
        value: 3,
        helper: "Siap kirim ringkasan & rating",
        icon: CheckCircle2,
    },
] as const;

export const freelancerBookingList = [
    {
        id: "HS-9921",
        customer: "Mira Aulia",
        initials: "MA",
        phone: "0812-8890-1122",
        schedule: "Selasa, 11 Feb • 08:30",
        location: "Verde 2 Residence, Kuningan",
        service: "Signature Home Grooming",
        type: "Home visit",
        status: "pending",
        price: "Rp 360.000",
    },
    {
        id: "HS-9922",
        customer: "Satrio Pramana",
        initials: "SP",
        phone: "0813-2200-4422",
        schedule: "Selasa, 11 Feb • 10:00",
        location: "CoHive Citylofts, Sudirman",
        service: "Office Pop-up Session",
        type: "Office event",
        status: "confirmed",
        price: "Rp 300.000",
    },
    {
        id: "HS-9923",
        customer: "Reyhan Fadil",
        initials: "RF",
        phone: "0812-9988-7744",
        schedule: "Selasa, 11 Feb • 12:30",
        location: "Menara BCA Lt. 32",
        service: "Executive Home Service",
        type: "Home visit",
        status: "ongoing",
        price: "Rp 440.000",
    },
    {
        id: "HS-9924",
        customer: "Vino Mahardika",
        initials: "VM",
        phone: "0813-6655-2200",
        schedule: "Selasa, 11 Feb • 15:00",
        location: "Apartemen Botanica, Permata Hijau",
        service: "Family Grooming Pack",
        type: "Home visit",
        status: "done",
        price: "Rp 590.000",
    },
    {
        id: "HS-9925",
        customer: "Indra Syahputra",
        initials: "IS",
        phone: "0817-5522-3311",
        schedule: "Selasa, 11 Feb • 17:00",
        location: "Cluster Kemang Pratama",
        service: "Nomad Groom Basic",
        type: "Home visit",
        status: "pending",
        price: "Rp 280.000",
    },
    {
        id: "HS-9926",
        customer: "Ivana Permata",
        initials: "IP",
        phone: "0812-7788-6611",
        schedule: "Rabu, 12 Feb • 09:00",
        location: "Apartemen Pakubuwono Residence",
        service: "Premium Home Styling",
        type: "Home visit",
        status: "cancelled",
        price: "Rp 390.000",
    },
] as const;

export const freelancerStatusBadgeStyles = {
    pending: "bg-amber-500/15 text-amber-600",
    confirmed: "bg-primary/10 text-primary",
    ongoing: "bg-sky-500/15 text-sky-600",
    done: "bg-emerald-500/15 text-emerald-600",
    cancelled: "bg-destructive/15 text-destructive",
} as const satisfies Record<string, string>;

export type FreelancerBookingStatus =
    (typeof freelancerBookingList)[number]["status"];

export const freelancerStatusLabels: Record<FreelancerBookingStatus, string> = {
    pending: "Menunggu konfirmasi",
    confirmed: "Sudah dikonfirmasi",
    ongoing: "Sedang berjalan",
    done: "Selesai",
    cancelled: "Dibatalkan",
};

export const freelancerQueueTimeline = [
    {
        label: "Peralatan disterilkan",
        time: "08:00",
        note: "Kit portable siap dimasukkan ke luggage",
        status: "done",
    },
    {
        label: "Dalam perjalanan",
        time: "08:15",
        note: "Motor menuju lokasi pelanggan",
        status: "current",
    },
    {
        label: "Setup area layanan",
        time: "08:25",
        note: "Pasang mat dan ring light",
        status: "next",
    },
] as const;

export const freelancerQueueTimelineStyles = {
    done: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
    current: "border-primary/40 bg-primary/10 text-primary",
    next: "border-border/50 bg-muted/20 text-muted-foreground",
} as const satisfies Record<string, string>;

export const freelancerQueueLine = [
    {
        position: 1,
        id: "HS-9923",
        customer: "Reyhan Fadil",
        service: "Executive Home Service",
        start: "12:30",
        eta: "Selesai 13:30",
        status: "in-chair",
        chair: "Fleet 01",
    },
    {
        position: 2,
        id: "HS-9924",
        customer: "Vino Mahardika",
        service: "Family Grooming Pack",
        start: "15:00",
        eta: "Mulai 15:00",
        status: "next-up",
        chair: "Fleet 01",
    },
    {
        position: 3,
        id: "HS-9925",
        customer: "Indra Syahputra",
        service: "Nomad Groom Basic",
        start: "17:00",
        eta: "Menunggu DP",
        status: "waiting",
        chair: "Fleet 02",
    },
] as const;

export type FreelancerQueueStatus =
    (typeof freelancerQueueLine)[number]["status"];

export const freelancerQueueStatusLabels: Record<
    FreelancerQueueStatus,
    string
> = {
    "in-chair": "Sedang dilayani",
    "next-up": "Berikutnya",
    waiting: "Menunggu giliran",
};

export const freelancerQueueStatusBadgeStyles: Record<
    FreelancerQueueStatus,
    string
> = {
    "in-chair": "bg-emerald-500/15 text-emerald-600",
    "next-up": "bg-primary/10 text-primary",
    waiting: "bg-muted/30 text-muted-foreground",
};

export const freelancerStatusActions: Record<
    FreelancerBookingStatus,
    Array<{
        label: string;
        description?: string;
        icon: LucideIcon;
        href?: string;
    }>
> = {
    pending: [
        {
            label: "Konfirmasi keberangkatan",
            description: "Hubungi pelanggan untuk memastikan akses",
            icon: CheckCircle2,
        },
        {
            label: "Catat alamat tambahan",
            description: "Tambahkan instruksi security/lift",
            icon: SquarePen,
        },
    ],
    confirmed: [
        {
            label: "Mulai perjalanan",
            description: "Tandai status OTW agar pelanggan mendapat notifikasi",
            icon: Route,
        },
        {
            label: "Update jadwal",
            description: "Reschedule atau ganti freelancer cadangan",
            icon: RefreshCcw,
        },
    ],
    ongoing: [
        {
            label: "Kirim update progres",
            description: "Beritahu pelanggan tiap tahapan layanan",
            icon: MessageCircle,
        },
        {
            label: "Tandai layanan selesai",
            description: "Siapkan ringkasan pembayaran",
            icon: BadgeCheck,
        },
    ],
    done: [
        {
            label: "Kirim permintaan rating",
            description: "Minta feedback otomatis",
            icon: MessageCircle,
        },
        {
            label: "Catatan layanan manual",
            description: "Simpan highlight untuk riwayat pelanggan",
            icon: SquarePen,
        },
    ],
    cancelled: [
        {
            label: "Jadwalkan ulang",
            description: "Tawarkan slot pengganti",
            icon: RefreshCcw,
        },
        {
            label: "Catat sebagai no-show",
            description: "Tambahkan ke laporan harian",
            icon: SquarePen,
        },
    ],
};

export type FreelancerBookingTimelineEntry = {
    time: string;
    title: string;
    description: string;
    icon: LucideIcon;
    status?: "upcoming";
};

export type FreelancerBookingDetail = {
    id: string;
    externalId: string;
    status: FreelancerBookingStatus;
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
        barber: string;
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
        proofImage?: string;
        proofUploadedAt?: string;
    };
    timeline: FreelancerBookingTimelineEntry[];
    progress: number;
    actionLabel: string;
};

export const freelancerBookingDetailList = [
    {
        key: "hs-9921",
        data: {
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
                barber: "Naya Pratama",
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
        } satisfies FreelancerBookingDetail,
    },
    {
        key: "hs-9922",
        data: {
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
                barber: "Naya Pratama",
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
        } satisfies FreelancerBookingDetail,
    },
    {
        key: "hs-9923",
        data: {
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
                barber: "Naya Pratama",
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
        } satisfies FreelancerBookingDetail,
    },
    {
        key: "hs-9924",
        data: {
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
                barber: "Naya Pratama",
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
                    description:
                        "Reminder otomatis akan terkirim via WhatsApp.",
                    icon: CalendarClock,
                    status: "upcoming",
                },
            ],
            progress: 100,
            actionLabel: "Kirim permintaan rating",
        } satisfies FreelancerBookingDetail,
    },
    {
        key: "hs-9925",
        data: {
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
                barber: "Naya Pratama",
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
        } satisfies FreelancerBookingDetail,
    },
    {
        key: "hs-9926",
        data: {
            id: "HS-9926",
            externalId: "INV-HS-9926",
            status: "cancelled",
            statusLabel: "Dibatalkan oleh pelanggan",
            customer: {
                name: "Ivana Permata",
                initials: "IP",
                phone: "0812-7788-6611",
                location: "Apartemen Pakubuwono Residence",
                memberSince: "April 2022",
            },
            schedule: {
                date: "Rabu, 12 Feb 2025",
                time: "09:00 WIB",
                duration: "50 menit",
                room: "Lobby utama • akses tamu",
            },
            service: {
                name: "Premium Home Styling",
                barber: "Naya Pratama",
                notes: "Butuh hair spa singkat sebelum styling final.",
                channel: "Home visit",
            },
            payment: {
                items: [
                    { name: "Premium Home Styling", price: 350000 },
                    { name: "Travel fee zona 2", price: 40000 },
                ],
                subtotal: 390000,
                discount: 0,
                total: 390000,
                method: "Belum dibayar",
                tip: "Belum diatur",
                status: "Dibatalkan",
            },
            timeline: [
                {
                    time: "08:00",
                    title: "DP belum diterima",
                    description: "Sistem mengirim pengingat pembayaran.",
                    icon: BadgeCheck,
                },
                {
                    time: "08:15",
                    title: "Pelanggan merespon",
                    description:
                        "Meminta pembatalan karena jadwal berubah mendadak.",
                    icon: Clock,
                },
                {
                    time: "08:20",
                    title: "Dibatalkan",
                    description: "Admin mencatat status no-show ringan.",
                    icon: CalendarClock,
                },
            ],
            progress: 0,
            actionLabel: "Tawarkan slot pengganti",
        } satisfies FreelancerBookingDetail,
    },
] as const;

export const freelancerBookingDetails = freelancerBookingDetailList.reduce<
    Record<string, FreelancerBookingDetail>
>((acc, { key, data }) => {
    acc[key] = data;
    return acc;
}, {});
