"use client";

import {
    ArrowRight,
    CheckCircle2,
    Clock,
    MapPin,
    MessageCircle,
    Navigation,
    Phone,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogContent,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Synced with dashboard data
const currentJob = {
    id: "JOB-2391",
    customer: "Dimas Saputra",
    initials: "DS",
    phone: "+62 812-8890-1122",
    address: "Menara BCA Lt. 32, Jakarta Pusat",
    service: "Home Service Deluxe",
    time: "10:00 WIB",
    distance: "8 km",
    travelTime: "25 menit",
    ongkir: "Rp 50.000",
    price: "Rp 280.000",
    status: "on-the-way",
    departedFrom: "Apartemen Sudirman (Job sebelumnya)",
    departedAt: "09:35 WIB",
    eta: "10:00 WIB"
} as const;

const upcomingJobs = [
    {
        id: "JOB-2387",
        customer: "Vino Mahardika",
        initials: "VM",
        time: "13:00 WIB",
        address: "Apartemen Senayan Residence Tower B",
        service: "Signature Fade + Steam",
        distanceFromCurrent: "4 km",
        travelTime: "15 menit",
        ongkir: "Rp 30.000",
        price: "Rp 240.000",
        phone: "+62 811-5566-7788"
    },
    {
        id: "JOB-2384",
        customer: "Hafidz Rahman",
        initials: "HR",
        time: "15:30 WIB",
        address: "Apartemen Sudirman Park Tower A",
        service: "Home Service Basic",
        distanceFromCurrent: "6 km",
        travelTime: "20 menit",
        ongkir: "Rp 40.000",
        price: "Rp 200.000",
        phone: "+62 813-7700-4511"
    }
] as const;

const journeySteps = [
    {
        label: "Berangkat dari lokasi sebelumnya",
        time: "09:35 WIB",
        note: "Sudah confirm via WhatsApp",
        status: "done" as const
    },
    {
        label: "Dalam perjalanan",
        time: "09:50 WIB",
        note: "ETA 10:00 WIB • Traffic normal",
        status: "current" as const
    },
    {
        label: "Tiba di lokasi",
        time: "10:00 WIB",
        note: "Konfirmasi arrival via app",
        status: "next" as const
    },
    {
        label: "Service dimulai",
        time: "10:05 WIB",
        note: "Setup peralatan portable",
        status: "next" as const
    }
] as const;

const timelineStyles = {
    done: "bg-green-100 text-green-700 border-green-300",
    current: "bg-blue-100 text-blue-700 border-blue-300",
    next: "bg-gray-100 text-gray-400 border-gray-300",
} as const;

const statusUpdateOptions = [
    {
        id: "on-the-way",
        label: "Sedang OTW",
        helper: "Barber dalam perjalanan ke lokasi"
    },
    {
        id: "arrived",
        label: "Tiba di lokasi",
        helper: "Sudah sampai, siap setup peralatan"
    },
    {
        id: "in-service",
        label: "Service dimulai",
        helper: "Sedang melayani pelanggan"
    },
    {
        id: "completed",
        label: "Service selesai",
        helper: "Siap ke job berikutnya"
    }
] as const;

type StatusUpdateId = (typeof statusUpdateOptions)[number]["id"];

export default function FreelancerHomeServicePage() {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StatusUpdateId>(
        statusUpdateOptions[0].id
    );
    const [statusNote, setStatusNote] = useState<string>("");

    const handleSubmitStatus = () => {
        setStatusModalOpen(false);
        setStatusNote("");
    };

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

            {/* Current Journey Status */}
            <Card className="border-blue-300 bg-blue-50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-blue-900">
                                Job sedang berlangsung
                            </CardTitle>
                            <CardDescription className="text-blue-700">
                                On the way ke lokasi pelanggan
                            </CardDescription>
                        </div>
                        <Badge className="bg-blue-600 text-white">
                            {currentJob.time}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Customer Info Card */}
                    <div className="rounded-xl border border-blue-300 bg-white p-5">
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-blue-300">
                                    <AvatarImage
                                        src="/placeholder.jpg"
                                        alt={currentJob.customer}
                                    />
                                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                                        {currentJob.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-blue-700">
                                        {currentJob.id}
                                    </p>
                                    <p className="text-xl font-bold text-foreground">
                                        {currentJob.customer}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {currentJob.service}
                                    </p>
                                </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                                On The Way
                            </Badge>
                        </div>

                        {/* Journey Info */}
                        <div className="grid gap-2 mb-4">
                            <div className="flex items-start gap-2 text-sm">
                                <MapPin className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground">
                                        Tujuan
                                    </p>
                                    <p className="text-muted-foreground">
                                        {currentJob.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <Navigation className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground">
                                        Jarak & Waktu
                                    </p>
                                    <p className="text-muted-foreground">
                                        {currentJob.distance} • {currentJob.travelTime} perjalanan
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <Truck className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground">
                                        Berangkat dari
                                    </p>
                                    <p className="text-muted-foreground">
                                        {currentJob.departedFrom} • {currentJob.departedAt}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <Clock className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground">
                                        ETA
                                    </p>
                                    <p className="text-muted-foreground">
                                        Estimasi tiba {currentJob.eta}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button asChild>
                                <a
                                    href={`https://maps.google.com?q=${currentJob.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Navigation className="h-4 w-4" />
                                    Navigate
                                </a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href={`tel:${currentJob.phone}`}>
                                    <Phone className="h-4 w-4" />
                                    Call
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="col-span-2"
                            >
                                <a
                                    href={`https://wa.me/${currentJob.phone.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Journey Progress */}
                    <div className="rounded-xl border border-blue-300 bg-white p-4">
                        <p className="text-sm font-semibold text-foreground mb-3">
                            Progress perjalanan
                        </p>
                        <div className="space-y-3">
                            {journeySteps.map((step) => (
                                <div
                                    key={step.label}
                                    className="flex items-start gap-3"
                                >
                                    <span
                                        className={`flex h-10 w-10 items-center justify-center rounded-full border flex-shrink-0 ${timelineStyles[step.status]}`}
                                    >
                                        {step.status === "done" ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : step.status === "current" ? (
                                            <Truck className="h-4 w-4" />
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
                        <Button
                            className="w-full mt-4"
                            onClick={() => setStatusModalOpen(true)}
                        >
                            Update status perjalanan
                        </Button>
                    </div>

                    {/* Earnings Info */}
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-lg border border-blue-300 bg-white p-3">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                Ongkir
                            </p>
                            <p className="text-lg font-bold text-foreground">
                                {currentJob.ongkir}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-300 bg-white p-3">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                Service fee
                            </p>
                            <p className="text-lg font-bold text-foreground">
                                {currentJob.price}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming Jobs */}
            <Card className="border-border/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Upcoming jobs hari ini</CardTitle>
                            <CardDescription>
                                Job berikutnya setelah current job selesai
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {upcomingJobs.length} job
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {upcomingJobs.map((job) => (
                        <div
                            key={job.id}
                            className="rounded-xl border border-border/40 bg-muted/20 p-4"
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
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                            {job.id}
                                        </p>
                                        <p className="text-sm font-semibold text-foreground">
                                            {job.customer}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {job.service}
                                        </p>
                                    </div>
                                </div>
                                <Badge className="bg-green-100 text-green-700">
                                    {job.time}
                                </Badge>
                            </div>
                            <div className="space-y-2 text-sm mb-3">
                                <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    {job.address}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Navigation className="h-4 w-4 text-primary" />
                                    <span className="font-semibold text-primary">
                                        {job.distanceFromCurrent}
                                    </span>
                                    <span className="text-muted-foreground">
                                        dari Menara BCA • {job.travelTime}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Truck className="h-4 w-4 text-primary" />
                                    Ongkir: {job.ongkir}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" asChild>
                                    <a href={`tel:${job.phone}`}>
                                        <Phone className="h-3.5 w-3.5" />
                                        Call
                                    </a>
                                </Button>
                                <Button size="sm" variant="outline" asChild>
                                    <a
                                        href={`https://maps.google.com?q=${job.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Navigation className="h-3.5 w-3.5" />
                                        Preview rute
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle>Tips untuk on-time arrival</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4">
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">
                                    Berangkat 15 menit lebih awal
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Antisipasi traffic dan cari parkir untuk on-time
                                    arrival
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4">
                        <div className="flex items-start gap-3">
                            <MessageCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">
                                    Konfirmasi 30 menit sebelum
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    WhatsApp pelanggan untuk confirm alamat dan akses
                                    parkir
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4">
                        <div className="flex items-start gap-3">
                            <Navigation className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">
                                    Gunakan live traffic
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Google Maps live traffic untuk avoid macet
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Status Update Dialog */}
            <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update status perjalanan</DialogTitle>
                        <DialogDescription>
                            Update status untuk notifikasi pelanggan otomatis
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        {statusUpdateOptions.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setSelectedStatus(option.id)}
                                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                                    selectedStatus === option.id
                                        ? "border-primary bg-primary/5 text-foreground"
                                        : "border-border/60 text-muted-foreground hover:border-border"
                                }`}
                            >
                                <p className="font-semibold text-foreground">
                                    {option.label}
                                </p>
                                <p className="text-xs">{option.helper}</p>
                            </button>
                        ))}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Catatan tambahan (opsional)
                            </p>
                            <Textarea
                                placeholder="Contoh: Traffic padat, tiba 10 menit lagi"
                                value={statusNote}
                                onChange={(event) =>
                                    setStatusNote(event.target.value)
                                }
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setStatusModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button onClick={handleSubmitStatus}>
                            <ArrowRight className="h-4 w-4" />
                            Update status
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageShell>
    );
}