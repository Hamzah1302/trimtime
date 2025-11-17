import {
    BadgeCheck,
    CalendarCheck,
    CalendarClock,
    CheckCircle2,
    Clock,
    MessageCircle,
    PlayCircle,
    RefreshCcw,
    Route,
    SquarePen,
    Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const bookingSummary = [
    {
        label: "Menunggu konfirmasi",
        value: 2,
        helper: "Silakan validasi manual",
        icon: Clock,
    },
    {
        label: "Siap dimulai",
        value: 3,
        helper: "Barber standby di kursi",
        icon: CalendarCheck,
    },
    {
        label: "Home service aktif",
        value: 1,
        helper: "Pantau GPS secara berkala",
        icon: Truck,
    },
    {
        label: "Selesai hari ini",
        value: 4,
        helper: "Siap minta rating pelanggan",
        icon: CheckCircle2,
    },
] as const;

export const bookingList = [
    {
        id: "INV-9041",
        customer: "Dimas Saputra",
        initials: "DS",
        phone: "0812-8890-1122",
        schedule: "Selasa, 11 Feb • 09:00",
        location: "TrimTime HQ, SCBD",
        service: "Signature Fade + Steam",
        type: "On-site",
        status: "pending",
        price: "Rp 230.000",
    },
    {
        id: "INV-9042",
        customer: "Hafidz Rahman",
        initials: "HR",
        phone: "0813-2200-4422",
        schedule: "Selasa, 11 Feb • 10:30",
        location: "TrimTime HQ, SCBD",
        service: "Classic Cut & Beard Trim",
        type: "On-site",
        status: "confirmed",
        price: "Rp 185.000",
    },
    {
        id: "INV-9043",
        customer: "Reyhan Fadil",
        initials: "RF",
        phone: "0812-9988-7744",
        schedule: "Selasa, 11 Feb • 11:30",
        location: "Menara BCA Lt. 32",
        service: "Home Service Deluxe",
        type: "Home service",
        status: "ongoing",
        price: "Rp 320.000",
    },
    {
        id: "INV-9044",
        customer: "Vino Mahardika",
        initials: "VM",
        phone: "0813-6655-2200",
        schedule: "Selasa, 11 Feb • 13:00",
        location: "TrimTime HQ, SCBD",
        service: "Kids Haircut Package",
        type: "On-site",
        status: "done",
        price: "Rp 150.000",
    },
    {
        id: "INV-9045",
        customer: "Indra Syahputra",
        initials: "IS",
        phone: "0817-5522-3311",
        schedule: "Selasa, 11 Feb • 15:00",
        location: "Cluster Kemang Pratama",
        service: "Home Service Basic",
        type: "Home service",
        status: "cancelled",
        price: "Rp 210.000",
    },
] as const;

export const statusBadgeStyles = {
    pending: "bg-amber-500/15 text-amber-600",
    confirmed: "bg-primary/10 text-primary",
    ongoing: "bg-sky-500/15 text-sky-600",
    done: "bg-emerald-500/15 text-emerald-600",
    cancelled: "bg-destructive/15 text-destructive",
} as const satisfies Record<string, string>;

export type BookingStatus = (typeof bookingList)[number]["status"];

export const statusLabels: Record<BookingStatus, string> = {
    pending: "Menunggu konfirmasi",
    confirmed: "Sudah dikonfirmasi",
    ongoing: "Sedang berjalan",
    done: "Selesai",
    cancelled: "Dibatalkan",
};

export const queueTimeline = [
    {
        label: "Konsultasi & cuci rambut",
        time: "09:05",
        note: "Preferensi gaya sudah dicatat",
        status: "done",
    },
    {
        label: "Haircut utama",
        time: "09:20",
        note: "Sedang merapikan sisi kanan",
        status: "current",
    },
    {
        label: "Steam & styling",
        time: "09:35",
        note: "Siapkan produk pomade",
        status: "next",
    },
] as const;

export const queueTimelineStyles = {
    done: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
    current: "border-primary/40 bg-primary/10 text-primary",
    next: "border-border/50 bg-muted/20 text-muted-foreground",
} as const satisfies Record<string, string>;

export const queueLine = [
    {
        position: 1,
        id: "INV-9041",
        customer: "Dimas Saputra",
        service: "Signature Fade + Steam",
        start: "09:00",
        eta: "Selesai 09:40",
        status: "in-chair",
        chair: "Kursi 01",
    },
    {
        position: 2,
        id: "INV-9042",
        customer: "Hafidz Rahman",
        service: "Classic Cut & Beard Trim",
        start: "09:45",
        eta: "Mulai 10:30",
        status: "next-up",
        chair: "Kursi 01",
    },
    {
        position: 3,
        id: "INV-9043",
        customer: "Reyhan Fadil",
        service: "Home Service Deluxe",
        start: "11:30",
        eta: "Menunggu konfirmasi",
        status: "waiting",
        chair: "Fleet",
    },
    {
        position: 4,
        id: "INV-9045",
        customer: "Indra Syahputra",
        service: "Home Service Basic",
        start: "13:00",
        eta: "Menunggu konfirmasi",
        status: "waiting",
        chair: "Fleet",
    },
] as const;

export type QueueStatus = (typeof queueLine)[number]["status"];

export const queueStatusLabels: Record<QueueStatus, string> = {
    "in-chair": "Sedang dilayani",
    "next-up": "Berikutnya",
    waiting: "Menunggu giliran",
};

export const queueStatusBadgeStyles: Record<QueueStatus, string> = {
    "in-chair": "bg-emerald-500/15 text-emerald-600",
    "next-up": "bg-primary/10 text-primary",
    waiting: "bg-muted/30 text-muted-foreground",
};

export const statusActions: Record<
    BookingStatus,
    Array<{
        label: string;
        description?: string;
        icon: LucideIcon;
        href?: string;
    }>
> = {
    pending: [
        {
            label: "Konfirmasi booking",
            description: "Kirim pemberitahuan ke pelanggan",
            icon: CheckCircle2,
        },
        {
            label: "Catat kedatangan manual",
            description: "Gunakan jika pelanggan walk-in",
            icon: SquarePen,
        },
    ],
    confirmed: [
        {
            label: "Mulai layanan",
            description: "Tandai barber sudah memulai sesi",
            icon: PlayCircle,
        },
        {
            label: "Update status / reschedule",
            description: "Atur ulang waktu atau pindah barber",
            icon: RefreshCcw,
        },
    ],
    ongoing: [
        {
            label: "Kirim update ke pelanggan",
            description: "Beritahu progres layanan",
            icon: MessageCircle,
        },
        {
            label: "Tandai layanan selesai",
            description: "Tutup sesi dan buat ringkasan pembayaran",
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
            description: "Tambahkan highlight untuk riwayat",
            icon: SquarePen,
        },
    ],
    cancelled: [
        {
            label: "Jadwalkan ulang",
            description: "Tawarkan slot pengganti ke pelanggan",
            icon: RefreshCcw,
        },
        {
            label: "Catat sebagai no-show",
            description: "Tambahkan catatan laporan harian",
            icon: SquarePen,
        },
    ],
};


export type BookingTimelineEntry = {
    time: string;
    title: string;
    description: string;
    icon: LucideIcon;
    status?: "upcoming" | "completed"; // <-- TAMBAHKAN | "completed"
};

export type BookingDetail = {
    id: string;
    externalId: string;
    status: "pending" | "confirmed" | "ongoing" | "done" | "cancelled";
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
    timeline: BookingTimelineEntry[];
    progress: number;
    actionLabel: string;
};

export const bookingDetailList = [
    {
        key: "inv-9041",
        data: {
            id: "INV-9041",
            externalId: "TT-3021",
            status: "pending",
            statusLabel: "Menunggu check-in",
            customer: {
                name: "Dimas Saputra",
                initials: "DS",
                phone: "0812-8890-1122",
                location: "Menara BCA, Jakarta",
                memberSince: "Agustus 2023",
            },
            schedule: {
                date: "Selasa, 11 Feb 2025",
                time: "09:00 WIB",
                duration: "60 menit",
                room: "Kursi 2 • Area Signature Fade",
            },
            service: {
                name: "Signature Fade + Steam",
                barber: "Rama Putra",
                notes: "Tambahkan steam therapy 10 menit. Pelanggan suka finishing matte.",
                channel: "Walk-in",
            },
            payment: {
                items: [
                    { name: "Skin Fade Premium", price: 65000 },
                    { name: "Steam Therapy", price: 20000 },
                ],
                subtotal: 85000,
                discount: 8500,
                total: 76500,
                promoCode: "TRIM10",
                method: "QRIS",
                tip: "Belum diatur",
                status: "Lunas",
                proofImage: "/payment-proof-sample.jpg",
                proofUploadedAt: "11 Feb 2025, 08:45 WIB",
            },
            timeline: [
                {
                    time: "08:30",
                    title: "Reminder dikirim",
                    description:
                        "Sistem mengirim notifikasi WhatsApp otomatis ke pelanggan.",
                    icon: BadgeCheck,
                },
                {
                    time: "08:45",
                    title: "Check-in belum diterima",
                    description:
                        "Pelanggan belum konfirmasi kedatangan. Siapkan tim front desk.",
                    icon: Clock,
                },
                {
                    time: "09:00",
                    title: "Estimasi sesi dimulai",
                    description:
                        "Barber siap di kursi. Update status saat pelanggan tiba.",
                    icon: CalendarClock,
                    status: "upcoming",
                },
            ],
            progress: 25,
            actionLabel: "Konfirmasi kehadiran",
        } satisfies BookingDetail,
    },
    {
        key: "inv-9042",
        data: {
            id: "INV-9042",
            externalId: "TT-3021",
            status: "confirmed",
            statusLabel: "Sudah dikonfirmasi",
            customer: {
                name: "Dimas Saputra",
                initials: "DS",
                phone: "0812-8890-1122",
                location: "TrimTime HQ, SCBD",
                memberSince: "Agustus 2023",
            },
            schedule: {
                date: "Selasa, 11 Feb 2025",
                time: "09:00 WIB",
                duration: "60 menit",
                room: "Kursi 2 • Area Signature Fade",
            },
            service: {
                name: "Signature Fade + Steam",
                barber: "Rama Putra",
                notes: "Tambahkan steam therapy 10 menit. Pelanggan suka finishing matte.",
                channel: "Walk-in",
            },
            payment: {
                items: [
                    { name: "Skin Fade Premium", price: 65000 },
                    { name: "Steam Therapy", price: 20000 },
                ],
                subtotal: 85000,
                discount: 8500,
                total: 76500,
                promoCode: "TRIM10",
                method: "QRIS",
                tip: "Belum diatur",
                status: "Lunas",
                proofImage: "/payment-proof-sample.jpg",
                proofUploadedAt: "11 Feb 2025, 08:45 WIB",
            },
            timeline: [
                {
                    time: "08:30",
                    title: "Reminder dikirim",
                    description:
                        "Sistem mengirim notifikasi WhatsApp otomatis ke pelanggan.",
                    icon: BadgeCheck,
                },
                {
                    time: "08:45",
                    title: "Check-in belum diterima",
                    description:
                        "Pelanggan belum konfirmasi kedatangan. Siapkan tim front desk.",
                    icon: Clock,
                },
                {
                    time: "09:00",
                    title: "Estimasi sesi dimulai",
                    description:
                        "Barber siap di kursi. Update status saat pelanggan tiba.",
                    icon: CalendarClock,
                    status: "upcoming",
                },
            ],
            progress: 35,
            actionLabel: "Mulai layanan",
        } satisfies BookingDetail,
    },
    {
        key: "inv-9043",
        data: {
            id: "INV-9043",
            externalId: "TT-3022",
            status: "ongoing",
            statusLabel: "Layanan sedang berjalan",
            customer: {
                name: "Hafidz Rahman",
                initials: "HR",
                phone: "0813-2200-4422",
                location: "Apartemen Sudirman Park",
                memberSince: "Oktober 2022",
            },
            schedule: {
                date: "Selasa, 11 Feb 2025",
                time: "10:30 WIB",
                duration: "75 menit",
                room: "Kursi 3 • Area Classic",
            },
            service: {
                name: "Classic Cut & Beard Trim",
                barber: "Dimas Arya",
                notes: "Gunakan kelim pendek dan beard trim rapi.",
                channel: "Aplikasi",
            },
            payment: {
                items: [
                    { name: "Classic Cut", price: 55000 },
                    { name: "Beard Trim", price: 25000 },
                ],
                subtotal: 80000,
                discount: 0,
                total: 80000,
                method: "Cashless",
                tip: "Rp 10.000",
                status: "Belum dibayar",
            },
            timeline: [
                {
                    time: "10:15",
                    title: "Check-in",
                    description: "Pelanggan sudah duduk di kursi.",
                    icon: BadgeCheck,
                },
                {
                    time: "10:35",
                    title: "Haircut utama",
                    description: "Sedang merapikan bagian samping kiri.",
                    icon: Clock,
                },
                {
                    time: "11:00",
                    title: "Beard trim",
                    description: "Gunakan razor finishing.",
                    icon: CalendarClock,
                    status: "upcoming",
                },
            ],
            progress: 55,
            actionLabel: "Tandai tahap berikutnya",
        } satisfies BookingDetail,
    },
    {
        key: "inv-9044",
        data: {
            id: "INV-9044",
            externalId: "TT-3023",
            status: "done",
            statusLabel: "Layanan selesai",
            customer: {
                name: "Reyhan Fadil",
                initials: "RF",
                phone: "0812-9988-7744",
                location: "Menara BCA Lt. 32",
                memberSince: "Januari 2021",
            },
            schedule: {
                date: "Selasa, 11 Feb 2025",
                time: "11:30 WIB",
                duration: "90 menit",
                room: "Home Service Fleet",
            },
            service: {
                name: "Home Service Deluxe",
                barber: "Rama Putra",
                notes: "Tambahkan spa steam sebelum styling.",
                channel: "Home Service",
            },
            payment: {
                items: [
                    { name: "Deluxe Package", price: 280000 },
                    { name: "Steam Spa", price: 40000 },
                ],
                subtotal: 320000,
                discount: 0,
                total: 320000,
                method: "Transfer",
                tip: "Rp 25.000",
                status: "Lunas",
            },
            timeline: [
                {
                    time: "11:15",
                    title: "Berangkat",
                    description: "Barber menuju lokasi pelanggan.",
                    icon: Route,
                },
                {
                    time: "11:35",
                    title: "Tiba di lokasi",
                    description: "Pelanggan menyambut di lobby tower.",
                    icon: BadgeCheck,
                },
                {
                    time: "13:00",
                    title: "Layanan selesai",
                    description: "Siap mengirim ringkasan perawatan.",
                    icon: CalendarClock,
                },
            ],
            progress: 100,
            actionLabel: "Kirim permintaan rating",
        } satisfies BookingDetail,
    },
    {
        key: "inv-9045",
        data: {
            id: "INV-9045",
            externalId: "TT-3024",
            status: "cancelled",
            statusLabel: "Booking dibatalkan",
            customer: {
                name: "Indra Syahputra",
                initials: "IS",
                phone: "0817-5522-3311",
                location: "Cluster Kemang Pratama",
                memberSince: "Juli 2022",
            },
            schedule: {
                date: "Selasa, 11 Feb 2025",
                time: "15:00 WIB",
                duration: "75 menit",
                room: "Home Service Fleet",
            },
            service: {
                name: "Home Service Basic",
                barber: "Rama Putra",
                notes: "Hubungi security cluster sebelum masuk area.",
                channel: "Home Service",
            },
            payment: {
                items: [{ name: "Home Service Basic", price: 210000 }],
                subtotal: 210000,
                discount: 0,
                total: 210000,
                method: "-",
                tip: "-",
                status: "Belum dibayar",
            },
            timeline: [
                {
                    time: "14:30",
                    title: "Reminder dikirim",
                    description: "Notifikasi otomatis terkirim ke pelanggan.",
                    icon: MessageCircle,
                },
                {
                    time: "14:50",
                    title: "Tidak ada respon",
                    description:
                        "Pelanggan tidak menjawab panggilan konfirmasi.",
                    icon: Clock,
                },
                {
                    time: "15:15",
                    title: "Dibatalkan",
                    description: "Front desk menandai sebagai no-show.",
                    icon: CalendarClock,
                },
            ],
            progress: 0,
            actionLabel: "Jadwalkan ulang",
        } satisfies BookingDetail,
    },
] as const;

export const bookingDetails = bookingDetailList.reduce<
    Record<string, BookingDetail>
>((acc, { key, data }) => {
    acc[key] = data;
    return acc;
}, {});
