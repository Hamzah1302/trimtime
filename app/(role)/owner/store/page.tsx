"use client";

import Link from "next/link";

import {
    Boxes,
    CheckCircle,
    MapPin,
    Package2,
    PackageCheck,
    Pencil,
    Phone,
    Receipt,
    Search,
    ShoppingBag,
    Truck,
    UploadCloud,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { mockStoreProducts } from "./_data/mock-products";

const fulfillment = [
    { label: "Pesanan mini store hari ini", value: "87 transaksi" },
    { label: "Transaksi selesai", value: "82 (94%)" },
    { label: "Menunggu pickup", value: "5 order" },
] as const;

const pendingFulfillment = [
    {
        id: "ORD-7781",
        customer: "Dewi Larasati",
        product: "Clay Pomade Signature",
        address: "Jl. Bumi No. 12, Kebayoran, Jakarta",
        note: "Pickup kurir internal • butuh bubble wrap",
        phone: "+62 812-8899-1123",
        eta: "Kirim sebelum 17:00",
    },
    {
        id: "ORD-7778",
        customer: "Raka Firmansyah",
        product: "Carbon Comb Pro",
        address: "Apartemen Menteng Park Tower A, Lt 12",
        note: "COD dengan kurir TrimTime",
        phone: "+62 811-2233-9988",
        eta: "Pickup 15:30",
    },
    {
        id: "ORD-7774",
        customer: "Salsa Putri",
        product: "Home Care Kit",
        address: "Cluster Casa De Parco, BSD",
        note: "Kirim via Instant Courier",
        phone: "+62 813-7700-4511",
        eta: "Label siap • 30 menit",
    },
] as const;

const transactionStatusStyles: Record<string, string> = {
    Selesai: "bg-emerald-500/10 text-emerald-600",
    Diproses: "bg-amber-500/10 text-amber-600",
    Dikirim: "bg-sky-500/10 text-sky-600",
};

const mockStoreTransactions = [
    {
        id: "TRX-2301",
        customer: "Rizky Pratama",
        product: "Clay Pomade Signature",
        quantity: 3,
        total: "Rp 145.000",
        paymentMethod: "QRIS",
        shippingNote: "Pickup loket TrimTime SCBD",
        contact: "+62 812-8899-1123",
        status: "Selesai",
        date: "16 Nov • 14:22",
    },
    {
        id: "TRX-2298",
        customer: "Ivana Pertiwi",
        product: "Carbon Comb Pro",
        quantity: 1,
        total: "Rp 85.000",
        paymentMethod: "E-Wallet",
        shippingNote: "COD lobby Menteng Park",
        contact: "+62 811-5566-7788",
        status: "Diproses",
        date: "16 Nov • 13:47",
    },
    {
        id: "TRX-2295",
        customer: "Adrian Saputra",
        product: "Home Care Kit",
        quantity: 2,
        total: "Rp 315.000",
        paymentMethod: "Virtual Account",
        shippingNote: "Instant courier ke BSD",
        contact: "+62 813-4455-6677",
        status: "Dikirim",
        date: "16 Nov • 11:10",
    },
    {
        id: "TRX-2289",
        customer: "Naya Pratama",
        product: "Pre-Styling Spray",
        quantity: 1,
        total: "Rp 110.000",
        paymentMethod: "QRIS",
        shippingNote: "Ambil langsung cabang Kemang",
        contact: "+62 812-9988-7766",
        status: "Selesai",
        date: "15 Nov • 20:55",
    },
    {
        id: "TRX-2281",
        customer: "Hafidz Rahman",
        product: "Bundle Styling Essentials",
        quantity: 4,
        total: "Rp 420.000",
        paymentMethod: "COD",
        shippingNote: "Kurir internal siap jemput 18:00",
        contact: "+62 811-2233-4455",
        status: "Diproses",
        date: "15 Nov • 18:03",
    },
] as const;

export default function OwnerStorePage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <ShoppingBag className='h-4 w-4' />
                                Mini Store Owner
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Jual produk grooming resmi
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Kelola stok, catat transaksi otomatis, dan
                                sinkronkan dengan promo loyalitas.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2' asChild>
                                <Link href='/owner/store/create'>
                                    <PackageCheck className='h-4 w-4' />
                                    Tambah produk
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <UploadCloud className='h-4 w-4' />
                                Import katalog
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {fulfillment.map((item) => (
                        <Card
                            key={item.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>
                                    {item.label}
                                </CardDescription>
                                <CardTitle className='text-2xl font-bold'>
                                    {item.value}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Produk & stok
                        </CardTitle>
                        <CardDescription>
                            Stok berkurang otomatis saat ada transaksi di user
                            app.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input
                            placeholder='Cari SKU / produk'
                            className='border-border/60'
                        />
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Produk</TableHead>
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Stok</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Harga</TableHead>
                                        <TableHead className='w-[110px] text-right'>
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockStoreProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className='font-semibold text-foreground'>
                                                {product.name}
                                            </TableCell>
                                            <TableCell>{product.sku}</TableCell>
                                            <TableCell>
                                                {product.stock} pcs
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/40 text-[10px] uppercase tracking-widest text-muted-foreground'
                                                >
                                                    {product.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='font-semibold text-foreground'>
                                                {product.price}
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='gap-1 text-primary'
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/owner/store/${encodeURIComponent(
                                                            product.id
                                                        )}/edit`}
                                                    >
                                                        <Pencil className='h-3.5 w-3.5' />
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Pengiriman butuh tindakan
                            </CardTitle>
                            <CardDescription>
                                Orderan baru dari user app yang perlu segera
                                dikirim.
                            </CardDescription>
                        </div>
                        <Badge className='w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                            {pendingFulfillment.length} order
                        </Badge>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {pendingFulfillment.map((order) => (
                            <div
                                key={order.id}
                                className='rounded-2xl border border-border/40 bg-muted/10 p-4'
                            >
                                <div className='flex flex-wrap items-start justify-between gap-3'>
                                    <div>
                                        <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                            {order.id}
                                        </p>
                                        <p className='text-lg font-semibold text-foreground'>
                                            {order.customer}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {order.product}
                                        </p>
                                    </div>
                                    <Button size='sm' className='gap-2'>
                                        <Truck className='h-4 w-4' />
                                        Tandai dikirim
                                    </Button>
                                </div>
                                <div className='mt-3 space-y-2 text-sm text-muted-foreground'>
                                    <p className='inline-flex items-start gap-2'>
                                        <MapPin className='mt-0.5 h-4 w-4 text-primary' />
                                        {order.address}
                                    </p>
                                    <p className='inline-flex items-center gap-2'>
                                        <Phone className='h-4 w-4 text-primary' />
                                        {order.phone}
                                    </p>
                                    <p className='rounded-lg bg-primary/5 px-3 py-1 text-xs font-semibold text-primary'>
                                        {order.eta}
                                    </p>
                                    <p className='rounded-lg bg-muted/40 px-3 py-1 text-xs'>
                                        {order.note}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Daftar transaksi
                            </CardTitle>
                            <CardDescription>
                                Rekap otomatis pesanan marketplace mini store.
                            </CardDescription>
                        </div>
                        <div className='flex w-full flex-col gap-2 sm:flex-row lg:w-auto'>
                            <div className='relative flex-1'>
                                <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                                <Input
                                    placeholder='Cari ID / pelanggan'
                                    className='w-full border-border/60 pl-10'
                                />
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Receipt className='h-4 w-4' />
                                Export CSV
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Pelanggan</TableHead>
                                        <TableHead>Produk</TableHead>
                                        <TableHead>Jumlah Produk</TableHead>
                                        <TableHead>
                                            Catatan Pengiriman
                                        </TableHead>
                                        <TableHead>Pembayaran</TableHead>
                                        <TableHead>Kontak</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockStoreTransactions.map((trx) => (
                                        <TableRow key={trx.id}>
                                            <TableCell className='font-semibold text-foreground'>
                                                {trx.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium text-foreground'>
                                                        {trx.customer}
                                                    </span>
                                                    <span className='text-xs text-muted-foreground'>
                                                        Order #{trx.id} •{" "}
                                                        {trx.date}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{trx.product}</TableCell>
                                            <TableCell>
                                                <span className='rounded-full bg-muted/40 px-2 py-0.5 text-xs font-semibold'>
                                                    {trx.quantity} item
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <p className='max-w-56 text-sm text-muted-foreground'>
                                                    {trx.shippingNote}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <span className='inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary'>
                                                    {trx.paymentMethod}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className='text-sm font-semibold text-foreground'>
                                                    {trx.contact}
                                                </div>
                                            </TableCell>
                                            <TableCell>{trx.date}</TableCell>
                                            <TableCell className='font-semibold text-foreground'>
                                                {trx.total}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                                                        transactionStatusStyles[
                                                            trx.status
                                                        ] ??
                                                        "bg-muted text-muted-foreground"
                                                    }`}
                                                >
                                                    {trx.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className='text-xs text-muted-foreground'>
                            Data sinkron setiap 5 menit. Klik salah satu baris
                            untuk melihat detail pesanan di tab baru.
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-5 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Transaksi terbaru
                            </CardTitle>
                            <CardDescription>
                                Catatan otomatis dari aplikasi user.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {[
                                {
                                    name: "Pomade Clay",
                                    user: "Rizky • SCBD",
                                    status: "Selesai",
                                },
                                {
                                    name: "Carbon comb",
                                    user: "Ivana • Menteng",
                                    status: "Pick up",
                                },
                                {
                                    name: "Home care kit",
                                    user: "Adrian • BSD",
                                    status: "Dikirim",
                                },
                            ].map((order) => (
                                <div
                                    key={order.name}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'
                                >
                                    <p className='text-base font-semibold text-foreground'>
                                        {order.name}
                                    </p>
                                    <p>{order.user}</p>
                                    <Badge
                                        variant='outline'
                                        className='mt-2 border-border/50 text-[10px] uppercase tracking-widest'
                                    >
                                        {order.status}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Log gudang
                            </CardTitle>
                            <CardDescription>
                                Pembaruan stok, penyesuaian manual, dan
                                pengiriman supplier.
                            </CardDescription>
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
                            <Button
                                variant='outline'
                                className='w-full border-border/60 gap-2'
                            >
                                <Package2 className='h-4 w-4' />
                                Lihat log lengkap
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Panduan produk unggulan
                        </CardTitle>
                        <CardDescription>
                            Mulai tambah produk baru dengan template konten siap
                            pakai.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-3 text-sm text-muted-foreground sm:grid-cols-2'>
                        <div>
                            <p className='font-semibold text-foreground'>
                                1. Upload foto kualitas tinggi
                            </p>
                            <p>
                                Gunakan background polos dan resolusi minimal
                                1080px agar tampak profesional.
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold text-foreground'>
                                2. Jelaskan manfaat utama
                            </p>
                            <p>
                                Tulis 2-3 poin manfaat dan highlight bahan utama
                                dalam deskripsi.
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold text-foreground'>
                                3. Atur status stok real-time
                            </p>
                            <p>
                                Pastikan status stok diperbarui agar pelanggan
                                tidak kecewa saat checkout.
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold text-foreground'>
                                4. Tambahkan tag promosi
                            </p>
                            <p>
                                Gunakan tag Best Seller atau Limited untuk
                                menambah rasa urgensi.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='gap-2' asChild>
                            <Link href='/owner/store/create'>
                                <PackageCheck className='h-4 w-4' />
                                Mulai registrasi produk
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Integrasi loyalitas
                        </CardTitle>
                        <CardDescription>
                            Produk tertentu bisa ditukar poin pelanggan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-3'>
                        {[
                            { label: "Produk dapat poin", value: "14 SKU" },
                            { label: "Redeem via poin", value: "9 SKU" },
                            { label: "Penukaran bulan ini", value: "312 item" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm'
                            >
                                <p className='text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
                                    <CheckCircle className='h-3.5 w-3.5 text-primary' />
                                    {item.label}
                                </p>
                                <p className='text-2xl font-bold text-foreground'>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
