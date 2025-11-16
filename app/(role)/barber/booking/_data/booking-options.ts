export type BarberService = {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
};

export const barberServices: BarberService[] = [
    {
        id: "skin-fade-premium",
        name: "Skin Fade Premium",
        description: "Potongan rapi dengan fade halus & styling matte finish.",
        price: 65000,
        duration: "35 menit",
    },
    {
        id: "classic-cut",
        name: "Classic Cut & Wash",
        description: "Potong rambut klasik termasuk shampoo dan quick dry.",
        price: 55000,
        duration: "30 menit",
    },
    {
        id: "beard-trim",
        name: "Beard Trim",
        description: "Perapihan kumis & jenggot dengan warm towel finish.",
        price: 35000,
        duration: "20 menit",
    },
    {
        id: "steam-therapy",
        name: "Steam Therapy",
        description: "Perawatan kulit kepala dengan essential oil & pijat.",
        price: 20000,
        duration: "15 menit",
    },
    {
        id: "home-service",
        name: "Home Service (add-on)",
        description: "Tambahan biaya kunjungan barber ke lokasi pelanggan.",
        price: 30000,
        duration: "Opsional",
    },
];

export type PromoDefinition = {
    label: string;
    discountType: "percent" | "amount";
    value: number;
    minSubtotal?: number;
    notes?: string;
};

export const promoCatalog: Record<string, PromoDefinition> = {
    TRIM10: {
        label: "Diskon 10%",
        discountType: "percent",
        value: 0.1,
        minSubtotal: 100000,
        notes: "Minimal transaksi Rp 100.000",
    },
    VIP15: {
        label: "Diskon Member 15%",
        discountType: "percent",
        value: 0.15,
        notes: "Khusus pelanggan loyal",
    },
    HEMAT10K: {
        label: "Potongan Rp 10.000",
        discountType: "amount",
        value: 10000,
    },
};
