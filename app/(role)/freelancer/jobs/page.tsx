"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
    Activity,
    BadgeCheck,
    CheckCircle2,
    Clock,
    Filter,
    MapPin,
    Menu,
    MessageCircle,
    Navigation,
    Phone,
    PencilLine,
    Route,
    Search,
    Scissors,
    Truck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PageShell } from "@/components/layout/page-shell";

// Synced with dashboard data
const todayJobs = [
    {
        id: "JOB-2391",
        customer: "Dimas Saputra",
        initials: "DS",
        time: "10:00 WIB",
        schedule: "11 Feb • 10:00 WIB",
        address: "Menara BCA Lt. 32, Jakarta Pusat",
        service: "Home Service Deluxe",
        distance: "8 km",
        travelTime: "25 menit",
        ongkir: "Rp 50.000",
        price: "Rp 280.000",
        status: "on-the-way",
        phone: "+62 812-8890-1122"
    },
    {
        id: "JOB-2387",
        customer: "Vino Mahardika",
        initials: "VM",
        time: "13:00 WIB",
        schedule: "11 Feb • 13:00 WIB",
        address: "Apartemen Senayan Residence Tower B",
        service: "Signature Fade + Steam",
        distance: "4 km",
        travelTime: "15 menit",
        ongkir: "Rp 30.000",
        price: "Rp 240.000",
        status: "confirmed",
        phone: "+62 811-5566-7788"
    },
    {
        id: "JOB-2384",
        customer: "Hafidz Rahman",
        initials: "HR",
        time: "15:30 WIB",
        schedule: "11 Feb • 15:30 WIB",
        address: "Apartemen Sudirman Park Tower A",
        service: "Home Service Basic",
        distance: "6 km",
        travelTime: "20 menit",
        ongkir: "Rp 40.000",
        price: "Rp 200.000",
        status: "upcoming",
        phone: "+62 813-7700-4511"
    },
    {
        id: "JOB-2380",
        customer: "Rizky Pratama",
        initials: "RP",
        time: "17:00 WIB",
        schedule: "11 Feb • 17:00 WIB",
        address: "Rumah Kebayoran Baru",
        service: "Classic Haircut",
        distance: "7 km",
        travelTime: "22 menit",
        ongkir: "Rp 45.000",
        price: "Rp 180.000",
        status: "upcoming",
        phone: "+62 812-3344-5566"
    }
] as const;

const completedToday = [
    {
        id: "JOB-2395",
        customer: "Ahmad Rizki",
        initials: "AR",
        time: "08:00 WIB",
        address: "Apartemen Sudirman",
        service: "Premium Haircut + Beard",
        distance: "12 km",
        price: "Rp 230.000",
        phone: "+62 811-2233-4455"
    }
] as const;

// Current active job (on-the-way or in-progress)
const currentJob = todayJobs[0];

// Journey timeline for current job
const journeySteps = [
    {
        label: "Berangkat dari lokasi sebelumnya",
        time: "09:30 WIB",
        note: "GPS tracking aktif • ETA 25 menit",
        status: "done" as const
    },
    {
        label: "Dalam perjalanan ke lokasi",
        time: "09:45 WIB",
        note: "8 km tersisa • Traffic normal",
        status: "current" as const
    },
    {
        label: "Tiba di lokasi pelanggan",
        time: "10:00 WIB",
        note: "Setup peralatan portable",
        status: "pending" as const
    },
    {
        label: "Service dimulai",
        time: "10:05 WIB",
        note: "Durasi estimasi 45-60 menit",
        status: "pending" as const
    }
] as const;

const statusConfig = {
    "on-the-way": {
        label: "On The Way",
        badge: "bg-blue-100 text-blue-700 border-blue-300"
    },
    confirmed: {
        label: "Confirmed",
        badge: "bg-green-100 text-green-700 border-green-300"
    },
    upcoming: {
        label: "Upcoming",
        badge: "bg-gray-100 text-gray-700 border-gray-300"
    },
    completed: {
        label: "Completed",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-300"
    }
} as const;

const statusActions = {
    "on-the-way": [
        {
            label: "Tiba di lokasi",
            description: "Update status sudah sampai",
            icon: MapPin
        },
        {
            label: "Ada kendala",
            description: "Laporkan jika ada masalah",
            icon: Activity
        }
    ],
    confirmed: [
        {
            label: "Mulai perjalanan",
            description: "Update status OTW",
            icon: Truck
        }
    ],
    upcoming: [
        {
            label: "Konfirmasi job",
            description: "Accept dan siap berangkat",
            icon: CheckCircle2
        }
    ]
} as const;

const timelineStyles = {
    done: "border-green-300 bg-green-100 text-green-700",
    current: "border-blue-300 bg-blue-100 text-blue-700",
    pending: "border-gray-300 bg-gray-100 text-gray-400"
} as const;

const summaryMetrics = [
    {
        label: "Job hari ini",
        value: "4 job",
        helper: "1 completed, 1 on the way, 2 upcoming",
        icon: Route
    },
    {
        label: "Total jarak",
        value: "31 km",
        helper: "Termasuk perjalanan completed",
        icon: Navigation
    },
    {
        label: "Estimasi earning",
        value: "Rp 1,05 jt",
        helper: "Service + ongkir hari ini",
        icon: BadgeCheck
    },
    {
        label: "Next job",
        value: "13:00 WIB",
        helper: "Vino • Senayan (4 km)",
        icon: Clock
    }
] as const;

type BookingActionMenuProps = {
    job: typeof todayJobs[number];
    handlePlaceholderAction: (event: Event) => void;
    align?: "start" | "center" | "end";
};

function BookingActionMenu({
    job,
    handlePlaceholderAction,
    align = "end",
}: BookingActionMenuProps) {
    const telHref = `tel:${job.phone}`;
    const actions = statusActions[job.status] || [];

    return (
        <DropdownMenuContent
            align={align}
            className="min-w-[16rem] space-y-1 rounded-lg border border-border/50 bg-card/95 p-2 shadow-lg backdrop-blur"
        >
            <DropdownMenuLabel className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Tindakan Job
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link
                    href={`/freelancer/jobs/${job.id.toLowerCase()}`}
                    className="flex items-start gap-3 text-sm"
                >
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                            Lihat detail job
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                            Info lengkap & riwayat komunikasi
                        </span>
                    </div>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a href={telHref} className="flex items-start gap-3 text-sm">
                    <MessageCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                            Hubungi pelanggan
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                            Telepon atau WhatsApp
                        </span>
                    </div>
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a
                    href={`https://maps.google.com?q=${job.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm"
                >
                    <Navigation className="mt-0.5 h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                            Buka di Maps
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                            Navigate ke lokasi pelanggan
                        </span>
                    </div>
                </a>
            </DropdownMenuItem>
            {actions.length > 0 && (
                <>
                    <DropdownMenuSeparator className="bg-border/40" />
                    {actions.map(({ label, description, icon: Icon }) => (
                        <DropdownMenuItem
                            key={label}
                            onSelect={handlePlaceholderAction}
                            className="flex items-start gap-3 text-sm"
                        >
                            <Icon className="mt-0.5 h-4 w-4 text-primary" />
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground">
                                    {label}
                                </span>
                                {description && (
                                    <span className="text-[11px] text-muted-foreground">
                                        {description}
                                    </span>
                                )}
                            </div>
                        </DropdownMenuItem>
                    ))}
                </>
            )}
        </DropdownMenuContent>
    );
}

export default function FreelancerBookingPage() {
    const handlePlaceholderAction = useCallback((event: Event) => {
        event.preventDefault();
    }, []);

    const upcomingJobs = todayJobs.filter(
        (job) => job.status === "confirmed" || job.status === "upcoming"
    );

    return (
        <PageShell background="soft" contentClassName="gap-6">
            {/* Header */}
            <Card className="border-border/50">
                <CardContent className="flex items-center gap-4 p-6">
                    <Avatar className="h-16 w-16 border-2 border-primary/40 shadow-lg">
                        <AvatarImage src="/placeholder.jpg" alt="Naya Pratama" />
                        <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                            NP
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge
                                variant="outline"
                                className="border-border/60 bg-muted/20 text-[9px] font-semibold uppercase"
                            >
                                Freelancer
                            </Badge>
                            <Badge
                                variant="outline"
                                className="border-border/60 bg-muted/20 text-[9px] font-semibold uppercase"
                            >
                                Home Service
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold">Naya Pratama</h1>
                        <p className="text-sm text-muted-foreground">
                            Mobile Grooming Specialist
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Metrics */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle>Ringkasan hari ini</CardTitle>
                    <CardDescription>
                        Overview job, jarak, dan earning estimasi
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryMetrics.map(({ label, value, helper, icon: Icon }) => (
                        <div
                            key={label}
                            className="rounded-xl border border-border/40 bg-muted/20 p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <Badge
                                    variant="outline"
                                    className="border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground"
                                >
                                    {label}
                                </Badge>
                            </div>
                            <p className="text-2xl font-bold text-foreground">
                                {value}
                            </p>
                            <p className="text-xs text-muted-foreground">{helper}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Current Job Journey */}
            <Card className="border-border/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Job sedang berlangsung</CardTitle>
                            <CardDescription>
                                Real-time tracking perjalanan dan status
                            </CardDescription>
                        </div>
                        <Badge className="bg-blue-600 text-white">
                            {currentJob.time}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
                    {/* Current Job Detail */}
                    <div className="space-y-4">
                        <div className="rounded-xl border border-blue-300 bg-blue-50 p-5">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                                        {currentJob.id}
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-foreground">
                                        {currentJob.customer}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {currentJob.service}
                                    </p>
                                </div>
                                <Badge className={statusConfig[currentJob.status].badge}>
                                    {statusConfig[currentJob.status].label}
                                </Badge>
                            </div>
                            <div className="grid gap-2 text-sm">
                                <div className="flex items-center gap-2 rounded-lg border border-blue-300 bg-white p-3">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <span>{currentJob.address}</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-blue-300 bg-white p-3">
                                    <Navigation className="h-4 w-4 text-blue-600" />
                                    <span>
                                        {currentJob.distance} • {currentJob.travelTime}{" "}
                                        perjalanan
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border border-blue-300 bg-white p-3">
                                    <Truck className="h-4 w-4 text-blue-600" />
                                    <span>Ongkir: {currentJob.ongkir}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button size="sm" className="flex-1" asChild>
                                    <a
                                        href={`https://maps.google.com?q=${currentJob.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Navigation className="h-4 w-4" />
                                        Navigate
                                    </a>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    asChild
                                >
                                    <a href={`tel:${currentJob.phone}`}>
                                        <Phone className="h-4 w-4" />
                                        Hubungi
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Journey Timeline */}
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-muted-foreground">
                                Progress perjalanan
                            </p>
                            {journeySteps.map((step) => (
                                <div
                                    key={step.label}
                                    className="flex items-start gap-3 rounded-lg border border-border/40 bg-card p-3"
                                >
                                    <span
                                        className={`flex h-10 w-10 items-center justify-center rounded-full border ${timelineStyles[step.status]}`}
                                    >
                                        {step.status === "done" ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : step.status === "current" ? (
                                            <Activity className="h-4 w-4" />
                                        ) : (
                                            <Clock className="h-4 w-4" />
                                        )}
                                    </span>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-foreground">
                                                {step.label}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] uppercase"
                                            >
                                                {step.time}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {step.note}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Jobs */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-muted-foreground">
                                Upcoming jobs
                            </p>
                            <Badge
                                variant="outline"
                                className="border-border/50 text-[10px] uppercase"
                            >
                                {upcomingJobs.length} job
                            </Badge>
                        </div>
                        <div className="space-y-3">
                            {upcomingJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="rounded-xl border border-border/40 bg-muted/20 p-4"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                {job.customer}
                                            </p>
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                {job.id}
                                            </p>
                                        </div>
                                        <Badge className={statusConfig[job.status].badge}>
                                            {statusConfig[job.status].label}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                            {job.time} • {job.travelTime} perjalanan
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-3.5 w-3.5 text-primary" />
                                            {job.address}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Scissors className="h-3.5 w-3.5 text-primary" />
                                            {job.service}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* All Jobs Table */}
            <Card className="border-border/50">
                <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <CardTitle>Semua job hari ini</CardTitle>
                        <CardDescription>
                            Completed dan upcoming home service jobs
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama atau ID"
                                className="pl-9 w-64"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Mobile View */}
                    <div className="space-y-3 lg:hidden">
                        {completedToday.map((job) => (
                            <div
                                key={job.id}
                                className="rounded-xl border border-border/40 bg-muted/15 p-4 opacity-60"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-border/40">
                                            <AvatarImage
                                                src="/placeholder.jpg"
                                                alt={job.customer}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                                {job.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                {job.customer}
                                            </p>
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                {job.id}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-700">
                                        Completed
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                    <p className="flex items-center gap-2">
                                        <Clock className="h-3.5 w-3.5 text-primary" />
                                        {job.time}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin className="h-3.5 w-3.5 text-primary" />
                                        {job.address}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Scissors className="h-3.5 w-3.5 text-primary" />
                                        {job.service}
                                    </p>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-emerald-600">
                                    {job.price}
                                </p>
                            </div>
                        ))}
                        {todayJobs.map((job) => (
                            <div
                                key={job.id}
                                className="rounded-xl border border-border/40 bg-muted/15 p-4"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-border/40">
                                            <AvatarImage
                                                src="/placeholder.jpg"
                                                alt={job.customer}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                                {job.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                {job.customer}
                                            </p>
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                {job.id}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className={statusConfig[job.status].badge}>
                                        {statusConfig[job.status].label}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                                    <p className="flex items-center gap-2">
                                        <Clock className="h-3.5 w-3.5 text-primary" />
                                        {job.schedule}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin className="h-3.5 w-3.5 text-primary" />
                                        {job.address}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Scissors className="h-3.5 w-3.5 text-primary" />
                                        {job.service}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-foreground">
                                        {job.price}
                                    </p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-border/60"
                                            >
                                                <PencilLine className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <BookingActionMenu
                                            job={job}
                                            handlePlaceholderAction={
                                                handlePlaceholderAction
                                            }
                                        />
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="max-lg:hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pelanggan</TableHead>
                                    <TableHead>Jadwal & Lokasi</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Travel</TableHead>
                                    <TableHead className="text-center">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Tarif
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {completedToday.map((job) => (
                                    <TableRow key={job.id} className="opacity-60">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-border/40">
                                                    <AvatarImage
                                                        src="/placeholder.jpg"
                                                        alt={job.customer}
                                                    />
                                                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                                        {job.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">
                                                        {job.customer}
                                                    </p>
                                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                        {job.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs">
                                            <p className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-primary" />
                                                {job.time}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                                {job.address}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {job.service}
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            {job.distance}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className="bg-emerald-100 text-emerald-700">
                                                Completed
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-semibold">
                                            {job.price}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/freelancer/jobs/${job.id.toLowerCase()}`}
                                                >
                                                    Detail
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {todayJobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-border/40">
                                                    <AvatarImage
                                                        src="/placeholder.jpg"
                                                        alt={job.customer}
                                                    />
                                                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                                        {job.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">
                                                        {job.customer}
                                                    </p>
                                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                                        {job.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs">
                                            <p className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-primary" />
                                                {job.schedule}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                                {job.address}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {job.service}
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            <p>{job.distance}</p>
                                            <p>{job.travelTime}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                className={
                                                    statusConfig[job.status].badge
                                                }
                                            >
                                                {statusConfig[job.status].label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-semibold">
                                            {job.price}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-border/60"
                                                    >
                                                        <PencilLine className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <BookingActionMenu
                                                    job={job}
                                                    handlePlaceholderAction={
                                                        handlePlaceholderAction
                                                    }
                                                />
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableCaption>
                                Data auto-sync dari aplikasi TrimTime. Update status
                                untuk notifikasi pelanggan.
                            </TableCaption>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </PageShell>
    );
}