"use client";

import Link from "next/link";

import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Package,
    PackageCheck,
    Pencil,
    Receipt,
    ShoppingBag,
    TrendingUp,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { mockStoreProducts } from "./_data/mock-products";

// Best selling products
const bestSellers = [
    {
        name: "Clay Pomade Signature",
        sold: 124,
        revenue: "Rp 6.200.000",
        stock: 42,
    },
    {
        name: "Carbon Comb Pro",
        sold: 87,
        revenue: "Rp 3.100.000",
        stock: 8,
    },
    {
        name: "Home Care Kit",
        sold: 56,
        revenue: "Rp 2.800.000",
        stock: 18,
    },
];

// Products that need restock
const lowStockProducts = [
    {
        name: "Pre-Styling Spray",
        stock: 8,
        daysLeft: 2,
        status: "critical",
    },
    {
        name: "Carbon Comb Pro",
        stock: 8,
        daysLeft: 3,
        status: "critical",
    },
    {
        name: "Home Care Kit",
        stock: 18,
        daysLeft: 7,
        status: "warning",
    },
];

// Simplified pending orders
const pendingOrders = [
    {
        id: "ORD-7781",
        customer: "Dewi Larasati",
        product: "Clay Pomade Signature",
        location: "SCBD",
    },
    {
        id: "ORD-7778",
        customer: "Raka Firmansyah",
        product: "Carbon Comb Pro",
        location: "Menteng",
    },
    {
        id: "ORD-7774",
        customer: "Salsa Putri",
        product: "Home Care Kit",
        location: "BSD",
    },
];

// Simplified transaction list (6 columns instead of 10)
const transactions = [
    {
        id: "TRX-2301",
        date: "16 Nov • 14:22",
        customer: "Rizky Pratama",
        product: "Clay Pomade (3x)",
        total: "Rp 145.000",
        status: "Selesai",
    },
    {
        id: "TRX-2298",
        date: "16 Nov • 13:47",
        customer: "Ivana Pertiwi",
        product: "Carbon Comb (1x)",
        total: "Rp 85.000",
        status: "Diproses",
    },
    {
        id: "TRX-2295",
        date: "16 Nov • 11:10",
        customer: "Adrian Saputra",
        product: "Home Care Kit (2x)",
        total: "Rp 315.000",
        status: "Dikirim",
    },
    {
        id: "TRX-2289",
        date: "15 Nov • 20:55",
        customer: "Naya Pratama",
        product: "Pre-Styling Spray (1x)",
        total: "Rp 110.000",
        status: "Selesai",
    },
    {
        id: "TRX-2281",
        date: "15 Nov • 18:03",
        customer: "Hafidz Rahman",
        product: "Bundle Essentials (4x)",
        total: "Rp 420.000",
        status: "Diproses",
    },
];

const statusConfig = {
    Selesai: "bg-green-100 text-green-700 border-green-300",
    Diproses: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Dikirim: "bg-blue-100 text-blue-700 border-blue-300",
} as const;

const stockStatusConfig = {
    critical: {
        badge: "bg-red-100 text-red-700 border-red-300",
        icon: AlertTriangle,
    },
    warning: {
        badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
        icon: AlertTriangle,
    },
    safe: {
        badge: "bg-green-100 text-green-700 border-green-300",
        icon: CheckCircle2,
    },
};

export default function OwnerStorePage() {
    return (
        <PageShell background='soft' contentClassName='gap-6'>
            {/* Header */}
            <Card className='border-border/50'>
                <CardContent className='p-6'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold'>
                            Mini Store Barbershop
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Kelola produk grooming, stok, dan transaksi
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* KPI Cards - With Revenue! */}
            <div className='grid gap-4 lg:grid-cols-3'>
                {/* Revenue */}
                <Card className='border-green-300 bg-green-50'>
                    <CardHeader>
                        <CardDescription className='text-green-700'>
                            Pendapatan hari ini
                        </CardDescription>
                        <CardTitle className='text-3xl font-bold text-green-900'>
                            Rp 4,2 juta
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-sm text-green-700'>
                            Dari 87 transaksi • Margin 35%
                        </p>
                    </CardContent>
                </Card>

                {/* Pending Actions */}
                <Card className='border-yellow-300 bg-yellow-50'>
                    <CardHeader>
                        <CardDescription className='text-yellow-700'>
                            Yang perlu tindakan
                        </CardDescription>
                        <CardTitle className='text-3xl font-bold text-yellow-900'>
                            {pendingOrders.length} order
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button size='sm' className='w-full' asChild>
                            <a href='#pending'>Proses sekarang</a>
                        </Button>
                    </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card className='border-red-300 bg-red-50'>
                    <CardHeader>
                        <CardDescription className='text-red-700'>
                            Produk perlu restock
                        </CardDescription>
                        <CardTitle className='text-3xl font-bold text-red-900'>
                            {lowStockProducts.filter((p) => p.status === "critical").length}{" "}
                            produk
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            size='sm'
                            variant='outline'
                            className='w-full border-red-300'
                            asChild
                        >
                            <a href='#restock'>Lihat & order</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Best Sellers + Low Stock */}
            <div className='grid gap-5 lg:grid-cols-2'>
                {/* Best Sellers */}
                <Card className='border-border/50'>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <TrendingUp className='h-5 w-5 text-primary' />
                            <CardTitle>Best sellers minggu ini</CardTitle>
                        </div>
                        <CardDescription>
                            Produk paling laku 7 hari terakhir
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        {bestSellers.map((product, index) => (
                            <div
                                key={product.name}
                                className='flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 p-4'
                            >
                                <div className='flex items-center gap-3'>
                                    <Badge className='bg-primary/15 text-primary'>
                                        {index + 1}
                                    </Badge>
                                    <div>
                                        <p className='font-semibold text-foreground'>
                                            {product.name}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {product.sold} terjual •{" "}
                                            {product.revenue}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant='outline'
                                    className={
                                        product.stock < 10
                                            ? "border-red-300 text-red-700"
                                            : "border-green-300 text-green-700"
                                    }
                                >
                                    Stok: {product.stock}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card className='border-red-300 bg-red-50' id='restock'>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <AlertTriangle className='h-5 w-5 text-red-600' />
                            <CardTitle className='text-red-900'>
                                Perlu restock urgent
                            </CardTitle>
                        </div>
                        <CardDescription className='text-red-700'>
                            Produk akan habis dalam beberapa hari
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        {lowStockProducts.map((product) => {
                            const config = stockStatusConfig[product.status];
                            const Icon = config.icon;
                            return (
                                <div
                                    key={product.name}
                                    className='flex items-center justify-between rounded-lg border border-red-300 bg-white p-4'
                                >
                                    <div className='flex items-center gap-3'>
                                        <Icon className='h-5 w-5 text-red-600' />
                                        <div>
                                            <p className='font-semibold text-foreground'>
                                                {product.name}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                Stok: {product.stock} pcs •
                                                Habis dalam {product.daysLeft}{" "}
                                                hari
                                            </p>
                                        </div>
                                    </div>
                                    <Button size='sm' asChild>
                                        <Link
                                            href={`/owner/store/reorder?product=${product.name}`}
                                        >
                                            Re-order
                                        </Link>
                                    </Button>
                                </div>
                            );
                        })}
                        <Button className='w-full' asChild>
                            <Link href='/owner/store/reorder'>
                                <ArrowRight className='h-4 w-4' />
                                Re-order semua sekaligus
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Pickup - Simplified */}
            <Card className='border-border/50' id='pending'>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Pending pickup</CardTitle>
                            <CardDescription>
                                Order menunggu dikirim ke pelanggan
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <a href='#'>Proses semua sekaligus</a>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                    {pendingOrders.map((order) => (
                        <div
                            key={order.id}
                            className='flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 p-4'
                        >
                            <div>
                                <p className='text-xs uppercase tracking-wider text-muted-foreground'>
                                    {order.id}
                                </p>
                                <p className='font-semibold text-foreground'>
                                    {order.customer}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    {order.product} • {order.location}
                                </p>
                            </div>
                            <Button size='sm' variant='outline'>
                                <Truck className='h-4 w-4' />
                                Tandai dikirim
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Transaction Table - Simplified from 10 to 6 columns */}
            <Card className='border-border/50'>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <div>
                        <CardTitle>Daftar transaksi</CardTitle>
                        <CardDescription>
                            Rekap otomatis dari aplikasi user
                        </CardDescription>
                    </div>
                    <Button variant='outline' size='sm'>
                        <Receipt className='h-4 w-4' />
                        Export CSV
                    </Button>
                </CardHeader>
                <CardContent className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>ID / Customer</TableHead>
                                <TableHead>Produk</TableHead>
                                <TableHead className='text-right'>
                                    Total
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className='text-right'>
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((trx) => (
                                <TableRow key={trx.id}>
                                    <TableCell className='text-sm text-muted-foreground'>
                                        {trx.date}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>
                                                {trx.id}
                                            </p>
                                            <p className='font-semibold text-foreground'>
                                                {trx.customer}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-sm'>
                                        {trx.product}
                                    </TableCell>
                                    <TableCell className='text-right font-semibold'>
                                        {trx.total}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant='outline'
                                            className={statusConfig[trx.status]}
                                        >
                                            {trx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            asChild
                                        >
                                            <Link
                                                href={`/owner/store/orders/${trx.id}`}
                                            >
                                                Detail
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Product Table - With Visual Stock Alert */}
            <Card className='border-border/50'>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <div>
                        <CardTitle>Semua produk & stok</CardTitle>
                        <CardDescription>
                            Stok berkurang otomatis saat ada transaksi
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link href='/owner/store/create'>
                            <PackageCheck className='h-4 w-4' />
                            Tambah produk
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produk</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Status Stok</TableHead>
                                <TableHead className='text-right'>
                                    Harga
                                </TableHead>
                                <TableHead className='text-right'>
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockStoreProducts.map((product) => {
                                // Determine stock status
                                let stockStatus: "critical" | "warning" | "safe" =
                                    "safe";
                                if (product.stock < 10) stockStatus = "critical";
                                else if (product.stock < 20)
                                    stockStatus = "warning";

                                const config = stockStatusConfig[stockStatus];
                                const StatusIcon = config.icon;

                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className='font-semibold text-foreground'>
                                            {product.name}
                                        </TableCell>
                                        <TableCell className='text-sm text-muted-foreground'>
                                            {product.sku}
                                        </TableCell>
                                        <TableCell className='font-semibold'>
                                            {product.stock} pcs
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant='outline'
                                                className={config.badge}
                                            >
                                                <StatusIcon className='mr-1 h-3 w-3' />
                                                {stockStatus === "critical"
                                                    ? "Restock urgent"
                                                    : stockStatus === "warning"
                                                      ? "Perlu diorder"
                                                      : "Stok aman"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='text-right font-semibold text-foreground'>
                                            {product.price}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                asChild
                                            >
                                                <Link
                                                    href={`/owner/store/${product.id}/edit`}
                                                >
                                                    <Pencil className='h-3.5 w-3.5' />
                                                    Edit
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Stock Activity Summary - Simplified */}
            <Card className='border-border/50'>
                <CardHeader>
                    <CardTitle>Update stok hari ini</CardTitle>
                    <CardDescription>
                        Ringkasan aktivitas gudang dan inventory
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                    <div className='grid gap-3 sm:grid-cols-3'>
                        <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Package className='h-4 w-4 text-primary' />
                                Produk direstock
                            </div>
                            <p className='mt-1 text-2xl font-bold text-foreground'>
                                3 produk
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Total +240 pcs
                            </p>
                        </div>
                        <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Truck className='h-4 w-4 text-primary' />
                                Transfer antar cabang
                            </div>
                            <p className='mt-1 text-2xl font-bold text-foreground'>
                                2 transfer
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Menteng & BSD
                            </p>
                        </div>
                        <div className='rounded-lg border border-border/40 bg-muted/20 p-4'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <AlertTriangle className='h-4 w-4 text-primary' />
                                Adjustment
                            </div>
                            <p className='mt-1 text-2xl font-bold text-foreground'>
                                1 item
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Damage report
                            </p>
                        </div>
                    </div>
                    <Button
                        variant='outline'
                        className='w-full border-border/60'
                        asChild
                    >
                        <Link href='/owner/store/logs'>
                            Lihat detail log lengkap
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className='border-border/50'>
                <CardHeader>
                    <CardTitle>Quick actions</CardTitle>
                </CardHeader>
                <CardContent className='grid gap-3 sm:grid-cols-2'>
                    <Button variant='outline' className='justify-start' asChild>
                        <Link href='/owner/store/create'>
                            <ShoppingBag className='h-4 w-4' />
                            Tambah produk baru
                        </Link>
                    </Button>
                    <Button variant='outline' className='justify-start' asChild>
                        <Link href='/owner/store/reorder'>
                            <Package className='h-4 w-4' />
                            Re-order stok
                        </Link>
                    </Button>
                    <Button variant='outline' className='justify-start' asChild>
                        <Link href='/owner/store/reports'>
                            <Receipt className='h-4 w-4' />
                            Unduh laporan
                        </Link>
                    </Button>
                    <Button variant='outline' className='justify-start' asChild>
                        <Link href='/owner/store/settings'>
                            Pengaturan mini store
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </PageShell>
    );
}