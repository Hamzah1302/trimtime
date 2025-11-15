export type BranchService = {
    name: string;
    price: string;
};

export const defaultBranchServices: BranchService[] = [
    { name: "Signature Fade", price: "Rp 95.000" },
    { name: "Kids Cut", price: "Rp 75.000" },
    { name: "Steam Therapy", price: "Rp 35.000" },
];

export const branchFeatureOptions = [
    "Booking online",
    "Home service",
    "Mini store",
    "Kids friendly",
] as const;

export type BranchFeature = (typeof branchFeatureOptions)[number];

export type MockBranch = {
    slug: string;
    name: string;
    address: string;
    schedule: string;
    status: "Aktif" | "Menunggu" | "Butuh booster";
    occupancy: string;
    weeklySchedule?: string[];
    contact?: string;
    services?: BranchService[];
    features?: BranchFeature[];
};

export const mockBranches: MockBranch[] = [
    {
        slug: "trimtime-scbd",
        name: "TrimTime SCBD",
        address: "District 8, Jakarta Selatan",
        schedule: "10:00 - 22:00",
        status: "Aktif",
        occupancy: "92%",
        contact: "0821-0000-1111",
        weeklySchedule: [
            "Senin: 10:00 - 22:00",
            "Selasa: 10:00 - 22:00",
            "Rabu: 10:00 - 22:00",
            "Kamis: 10:00 - 22:00",
            "Jumat: 10:00 - 23:00",
            "Sabtu: 09:00 - 23:00",
            "Minggu: 10:00 - 21:00",
        ],
        services: defaultBranchServices,
        features: ["Booking online", "Home service", "Mini store"],
    },
    {
        slug: "trimtime-menteng",
        name: "TrimTime Menteng",
        address: "Jl. HOS Cokroaminoto No. 82, Jakarta Pusat",
        schedule: "09:00 - 21:00",
        status: "Aktif",
        occupancy: "84%",
        contact: "0821-0000-2222",
        services: defaultBranchServices,
        features: ["Booking online", "Mini store", "Kids friendly"],
    },
    {
        slug: "trimtime-bsd",
        name: "TrimTime BSD",
        address: "QBig Extension, BSD City",
        schedule: "10:00 - 20:00",
        status: "Butuh booster",
        occupancy: "68%",
        contact: "0821-0000-3333",
        services: defaultBranchServices,
        features: ["Booking online", "Home service"],
    },
    {
        slug: "trimtime-bandung",
        name: "TrimTime Bandung",
        address: "Jl. LLRE Martadinata No. 45, Bandung",
        schedule: "09:00 - 21:00",
        status: "Menunggu",
        occupancy: "-",
        contact: "0821-0000-4444",
        services: defaultBranchServices,
        features: ["Booking online", "Mini store", "Kids friendly"],
    },
];
