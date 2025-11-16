"use client";

import { useState } from "react";

import {
    ArrowRight,
    Clock,
    MapPin,
    MessageCircle,
    Navigation,
    Phone,
    Route,
    Truck,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogContent,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const activeTrip = {
    id: "HS-4473",
    customer: "Reyhan Fadil",
    phone: "0812-8890-1122",
    pickup: "TrimTime HQ, SCBD",
    destination: "Menara BCA Lt. 32",
    distance: "4,2 km",
    eta: "12 menit lagi",
    fee: "Rp 25.000",
    status: "on-the-way",
} as const;

const queueRequests = [
    {
        id: "HS-4474",
        customer: "Indra Syahputra",
        schedule: "11 Feb • 13:30",
        address: "Cluster Kemang Pratama, Bekasi",
        distance: "8,6 km",
        fee: "Rp 30.000",
        status: "awaiting",
    },
    {
        id: "HS-4475",
        customer: "Gabriella Prameswari",
        schedule: "11 Feb • 15:00",
        address: "Apartemen Sudirman Park Tower A",
        distance: "5,1 km",
        fee: "Rp 22.000",
        status: "awaiting",
    },
    {
        id: "HS-4476",
        customer: "Yoga Mahendra",
        schedule: "11 Feb • 16:30",
        address: "Soho Podomoro City, Lantai 12",
        distance: "6,4 km",
        fee: "Rp 24.000",
        status: "draft",
    },
] as const;

const queueStatusLabel = {
    awaiting: "Menunggu konfirmasi",
    draft: "Butuh jadwal ulang",
} satisfies Record<string, string>;

const statusUpdateOptions = [
    {
        id: "on-the-way",
        label: "Sedang OTW",
        helper: "Barber masih dalam perjalanan",
    },
    {
        id: "arrived",
        label: "Tiba di lokasi",
        helper: "Barber sudah sampai di alamat pelanggan",
    },
    {
        id: "in-service",
        label: "Layanan dimulai",
        helper: "Sedang menyiapkan perlengkapan layanan",
    },
    {
        id: "completed",
        label: "Layanan selesai",
        helper: "Siap kirim ringkasan & permintaan rating",
    },
] as const;

type StatusUpdateId = (typeof statusUpdateOptions)[number]["id"];

export default function BarberHomeServicePage() {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StatusUpdateId>(
        statusUpdateOptions[0].id
    );
    const [statusNote, setStatusNote] = useState<string>("");

    const handleSubmitStatus = () => {
        // Placeholder action – integrate with API later
        setStatusModalOpen(false);
        setStatusNote("");
    };

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-12 w-12 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Rama Putra'
                                />
                                <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                    RP
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber-Owner
                                    </Badge>
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    Barber
                                </p>
                                <h2 className='text-xl font-bold tracking-tight text-foreground'>
                                    Rama Putra
                                </h2>
                            </div>
                        </div>
                        <div className='grid gap-3 text-xs text-muted-foreground sm:grid-cols-2 lg:w-auto lg:grid-cols-3'>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Truck className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Home service aktif
                                    </p>
                                    <p>Perjalanan: 3 (1 OTW)</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <MapPin className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        TrimTime HQ
                                    </p>
                                    <p>Menara BCA, Jakarta</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Clock className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Jadwal berikutnya
                                    </p>
                                    <p>11 Feb • 13:30 WIB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className='border-border/50 bg-card/80 shadow-sm'>
                        <CardContent className='space-y-4'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <Truck className='h-4 w-4' />
                                Home Service Tracker
                            </div>
                            <div className='space-y-3'>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    Pantau perjalanan barber dalam satu tampilan
                                </h1>
                                <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                    Kelola status berangkat, tiba, hingga
                                    selesai sambil memantau estimasi jarak,
                                    ongkir, dan notifikasi agar pelanggan selalu
                                    terinformasi tepat waktu.
                                </p>
                            </div>
                            <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
                                <Badge className='bg-primary/10 text-primary'>
                                    Auto-sync POS
                                </Badge>
                                <Badge
                                    variant='outline'
                                    className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                >
                                    Integrasi notifikasi SMS & WA
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <main className='space-y-5 px-5 pt-4 pb-6 lg:px-8 lg:pb-8'>
                <div className='grid gap-5'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Peta perjalanan aktif
                                </CardTitle>
                                <CardDescription>
                                    Pastikan barber tiba tepat waktu dan
                                    pelanggan senantiasa menerima pembaruan
                                    terbaru.
                                </CardDescription>
                            </div>
                            <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                <Badge className='bg-primary text-primary-foreground shadow-sm'>
                                    {activeTrip.status === "on-the-way"
                                        ? "Sedang OTW"
                                        : "Status tidak diketahui"}
                                </Badge>
                                <Badge
                                    variant='outline'
                                    className='border-border/50'
                                >
                                    ID {activeTrip.id}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/80 p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between'>
                                <div className='space-y-2 text-sm text-muted-foreground'>
                                    <div className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                        <span>Perjalanan saat ini</span>
                                        <Badge
                                            variant='outline'
                                            className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            Live GPS
                                        </Badge>
                                    </div>
                                    <p className='text-foreground text-lg font-bold'>
                                        {activeTrip.customer}
                                    </p>
                                    <p>Tujuan: {activeTrip.destination}</p>
                                    <p>
                                        Estimasi tiba dalam{" "}
                                        <span className='font-semibold text-foreground'>
                                            {activeTrip.eta}
                                        </span>
                                    </p>
                                </div>
                                <Button className='w-full lg:w-auto'>
                                    Kirim pembaruan ke pelanggan
                                </Button>
                            </div>
                            <div className='relative overflow-hidden rounded-2xl border border-border/40'>
                                <div className='absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-accent/20' />
                                <div className='relative flex h-64 flex-col justify-between bg-[url("/map-placeholder.svg")] bg-cover bg-center p-5 sm:h-72'>
                                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                        <div className='flex items-center gap-2'>
                                            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow'>
                                                <Navigation className='h-4 w-4' />
                                            </span>
                                            <div>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {activeTrip.pickup}
                                                </p>
                                                <p>Berangkat pukul 10:05 WIB</p>
                                            </div>
                                        </div>
                                        <div className='rounded-full border border-border/40 bg-card/80 px-3 py-1 text-[10px] uppercase tracking-widest'>
                                            Tracking realtime
                                        </div>
                                    </div>
                                    <div className='rounded-2xl border border-border/40 bg-card/90 p-4 text-xs text-muted-foreground shadow-sm backdrop-blur'>
                                        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                            <div className='space-y-1'>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {activeTrip.destination}
                                                </p>
                                                <p className='flex items-center gap-1'>
                                                    <MapPin className='h-3.5 w-3.5 text-primary' />
                                                    {activeTrip.distance} •{" "}
                                                    {activeTrip.eta}
                                                </p>
                                            </div>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='border-border/60'
                                                >
                                                    <Route className='h-3.5 w-3.5' />
                                                    Buka di Maps
                                                </Button>
                                                <Button
                                                    size='sm'
                                                    onClick={() =>
                                                        setStatusModalOpen(true)
                                                    }
                                                >
                                                    Update status
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid gap-3 sm:grid-cols-3'>
                                <div className='rounded-xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    <p className='font-semibold uppercase tracking-widest text-foreground'>
                                        Ongkir
                                    </p>
                                    <p className='mt-1 text-lg font-bold text-foreground'>
                                        {activeTrip.fee}
                                    </p>
                                    <p>
                                        Otomatis ditambahkan ke invoice
                                        pelanggan.
                                    </p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    <p className='font-semibold uppercase tracking-widest text-foreground'>
                                        Estimasi perjalanan
                                    </p>
                                    <p className='mt-1 text-lg font-bold text-foreground'>
                                        {activeTrip.distance}
                                    </p>
                                    <p>Rute tercepat via Jl. Sudirman.</p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    <p className='font-semibold uppercase tracking-widest text-foreground'>
                                        Kontak pelanggan
                                    </p>
                                    <div className='mt-1 flex flex-wrap items-center gap-2 text-sm text-foreground'>
                                        <Phone className='h-4 w-4 text-primary' />
                                        {activeTrip.phone}
                                    </div>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='mt-2 w-full border-border/60'
                                    >
                                        <MessageCircle className='h-3.5 w-3.5' />
                                        Kirim pesan cepat
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-5'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2'>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Antrean berikutnya
                            </CardTitle>
                            <CardDescription>
                                Susun slot waktu dan ongkir sebelum barber
                                diberangkatkan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {queueRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className='space-y-3 rounded-xl border border-border/40 bg-muted/20 p-4'
                                >
                                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                        <p className='font-semibold uppercase tracking-widest text-foreground'>
                                            {request.customer}
                                        </p>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            {request.id}
                                        </Badge>
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        <p className='flex items-center gap-1'>
                                            <Clock className='h-3.5 w-3.5 text-primary' />
                                            {request.schedule}
                                        </p>
                                        <p className='mt-1 flex items-center gap-1'>
                                            <MapPin className='h-3.5 w-3.5 text-primary' />
                                            {request.address}
                                        </p>
                                        <div className='mt-2 flex flex-wrap items-center gap-2'>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 bg-background/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {request.distance}
                                            </Badge>
                                            <Badge className='bg-primary/15 text-xs font-medium text-primary'>
                                                Ongkir {request.fee}
                                            </Badge>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {
                                                    queueStatusLabel[
                                                        request.status
                                                    ]
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-2 text-xs'>
                                        <Button
                                            size='sm'
                                            variant='outline'
                                            className='border-border/60'
                                        >
                                            Cek detail
                                        </Button>
                                        <Button size='sm'>
                                            Konfirmasi jadwal
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Rencanakan rute
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Kelompokkan permintaan berdasarkan area agar
                                    perjalanan lebih efisien dan ongkir tetap
                                    kompetitif.
                                </p>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='mt-3 border-border/60'
                                >
                                    <ArrowRight className='h-3.5 w-3.5' />
                                    Lihat peta rute
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update status perjalanan</DialogTitle>
                        <DialogDescription>
                            Pilih status terbaru untuk dikirim ke pelanggan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-3'>
                        {statusUpdateOptions.map((option) => (
                            <button
                                key={option.id}
                                type='button'
                                onClick={() => setSelectedStatus(option.id)}
                                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                                    selectedStatus === option.id
                                        ? "border-primary bg-primary/5 text-foreground"
                                        : "border-border/60 text-muted-foreground hover:border-border"
                                }`}
                            >
                                <p className='font-semibold text-foreground'>
                                    {option.label}
                                </p>
                                <p className='text-xs'>{option.helper}</p>
                            </button>
                        ))}
                        <div className='space-y-2'>
                            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                Catatan tambahan
                            </p>
                            <Textarea
                                placeholder='Contoh: Barber akan tiba 5 menit lagi.'
                                value={statusNote}
                                onChange={(event) =>
                                    setStatusNote(event.target.value)
                                }
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter className='mt-4'>
                        <Button
                            variant='outline'
                            onClick={() => setStatusModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button onClick={handleSubmitStatus}>
                            Kirim pembaruan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageShell>
    );
}
