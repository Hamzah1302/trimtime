"use client";

import Link from "next/link";

import { ArrowLeft, Info, UploadCloud } from "lucide-react";

import {
    mockStoreProducts,
    productStatusOptions,
    productTagOptions,
    type MockStoreProduct,
} from "../_data/mock-products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STATUS_COLORS: Record<MockStoreProduct["status"], string> = {
    Ready: "bg-emerald-500/10 text-emerald-600",
    "Low stock": "bg-amber-500/10 text-amber-600",
    Habis: "bg-destructive/10 text-destructive",
};

type StoreFormProps = {
    mode: "create" | "edit";
    productId?: string;
};

function findProduct(productId?: string) {
    if (!productId) return undefined;
    return mockStoreProducts.find((product) => product.id === productId);
}

export function StoreForm({ mode, productId }: StoreFormProps) {
    const product = findProduct(productId);
    const selectedTags = new Set(product?.tags ?? []);

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between gap-4'>
                <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                        <Info className='h-4 w-4 text-primary' />
                        {mode === "create" ? "Tambah produk" : "Edit produk"}
                    </div>
                    <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                        {mode === "create"
                            ? "Registrasi produk mini store"
                            : `Perbarui produk ${product?.name ?? "TrimTime"}`}
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Catat detail produk, status stok, dan tag promo. Produk akan langsung tampil di aplikasi pelanggan setelah disimpan.
                    </p>
                </div>
                <Button variant='ghost' className='hidden gap-2 text-primary sm:inline-flex' asChild>
                    <Link href='/owner/store'>
                        <ArrowLeft className='h-4 w-4' />
                        Kembali ke mini store
                    </Link>
                </Button>
            </div>

            {product && (
                <Card className='border-border/60 bg-muted/10'>
                    <CardContent className='flex flex-col gap-3 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
                        <div>
                            <p className='font-semibold text-foreground'>{product.name}</p>
                            <p>SKU {product.sku}</p>
                        </div>
                        <Badge className={`${STATUS_COLORS[product.status]} border-none px-3 py-1 text-xs font-semibold uppercase tracking-widest`}>
                            {product.status}
                        </Badge>
                    </CardContent>
                </Card>
            )}

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Informasi produk</CardTitle>
                    <CardDescription>Detail ini akan tampil di kartu produk mini store.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='product-name'>Nama produk</Label>
                            <Input id='product-name' placeholder='Contoh: Clay Pomade Signature' defaultValue={product?.name ?? ""} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='product-sku'>SKU</Label>
                            <Input id='product-sku' placeholder='PRD-XXX' defaultValue={product?.sku ?? ""} />
                        </div>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='product-price'>Harga jual</Label>
                            <Input id='product-price' placeholder='Rp 145.000' defaultValue={product?.price ?? ""} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='product-stock'>Stok saat ini</Label>
                            <Input id='product-stock' placeholder='100 pcs' defaultValue={product?.stock ?? ""} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='product-description'>Deskripsi produk</Label>
                        <Textarea
                            id='product-description'
                            rows={3}
                            placeholder='Tuliskan manfaat utama, komposisi, dan highlight produk.'
                            defaultValue={product?.description ?? ""}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Status & fulfilment</CardTitle>
                    <CardDescription>Tentukan status stok dan estimasi pemenuhan produk.</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                        <Label>Status stok</Label>
                        <div className='grid gap-2'>
                            {productStatusOptions.map((status) => (
                                <label key={status} className='flex items-center gap-3 rounded-lg border border-border/40 bg-muted/15 px-3 py-2 text-sm'>
                                    <Checkbox defaultChecked={product?.status === status} className='border-border/60' />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='product-fulfilment'>Estimasi fulfilment</Label>
                        <Input
                            id='product-fulfilment'
                            placeholder='Siap kirim dalam 1 hari'
                            defaultValue={product?.fulfillmentTime ?? ""}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Tag & campaign</CardTitle>
                    <CardDescription>Pilih tag promo untuk menampilkan badge khusus di aplikasi.</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-3 sm:grid-cols-2'>
                    {productTagOptions.map((tag) => (
                        <label key={tag} className='flex items-center gap-3 rounded-lg border border-border/40 bg-background/70 px-3 py-2 text-sm'>
                            <Checkbox defaultChecked={selectedTags.has(tag)} className='border-border/60' />
                            {tag}
                        </label>
                    ))}
                </CardContent>
            </Card>

            <Card className='border border-dashed border-primary/50 bg-primary/5'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold text-primary'>
                        {mode === "create" ? "Siap terbitkan produk baru?" : "Simpan pembaruan produk"}
                    </CardTitle>
                    <CardDescription className='text-sm text-primary/80'>
                        {mode === "create"
                            ? "Produk akan muncul di mini store cabang Anda dan bisa dikaitkan dengan promo loyalitas."
                            : "Perubahan langsung sinkron ke aplikasi pelanggan dan dashboard owner."}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <Button variant='outline' className='w-full border-border/60 text-sm text-muted-foreground sm:w-auto' asChild>
                        <Link href='/owner/store'>
                            Batal
                        </Link>
                    </Button>
                    <Button className='w-full sm:w-auto'>
                        {mode === "create" ? "Terbitkan produk" : "Simpan perubahan"}
                    </Button>
                </CardFooter>
            </Card>

            <Card className='border-border/60 bg-muted/10 shadow-sm'>
                <CardContent className='flex flex-col gap-3 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <span className='font-semibold text-foreground'>Tips konversi tinggi:</span> gunakan foto produk 1:1, highlight manfaat
                        utama, dan tawarkan bundling grooming kit.
                    </div>
                    <Button variant='outline' className='border-border/60 text-sm text-primary' asChild>
                        <Link href='/owner/store'>
                            Lihat katalog contoh
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card className='border border-dashed border-primary/40 bg-primary/5'>
                <CardContent className='flex flex-col gap-3 p-4 text-sm text-primary/80 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-3'>
                        <UploadCloud className='h-5 w-5 text-primary' />
                        <div>
                            <p className='font-semibold text-primary'>Import catalog massal</p>
                            <p className='text-sm'>Download template CSV untuk menambah stok hingga 100 produk.</p>
                        </div>
                    </div>
                    <Button variant='outline' className='border-border/60 text-primary hover:text-primary/90'>
                        Unduh template
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
