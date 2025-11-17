"use client";

import { useState, useMemo } from "react";
import {
	ArrowRight,
	Clock,
	MapPin,
	MessageCircle,
	Navigation,
	Phone,
	Route,
	Truck,
	CheckCircle2,
	PackageCheck,
	Scissors,
} from "lucide-react";

import { cn } from "@/lib/utils"; // <--- INI IMPORT YANG HILANG (sekarang sudah ada)
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

// --- Tipe Status ---
type HomeServiceStatus =
	| "awaiting"
	| "confirmed"
	| "on-the-way"
	| "arrived"
	| "in-service"
	| "completed"
	| "draft"
	| "cancelled";

// --- Data Mock (Digabung) ---
const initialHomeServiceJobs = [
	{
		id: "HS-4473",
		customer: "Reyhan Fadil",
		phone: "0812-8890-1122",
		pickup: "TrimTime HQ, SCBD",
		destination: "Menara BCA Lt. 32",
		distance: "4,2 km",
		eta: "12 menit lagi",
		fee: "Rp 25.000",
		status: "on-the-way" as HomeServiceStatus,
		schedule: "11 Feb • 10:30",
	},
	{
		id: "HS-4474",
		customer: "Indra Syahputra",
		schedule: "11 Feb • 13:30",
		address: "Cluster Kemang Pratama, Bekasi",
		distance: "8,6 km",
		fee: "Rp 30.000",
		status: "awaiting" as HomeServiceStatus,
	},
	{
		id: "HS-4475",
		customer: "Gabriella Prameswari",
		schedule: "11 Feb • 15:00",
		address: "Apartemen Sudirman Park Tower A",
		distance: "5,1 km",
		fee: "Rp 22.000",
		status: "awaiting" as HomeServiceStatus,
	},
	{
		id: "HS-4476",
		customer: "Yoga Mahendra",
		schedule: "11 Feb • 16:30",
		address: "Soho Podomoro City, Lantai 12",
		distance: "6,4 km",
		fee: "Rp 24.000",
		status: "draft" as HomeServiceStatus,
	},
];

// --- Label Status ---
const statusLabels: Record<HomeServiceStatus, string> = {
	awaiting: "Menunggu Konfirmasi",
	confirmed: "Terkonfirmasi",
	"on-the-way": "Sedang OTW",
	arrived: "Tiba di Lokasi",
	"in-service": "Layanan Berjalan",
	completed: "Selesai",
	draft: "Butuh Jadwal Ulang",
	cancelled: "Dibatalkan",
};

// --- Style Badge Status ---
const statusBadgeStyles: Record<HomeServiceStatus, string> = {
	awaiting: "bg-amber-500/15 text-amber-600",
	confirmed: "bg-primary/10 text-primary",
	"on-the-way": "bg-blue-500/15 text-blue-600",
	arrived: "bg-indigo-500/15 text-indigo-600",
	"in-service": "bg-sky-500/15 text-sky-600",
	completed: "bg-emerald-500/15 text-emerald-600",
	draft: "bg-gray-500/15 text-gray-600",
	cancelled: "bg-destructive/10 text-destructive",
};

// --- Komponen Tombol Aksi ---
function HomeServiceActions({
	job,
	onUpdateStatus,
}: {
	job: (typeof initialHomeServiceJobs)[number];
	onUpdateStatus: (id: string, newStatus: HomeServiceStatus) => void;
}) {
	const { status, id } = job;

	switch (status) {
		case "awaiting":
			return (
				<Button
					size="sm"
					className="w-full"
					onClick={() => onUpdateStatus(id, "confirmed")}
				>
					<CheckCircle2 className="mr-2 h-4 w-4" />
					Konfirmasi Jadwal
				</Button>
			);
		case "confirmed":
			return (
				<Button
					size="sm"
					className="w-full"
					onClick={() => onUpdateStatus(id, "on-the-way")}
				>
					<Navigation className="mr-2 h-4 w-4" />
					Mulai Perjalanan (OTW)
				</Button>
			);
		case "on-the-way":
			return (
				<Button
					size="sm"
					className="w-full"
					onClick={() => onUpdateStatus(id, "arrived")}
				>
					<PackageCheck className="mr-2 h-4 w-4" />
					Tiba di Lokasi
				</Button>
			);
		case "arrived":
			return (
				<Button
					size="sm"
					className="w-full"
					onClick={() => onUpdateStatus(id, "in-service")}
				>
					<Scissors className="mr-2 h-4 w-4" />
					Mulai Layanan
				</Button>
			);
		case "in-service":
			return (
				<Button
					size="sm"
					className="w-full"
					onClick={() => onUpdateStatus(id, "completed")}
				>
					<CheckCircle2 className="mr-2 h-4 w-4" />
					Selesaikan Layanan
				</Button>
			);
		default:
			return null;
	}
}

// --- Komponen Kartu Jadwal ---
function HomeServiceJobCard({
	job,
	onUpdateStatus,
}: {
	job: (typeof initialHomeServiceJobs)[number];
	onUpdateStatus: (id: string, newStatus: HomeServiceStatus) => void;
}) {
	return (
		<div
			key={job.id}
			className="space-y-3 rounded-xl border border-border/40 bg-muted/20 p-4"
		>
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<p className="font-semibold uppercase tracking-widest text-foreground">
					{job.customer}
				</p>
				<Badge
					variant="outline"
					className="border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground"
				>
					{job.id}
				</Badge>
			</div>

			{job.status === "on-the-way" && (
				<div className="relative overflow-hidden rounded-lg border border-border/40">
					<div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-accent/20" />
					<div className="relative flex h-48 flex-col justify-between bg-[url('/map-placeholder.svg')] bg-cover bg-center p-4">
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
								<Navigation className="h-4 w-4" />
							</span>
							<div>
								<p className="text-sm font-semibold text-foreground">
									{job.pickup}
								</p>
								<p>Berangkat pukul 10:05 WIB</p>
							</div>
						</div>
						<div className="rounded-xl border border-border/40 bg-card/90 p-3 text-xs text-muted-foreground shadow-sm backdrop-blur">
							<p className="text-sm font-semibold text-foreground">
								{job.destination}
							</p>
							<p className="mt-1 flex items-center gap-1">
								<MapPin className="h-3.5 w-3.5 text-primary" />
								{job.distance} • {job.eta}
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="text-xs text-muted-foreground">
				<p className="flex items-center gap-1">
					<Clock className="h-3.5 w-3.5 text-primary" />
					{job.schedule}
				</p>
				<p className="mt-1 flex items-center gap-1">
					<MapPin className="h-3.5 w-3.5 text-primary" />
					{job.destination ?? job.address}
				</p>
				<div className="mt-2 flex flex-wrap items-center gap-2">
					<Badge
						variant="outline"
						className="border-border/50 bg-background/60 text-[10px] uppercase tracking-widest text-muted-foreground"
					>
						{job.distance}
					</Badge>
					<Badge className="bg-primary/15 text-xs font-medium text-primary">
						Ongkir {job.fee}
					</Badge>
					<Badge className={cn(statusBadgeStyles[job.status])}>
						{statusLabels[job.status]}
					</Badge>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-4 text-xs">
				<HomeServiceActions job={job} onUpdateStatus={onUpdateStatus} />
				<Button
					size="sm"
					variant="outline"
					className="w-full border-border/60"
				>
					<Phone className="mr-2 h-4 w-4" />
					Hubungi Pelanggan
				</Button>
			</div>
		</div>
	);
}

// --- Komponen Halaman Utama ---
export default function BarberHomeServicePage() {
	const [homeServiceJobs, setHomeServiceJobs] = useState(
		initialHomeServiceJobs
	);

	const { activeJob, queuedJobs } = useMemo(() => {
		const active = homeServiceJobs.find((job) =>
			["on-the-way", "arrived", "in-service"].includes(job.status)
		);
		const queued = homeServiceJobs.filter(
			(job) =>
				![
					"on-the-way",
					"arrived",
					"in-service",
					"completed",
					"cancelled",
				].includes(job.status)
		);
		return { activeJob: active, queuedJobs: queued };
	}, [homeServiceJobs]);

	const handleUpdateStatus = (id: string, newStatus: HomeServiceStatus) => {
		setHomeServiceJobs((currentJobs) =>
			currentJobs.map((job) =>
				job.id === id ? { ...job, status: newStatus } : job
			)
		);
	};

	return (
		<PageShell background="soft" contentClassName="gap-0">
			<section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10">
				<div className="absolute inset-0 bg-grid-pattern opacity-10" />
				<div className="relative space-y-6">
					<div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="h-12 w-12 border-2 border-primary/40 shadow-lg">
								<AvatarImage
									src="/placeholder.jpg"
									alt="Rama Putra"
								/>
								<AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
									RP
								</AvatarFallback>
							</Avatar>
							<div className="space-y-1.5">
								<div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
									<Badge
										variant="outline"
										className="border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground"
									>
										Barber
									</Badge>
									<Badge
										variant="outline"
										className="border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground"
									>
										Barber-Owner
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">
									Barber
								</p>
								<h2 className="text-xl font-bold tracking-tight text-foreground">
									Rama Putra
								</h2>
							</div>
						</div>
						<div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
							<div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2">
								{/* INI BARIS 367, SEKARANG SEHARUSNYA AMAN KARENA IMPORT SUDAH BENAR */}
								<Truck className="h-4 w-4 text-primary" />
								<div className="leading-tight">
									<p className="text-xs font-semibold text-foreground">
										Home Service Saya
									</p>
									<p>
										{queuedJobs.length} antrian,{" "}
										{activeJob ? "1 OTW" : "0 OTW"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2">
								<MapPin className="h-4 w-4 text-primary" />
								<div className="leading-tight">
									<p className="text-xs font-semibold text-foreground">
										TrimTime HQ
									</p>
									<p>Menara BCA, Jakarta</p>
								</div>
							</div>
							<div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2">
								<Clock className="h-4 w-4 text-primary" />
								<div className="leading-tight">
									<p className="text-xs font-semibold text-foreground">
										Jadwal berikutnya
									</p>
									<p>
										{queuedJobs.length > 0
											? queuedJobs[0].schedule
											: "Tidak ada"}
									</p>
								</div>
							</div>
						</div>
					</div>

					<Card className="border-border/50 bg-card/80 shadow-sm">
						<CardContent className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
								<Truck className="h-4 w-4" />
								Manajemen Home Service
							</div>
							<div className="space-y-3">
								<h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
									Jadwal Home Service Saya Hari Ini
								</h1>
								<p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
									Kelola status berangkat, tiba, hingga
									selesai. Pelanggan akan otomatis
									menerima notifikasi untuk setiap
									pembaruan.
								</p>
							</div>
							<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
								<Badge className="bg-primary/10 text-primary">
									Auto-sync POS
								</Badge>
								<Badge
									variant="outline"
									className="border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground"
								>
									Integrasi notifikasi SMS & WA
								</Badge>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<main className="space-y-5 px-5 pt-4 pb-6 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 lg:px-8 lg:pb-8">
				{/* --- KOLOM 1: PEKERJAAN AKTIF --- */}
				<div className="grid gap-5">
					<Card className="border-border/50 shadow-sm">
						<CardHeader>
							<CardTitle className="text-xl font-semibold tracking-tight">
								Pekerjaan Aktif
							</CardTitle>
							<CardDescription>
								Fokus pada pekerjaan yang sedang Anda
								jalankan saat ini.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{activeJob ? (
								<HomeServiceJobCard
									job={activeJob}
									onUpdateStatus={handleUpdateStatus}
								/>
							) : (
								<div className="rounded-xl border border-dashed border-border/50 bg-muted/20 p-4 text-center text-sm text-muted-foreground">
									Tidak ada pekerjaan yang sedang aktif.
									<br />
									Mulai perjalanan dari antrian di
									samping.
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* --- KOLOM 2: ANTRIAN BERIKUTNYA --- */}
				<div className="grid gap-5">
					<Card className="border-border/50 shadow-sm">
						<CardHeader className="flex flex-col gap-2">
							<CardTitle className="text-xl font-semibold tracking-tight">
								Antrean Berikutnya ({queuedJobs.length})
							</CardTitle>
							<CardDescription>
								Jadwal yang perlu dikonfirmasi dan
								dijalankan setelah ini.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{queuedJobs.length > 0 ? (
								queuedJobs.map((job) => (
									<HomeServiceJobCard
										key={job.id}
										job={job}
										onUpdateStatus={handleUpdateStatus}
									/>
								))
							) : (
								<div className="rounded-xl border border-dashed border-border/50 bg-muted/20 p-4 text-center text-sm text-muted-foreground">
									Tidak ada lagi antrian hari ini.
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</main>
		</PageShell>
	);
}