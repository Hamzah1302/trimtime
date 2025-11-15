export type OwnerPromoStatus = "Aktif" | "Terjadwal" | "Nonaktif" | "Selesai";

export type OwnerPromoMetric = {
    label: string;
    value: string;
    helper?: string;
};

export type OwnerPromoTimelineEvent = {
    label: string;
    value: string;
};

export type OwnerPromo = {
    slug: string;
    id: string;
    name: string;
    channel: string;
    period: {
        start: string;
        end: string;
        label: string;
    };
    target: string;
    status: OwnerPromoStatus;
    discountType: string;
    discountValue: string;
    minTransaction: string;
    quota: string;
    description: string;
    publishToApp: boolean;
    segments: string[];
    branchCoverage: string[];
    metrics: OwnerPromoMetric[];
    timeline: OwnerPromoTimelineEvent[];
    benefits: string[];
    notes?: string;
};

export type OwnerPromoStat = {
    label: string;
    value: string;
    helper: string;
};

export const ownerPromos: OwnerPromo[] = [
    {
        slug: "payday-fade-20",
        id: "PROMO-PAYDAY-20",
        name: "Payday Fade 20%",
        channel: "App user",
        period: {
            start: "2025-01-25",
            end: "2025-01-30",
            label: "25 Jan - 30 Jan 2025",
        },
        target: "Semua pelanggan",
        status: "Aktif",
        discountType: "Diskon persentase",
        discountValue: "20%",
        minTransaction: "Rp 150.000",
        quota: "500 klaim",
        description:
            "Diskon khusus akhir bulan untuk meningkatkan traffic booking weekday dan upsell paket steam therapy.",
        publishToApp: true,
        segments: ["Semua pelanggan", "Member marketplace"],
        branchCoverage: ["TrimTime SCBD", "TrimTime Menteng", "TrimTime BSD"],
        metrics: [
            { label: "Total klaim", value: "312 klaim", helper: "+18% vs rata-rata" },
            { label: "Nilai penjualan", value: "Rp 18,5 jt", helper: "+Rp 3,2 jt" },
            { label: "Impresi campaign", value: "12,4k", helper: "Push notif + banner" },
        ],
        timeline: [
            { label: "Dibuat", value: "20 Jan 2025 • 14:10" },
            { label: "Periode", value: "25 Jan 2025 - 30 Jan 2025" },
            { label: "Status", value: "Aktif" },
        ],
        benefits: [
            "Auto apply untuk booking paket haircut + steam",
            "Poin member 2x saat klaim",
        ],
        notes: "Monitor performa di tab Laporan > Promo dan siap nonaktifkan jika stok steam pad penuh.",
    },
    {
        slug: "birthday-treat-steam",
        id: "PROMO-BIRTHDAY-STEAM",
        name: "Birthday Treat + Steam",
        channel: "Push notif",
        period: {
            start: "2025-01-01",
            end: "2025-12-31",
            label: "Aktif sesuai bulan ulang tahun",
        },
        target: "Member Gold",
        status: "Terjadwal",
        discountType: "Bundling layanan",
        discountValue: "Gratis steam",
        minTransaction: "Booking haircut premium",
        quota: "Otomatis 1x / member",
        description:
            "Hadiah ulang tahun untuk member Gold dengan paket haircut + steam tanpa biaya tambahan.",
        publishToApp: true,
        segments: ["Member Gold", "Member loyal"],
        branchCoverage: ["TrimTime SCBD", "TrimTime Menteng", "TrimTime Bandung"],
        metrics: [
            { label: "Member eligible", value: "528 akun", helper: "60 ulang tahun bulan ini" },
            { label: "Voucher terkirim", value: "60 kode", helper: "Auto via email + push" },
            { label: "Konversi", value: "28 klaim", helper: "46% dari voucher" },
        ],
        timeline: [
            { label: "Dijadwalkan", value: "1 Jan 2025" },
            { label: "Aktif", value: "Berjalan otomatis tiap bulan" },
            { label: "Status", value: "Terjadwal" },
        ],
        benefits: [
            "Steam therapy gratis untuk member ulang tahun",
            "Bonus 25 poin setelah klaim",
        ],
        notes: "Update copy push notif di menu Komunikasi sebelum akhir bulan.",
    },
    {
        slug: "refer-a-friend-40k",
        id: "PROMO-REFERRAL-40K",
        name: "Refer a friend 40k",
        channel: "Referral code",
        period: {
            start: "2025-02-01",
            end: "2025-03-31",
            label: "1 Feb - 31 Mar 2025",
        },
        target: "Member baru",
        status: "Aktif",
        discountType: "Voucher saldo",
        discountValue: "Rp 40.000",
        minTransaction: "Min transaksi Rp 120.000",
        quota: "Tanpa batas (selama periode)",
        description:
            "Ajak teman bergabung di TrimTime dan dapatkan saldo dompet 40k untuk keduanya setelah booking pertama.",
        publishToApp: true,
        segments: ["Member baru", "Referral aktif"],
        branchCoverage: ["TrimTime SCBD", "TrimTime Menteng", "TrimTime BSD", "TrimTime Bandung"],
        metrics: [
            { label: "Kode referral aktif", value: "1.240 kode", helper: "Naik 8% minggu ini" },
            { label: "Teman bergabung", value: "362 user", helper: "Periode berjalan" },
            { label: "Saldo dibagikan", value: "Rp 14,5 jt", helper: "Termasuk bonus barber" },
        ],
        timeline: [
            { label: "Dibuat", value: "25 Jan 2025 • 09:40" },
            { label: "Periode", value: "1 Feb 2025 - 31 Mar 2025" },
            { label: "Status", value: "Aktif" },
        ],
        benefits: [
            "Pengajak & teman dapat saldo dompet TrimTime",
            "Bonus 10 poin ekstra untuk teman baru",
        ],
        notes: "Pantau fraud via menu Audit referral dan siapkan reminder push tiap dua minggu.",
    },
];

export const ownerLoyaltyStats: OwnerPromoStat[] = [
    { label: "Member aktif", value: "8.420 user", helper: "Naik 6% MoM" },
    { label: "Poin ditukarkan", value: "1.430 voucher", helper: "Total Rp 74 jt" },
    { label: "Promo berjalan", value: "6 campaign", helper: "3 auto, 3 manual" },
];

export const promoChannels = [
    "App user",
    "Push notif",
    "Email blast",
    "Referral code",
    "Offline QR",
] as const;

export const promoDiscountTypes = [
    "Diskon persentase",
    "Diskon nominal",
    "Bundling layanan",
    "Voucher saldo",
] as const;

export const promoSegmentOptions = [
    "Semua pelanggan",
    "Member marketplace",
    "Member Gold",
    "Member loyal",
    "Member baru",
    "Pelanggan ulang tahun",
    "Referral aktif",
] as const;
