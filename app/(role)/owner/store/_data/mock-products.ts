export const productStatusOptions = ["Ready", "Low stock", "Habis"] as const;

export type ProductStatus = (typeof productStatusOptions)[number];

export const productTagOptions = [
    "Best seller",
    "Limited",
    "Bundle",
    "Eksklusif cabang",
] as const;

export type ProductTag = (typeof productTagOptions)[number];

export type MockStoreProduct = {
    id: string;
    name: string;
    sku: string;
    price: string;
    stock: number;
    status: ProductStatus;
    tags?: ProductTag[];
    description?: string;
    fulfillmentTime?: string;
};

export const mockStoreProducts: MockStoreProduct[] = [
    {
        id: "PRD-201",
        name: "Clay Pomade Signature",
        sku: "PRD-201",
        price: "Rp 145.000",
        stock: 64,
        status: "Ready",
        tags: ["Best seller"],
        description: "Pomade clay matte finish dengan daya hold tinggi khusus barber TrimTime.",
        fulfillmentTime: "Siap kirim dalam 1 hari",
    },
    {
        id: "PRD-165",
        name: "Carbon Comb Pro",
        sku: "PRD-165",
        price: "Rp 85.000",
        stock: 18,
        status: "Low stock",
        tags: ["Eksklusif cabang"],
        description: "Sisir karbon anti statis favorit barber senior untuk styling detail.",
        fulfillmentTime: "Siap kirim dalam 2 hari",
    },
    {
        id: "PRD-190",
        name: "Pre-Styling Spray",
        sku: "PRD-190",
        price: "Rp 110.000",
        stock: 0,
        status: "Habis",
        tags: ["Limited"],
        description: "Spray proteksi panas dengan wangi signature cocok untuk treatment cepat.",
        fulfillmentTime: "Restock 3 hari kerja",
    },
];
