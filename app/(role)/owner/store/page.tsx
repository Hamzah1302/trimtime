"use client";

import {
    Boxes,
    CheckCircle,
    Package2,
    PackageCheck,
    ShoppingBag,
    Truck,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const products = [
    {
        name: "Clay Pomade Signature",
        sku: "PRD-201",
        stock: 64,
        status: "Ready",
        price: "Rp 145.000",
    },
    {
        name: "Carbon Comb Pro",
        sku: "PRD-165",
        stock: 18,
        status: "Low stock",
        price: "Rp 85.000",
    },
    {
        name: "Pre-Styling Spray",
        sku: "PRD-190",
        stock: 0,
        status: "Habis",
        price: "Rp 110.000",
    },
] as const;

const fulfillment = [
    { label: "Pesanan mini store hari ini", value: "87 transaksi" },
    { label: "Transaksi selesai", value: "82 (94%)" },
    { label: "Menunggu pickup", value: "5 order" },
] as const;

export default function OwnerStorePage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <ShoppingBag className='h-4 w-4' />
                                Mini Store Owner
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Jual produk grooming resmi</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Kelola stok, catat transaksi otomatis, dan sinkronkan dengan promo loyalitas.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button>Tambah produk</Button>
                            <Button variant='outline' className='border-border/60'>
                                Import katalog
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {fulfillment.map((item) => (
                        <Card key={item.label} className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>{item.label}</CardDescription>
                                <CardTitle className='text-2xl font-bold'>{item.value}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Produk & stok</CardTitle>
                        <CardDescription>Stok berkurang otomatis saat ada transaksi di user app.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input placeholder='Cari SKU / produk' className='border-border/60' />
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Produk</TableHead>
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Stok</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Harga</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.sku}>
                                            <TableCell className='font-semibold text-foreground'>{product.name}</TableCell>
                                            <TableCell>{product.sku}</TableCell>
                                            <TableCell>{product.stock} pcs</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/40 text-[10px] uppercase tracking-widest text-muted-foreground'
                                                >
                                                    {product.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='font-semibold text-foreground'>{product.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Transaksi terbaru</CardTitle>
                            <CardDescription>Catatan otomatis dari aplikasi user.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {[
                                { name: "Pomade Clay", user: "Rizky • SCBD", status: "Selesai" },
                                { name: "Carbon comb", user: "Ivana • Menteng", status: "Pick up" },
                                { name: "Home care kit", user: "Adrian • BSD", status: "Dikirim" },
                            ].map((order) => (
                                <div key={order.name} className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                    <p className='text-base font-semibold text-foreground'>{order.name}</p>
                                    <p>{order.user}</p>
                                    <Badge variant='outline' className='mt-2 border-border/50 text-[10px] uppercase tracking-widest'>
                                        {order.status}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>Log gudang</CardTitle>
                            <CardDescription>Pembaruan stok, penyesuaian manual, dan pengiriman supplier.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <PackageCheck className='h-4 w-4 text-primary' />
                                    Restock Clay Pomade
                                </p>
                                <p>+120 pcs dari Vendor Alpha • Gudang BSD</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Truck className='h-4 w-4 text-primary' />
                                    Transfer stok ke Menteng
                                </p>
                                <p>Carbon comb 30 pcs</p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Boxes className='h-4 w-4 text-primary' />
                                    Penyesuaian manual
                                </p>
                                <p>Pre-Styling Spray -5 pcs (damage)</p>
                            </div>
                            <Button variant='outline' className='w-full border-border/60 gap-2'>
                                <Package2 className='h-4 w-4' />
                                Lihat log lengkap
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>Integrasi loyalitas</CardTitle>
                        <CardDescription>Produk tertentu bisa ditukar poin pelanggan.</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-3'>
                        {[
                            { label: "Produk dapat poin", value: "14 SKU" },
                            { label: "Redeem via poin", value: "9 SKU" },
                            { label: "Penukaran bulan ini", value: "312 item" },
                        ].map((item) => (
                            <div key={item.label} className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm'>
                                <p className='text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
                                    <CheckCircle className='h-3.5 w-3.5 text-primary' />
                                    {item.label}
                                </p>
                                <p className='text-2xl font-bold text-foreground'>{item.value}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
