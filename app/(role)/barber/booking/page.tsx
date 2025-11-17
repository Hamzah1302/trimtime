"use client";

import Link from "next/link";
import { useCallback, useState, useMemo } from "react";
import {
	Activity,
	BadgeCheck,
	CheckCircle2,
	Clock,
	Filter,
	MapPin,
	Menu,
	MessageCircle,
	MoreVertical,
	Phone,
	Search,
	Scissors,
	SquarePen,
	XCircle,
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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
// --- PERUBAHAN: Import komponen Dialog & Textarea ---
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
	bookingList,
	statusActions,
	statusBadgeStyles,
	statusLabels,
	type BookingStatus,
} from "@/data/barber-booking";




// --- PERUBAHAN: Props 'handlePlaceholderAction' diganti 'onAddNote' ---
type BookingActionMenuProps = {
	bookingId: string;
	telHref: string;
	status: BookingStatus;
	onUpdateStatus: (id: string, status: BookingStatus) => void;
	onAddNote: (bookingId: string) => void; // <-- Prop baru
	align?: "start" | "center" | "end";
};

function BookingActionMenu({
	bookingId,
	telHref,
	status,
	onUpdateStatus,
	onAddNote, // <-- Prop baru
	align = "end",
}: BookingActionMenuProps) {
	return (
		<DropdownMenuContent
			align={align}
			className="min-w-[16rem] space-y-1 rounded-lg border border-border/50 bg-card/95 p-2 shadow-lg backdrop-blur"
		>
			<DropdownMenuLabel className="text-[11px] uppercase tracking-widest text-muted-foreground">
				Tindakan Booking
			</DropdownMenuLabel>
			<DropdownMenuItem asChild>
				<Link
					// --- PERBAIKAN BUG: Menggunakan bookingId (ID asli) ---
					href={`/barber/booking/${bookingId.toLowerCase()}`}
					className="flex items-start gap-3 text-sm"
				>
					<BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
					<div className="flex flex-col">
						<span className="font-semibold text-foreground">
							Lihat detail booking
						</span>
						<span className="text-[11px] text-muted-foreground">
							Cek informasi lengkap & timeline aktivitas
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
							Telepon cepat sebelum sesi dimulai
						</span>
					</div>
				</a>
			</DropdownMenuItem>
			<DropdownMenuSeparator className="bg-border/40" />
			{statusActions[status]?.map(
				({ label, description, icon: Icon, actionStatus }) => (
					<DropdownMenuItem
						key={label}
						// Aksi ini sudah terhubung dari kode sebelumnya
						onSelect={() =>
							actionStatus &&
							onUpdateStatus(bookingId, actionStatus)
						}
						// --- PERUBAHAN: Tambah 'disabled' jika tidak ada actionStatus ---
						disabled={!actionStatus}
						className="flex items-start gap-3 text-sm text-muted-foreground"
					>
						<Icon className="mt-0.5 h-4 w-4 text-primary" />
						<div className="flex flex-col">
							<span className="font-semibold text-foreground">
								{label}
							</span>
							{description ? (
								<span className="text-[11px] leading-snug text-muted-foreground">
									{description}
									{!actionStatus && " (Belum berfungsi)"}
								</span>
							) : null}
						</div>
					</DropdownMenuItem>
				)
			)}
			{status !== "completed" && status !== "cancelled" && (
				<DropdownMenuItem
					// Aksi ini sudah terhubung dari kode sebelumnya
					onSelect={() => onUpdateStatus(bookingId, "cancelled")}
					className="flex items-start gap-3 text-sm text-destructive focus:text-destructive"
				>
					<XCircle className="mt-0.5 h-4 w-4" />
					<div className="flex flex-col">
						<span className="font-semibold">Batalkan Booking</span>
						<span className="text-[11px]">
							Pindahkan booking ini ke riwayat 'Dibatalkan'
						</span>
					</div>
				</DropdownMenuItem>
			)}
			<DropdownMenuSeparator className="bg-border/40" />
			<DropdownMenuItem
				// --- PERUBAHAN: Menghubungkan ke 'onAddNote' ---
				onSelect={() => onAddNote(bookingId)}
				className="flex items-start gap-3 text-sm text-muted-foreground"
			>
				<SquarePen className="mt-0.5 h-4 w-4 text-primary" />
				<div className="flex flex-col">
					<span className="font-semibold text-foreground">
						Tambah catatan manual
					</span>
					<span className="text-[11px] text-muted-foreground">
						Simpan insight untuk owner atau tim CS
					</span>
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
}

// Komponen Aksi Cepat (tidak berubah, sudah berfungsi)
function BookingQuickAction({
	bookingId,
	status,
	onUpdateStatus,
}: {
	bookingId: string;
	status: BookingStatus;
	onUpdateStatus: (id: string, status: BookingStatus) => void;
}) {
	switch (status) {
		case "pending":
			return (
				<Button
					size="sm"
					className="w-full sm:w-auto"
					onClick={() => onUpdateStatus(bookingId, "confirmed")}
				>
					Konfirmasi
				</Button>
			);
		case "confirmed":
			return (
				<Button
					size="sm"
					className="w-full sm:w-auto"
					onClick={() => onUpdateStatus(bookingId, "ongoing")}
				>
					Mulai Servis
				</Button>
			);
		case "ongoing":
		case "tracking":
			return (
				<Button
					size="sm"
					className="w-full sm:w-auto"
					onClick={() => onUpdateStatus(bookingId, "completed")}
				>
					Selesaikan
				</Button>
			);
		default:
			return null;
	}
}

export default function BarberBookingPage() {
	// --- PERUBAHAN: State untuk Dialog "Tambah Catatan" ---
	const [isNoteModalOpen, setNoteModalOpen] = useState(false);
	const [noteInputValue, setNoteInputValue] = useState("");
	const [selectedBookingForNote, setSelectedBookingForNote] = useState<
		string | null
	>(null);

	const [allBookings, setAllBookings] = useState(bookingList);

	const handleUpdateStatus = (id: string, newStatus: BookingStatus) => {
		setAllBookings((currentBookings) =>
			currentBookings.map((booking) =>
				booking.id === id
					? { ...booking, status: newStatus }
					: booking
			)
		);
	};

	// --- PERUBAHAN: Fungsi untuk membuka dialog ---
	const openNoteModal = (bookingId: string) => {
		setSelectedBookingForNote(bookingId);
		setNoteModalOpen(true);
	};

	// --- PERUBAHAN: Fungsi untuk "menyimpan" catatan ---
	const handleSaveNote = () => {
		// Di aplikasi nyata, Anda akan kirim 'noteInputValue' dan 'selectedBookingForNote' ke API
		alert(
			`Catatan untuk Booking #${selectedBookingForNote}:\n\n${noteInputValue}`
		);
		// Reset state
		setNoteModalOpen(false);
		setNoteInputValue("");
		setSelectedBookingForNote(null);
	};

	const antrianBookings = useMemo(
		() =>
			allBookings.filter(
				(b) =>
					b.status === "pending" ||
					b.status === "confirmed" ||
					b.status === "ongoing" ||
					b.status === "tracking"
			),
		[allBookings]
	);

	const riwayatBookings = useMemo(
		() =>
			allBookings.filter(
				(b) => b.status === "completed" || b.status === "cancelled"
			),
		[allBookings]
	);

	return (
		<PageShell background="soft" contentClassName="gap-0">
			{/* ... (Bagian Header tidak berubah) ... */}
			<section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-9 lg:pb-4">
				{/* ... (Kode header... tidak berubah) ... */}
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
								<Scissors className="h-4 w-4 text-primary" />
								<div className="leading-tight">
									<p className="text-xs font-semibold text-foreground">
										Barber aktif
									</p>
									<p>Slot tersisa: 5/12</p>
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
									<p>09:00 WIB • 11 Feb</p>
								</div>
							</div>
						</div>
					</div>
					<div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
						<Card className="flex-1 border-border/50 bg-card/80 shadow-sm">
							<CardContent className="p-6">
								<div className="space-y-3">
									<h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
										Manajemen Booking
									</h1>
									<p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
										Fokus pada antrian hari ini atau cek
										riwayat booking yang sudah selesai.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<main className="space-y-6 px-5 pt-4 pb-6 lg:space-y-7 lg:px-8 lg:pt-4 lg:pb-6">
				<Tabs defaultValue="antrian">
					<Card className="border-border/50 shadow-sm">
						<CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							{/* ... (TabsList tidak berubah) ... */}
							<TabsList>
								<TabsTrigger value="antrian">
									Antrian Hari Ini (
									{antrianBookings.length})
								</TabsTrigger>
								<TabsTrigger value="riwayat">
									Riwayat Hari Ini (
									{riwayatBookings.length})
								</TabsTrigger>
							</TabsList>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								{/* ... (Input Search & Filter tidak berubah) ... */}
								<div className="relative w-full sm:w-64">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										placeholder="Cari nama atau ID booking"
										className="pl-9"
									/>
								</div>
								<Button
									variant="outline"
									className="border-border/60"
								>
									<Filter className="h-4 w-4" />
									Filter
								</Button>
							</div>
						</CardHeader>

						{/* KONTEN TAB 1: ANTRIAN HARI INI */}
						<TabsContent value="antrian" className="m-0">
							<CardContent className="space-y-4 p-6 pt-0">
								{/* Tampilan Mobile (lg:hidden) untuk ANTRIAN */}
								<div className="space-y-3 lg:hidden">
									{antrianBookings.length === 0 ? (
										<p className="pt-4 text-center text-sm text-muted-foreground">
											Tidak ada antrian aktif.
										</p>
									) : (
										antrianBookings.map((item) => {
											const phoneDigits =
												item.phone.replace(/\D/g, "");
											const dialNumber =
												phoneDigits.startsWith("0")
													? `62${phoneDigits.slice(1)}`
													: phoneDigits;
											const telHref = `tel:+${dialNumber}`;
											return (
												<div
													key={`${item.id}-compact`}
													className="space-y-4 rounded-2xl border border-border/50 bg-muted/15 p-4 shadow-sm"
												>
													{/* ... (Detail Card Mobile) ... */}
													<div className="flex flex-wrap items-start justify-between gap-3">
														<div className="flex items-center gap-3">
															<Avatar className="h-10 w-10 border border-border/40">
																<AvatarImage
																	src="/placeholder.jpg"
																	alt={
																		item.customer
																	}
																/>
																<AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
																	{
																		item.initials
																	}
																</AvatarFallback>
															</Avatar>
															<div>
																<p className="text-sm font-semibold text-foreground">
																	{
																		item.customer
																	}
																</p>
																<p className="text-xs uppercase tracking-widest text-muted-foreground">
																	{item.id}
																</p>
															</div>
														</div>
														<div className="flex flex-col items-end gap-2 text-right">
															<Badge
																variant="outline"
																className="border-border/50 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
															>
																{item.type}
															</Badge>
														</div>
													</div>
													<div className="space-y-2 text-xs text-muted-foreground">
														<span className="flex items-center gap-1.5">
															<Clock className="h-3.5 w-3.5 text-primary" />
															{item.schedule}
														</span>
														<span className="flex items-center gap-1.5">
															<MapPin className="h-3.5 w-3.5 text-primary" />
															{item.location}
														</span>
														<span className="flex items-center gap-1.5">
															<Scissors className="h-3.5 w-3.5 text-primary" />
															{item.service}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<Badge
															className={
																statusBadgeStyles[
																	item.status
																]
															}
														>
															{
																statusLabels[
																	item.status
																]
															}
														</Badge>
													</div>

													<div className="flex items-center gap-2 border-t border-border/40 pt-4">
														<BookingQuickAction
															bookingId={item.id}
															status={
																item.status
															}
															onUpdateStatus={
																handleUpdateStatus
															}
														/>
														<DropdownMenu>
															<DropdownMenuTrigger
																asChild
															>
																<Button
																	size="icon"
																	variant="outline"
																	className="flex-shrink-0 border-border/60"
																>
																	<MoreVertical className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															{/* --- PERUBAHAN: Props 'onAddNote' & 'bookingId' diperbarui --- */}
															<BookingActionMenu
																bookingId={
																	item.id
																}
																telHref={
																	telHref
																}
																status={
																	item.status
																}
																onUpdateStatus={
																	handleUpdateStatus
																}
																onAddNote={
																	openNoteModal
																}
																align="start"
															/>
														</DropdownMenu>
													</div>
												</div>
											);
										})
									)}
								</div>

								{/* Tampilan Desktop (hidden lg:block) untuk ANTRIAN */}
								<div className="hidden overflow-x-auto lg:block">
									{antrianBookings.length === 0 ? (
										<p className="pt-4 text-center text-sm text-muted-foreground">
											Tidak ada antrian aktif.
										</p>
									) : (
										<Table className="min-w-[960px]">
											<TableHeader>
												{/* ... (Header Tabel tidak berubah) ... */}
												<TableRow>
													<TableHead>
														Pelanggan
													</TableHead>
													<TableHead>
														Jadwal & Lokasi
													</TableHead>
													<TableHead>
														Layanan
													</TableHead>
													<TableHead>
														Status
													</TableHead>
													<TableHead>
														Tindakan Cepat
													</TableHead>
													<TableHead className="text-right">
														Tarif
													</TableHead>
													<TableHead className="text-right">
														Lainnya
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{antrianBookings.map((item) => {
													const phoneDigits =
														item.phone.replace(
															/\D/g,
															""
														);
													const dialNumber =
														phoneDigits.startsWith(
															"0"
														)
															? `62${phoneDigits.slice(1)}`
															: phoneDigits;
													const telHref = `tel:+${dialNumber}`;
													return (
														<TableRow
															key={item.id}
															className="transition-colors hover:bg-muted/20"
														>
															{/* ... (Sel Tabel tidak berubah) ... */}
															<TableCell className="align-top">
																<div className="flex items-center gap-3">
																	<Avatar className="h-9 w-9 border border-border/40">
																		<AvatarImage
																			src="/placeholder.jpg"
																			alt={
																				item.customer
																			}
																		/>
																		<AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
																			{
																				item.initials
																			}
																		</AvatarFallback>
																	</Avatar>
																	<div>
																		<p className="text-sm font-semibold text-foreground">
																			{
																				item.customer
																			}
																		</p>
																		<p className="text-xs uppercase tracking-widest text-muted-foreground">
																			{
																				item.id
																			}
																		</p>
																	</div>
																</div>
															</TableCell>
															<TableCell className="align-top">
																<div className="space-y-1 text-xs text-muted-foreground">
																	<span className="flex items-center gap-1">
																		<Clock className="h-3.5 w-3.5 text-primary" />
																		{
																			item.schedule
																		}
																	</span>
																	<span className="flex items-center gap-1">
																		<MapPin className="h-3.5 w-3.5 text-primary" />
																		{
																			item.location
																		}
																	</span>
																</div>
															</TableCell>
															<TableCell className="align-top">
																<div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
																	<Scissors className="h-3.5 w-3.5 text-primary" />
																	{
																		item.service
																	}
																</div>
															</TableCell>
															<TableCell className="align-top">
																<Badge
																	className={
																		statusBadgeStyles[
																			item
																				.status
																		]
																	}
																>
																	{
																		statusLabels[
																			item
																				.status
																		]
																	}
																</Badge>
															</TableCell>
															<TableCell className="align-top">
																<BookingQuickAction
																	bookingId={
																		item.id
																	}
																	status={
																		item.status
																	}
																	onUpdateStatus={
																		handleUpdateStatus
																	}
																/>
															</TableCell>
															<TableCell className="align-top text-right text-sm font-semibold text-foreground">
																{item.price}
															</TableCell>
															<TableCell className="align-top text-right">
																<DropdownMenu>
																	<DropdownMenuTrigger
																		asChild
																	>
																		<Button
																			variant="outline"
																			size="icon-sm"
																			className="border-border/60"
																			aria-label="Buka tindakan booking"
																		>
																			<MoreVertical className="h-4 w-4" />
																		</Button>
																	</DropdownMenuTrigger>
																	{/* --- PERUBAHAN: Props 'onAddNote' & 'bookingId' diperbarui --- */}
																	<BookingActionMenu
																		bookingId={
																			item.id
																		}
																		telHref={
																			telHref
																		}
																		status={
																			item.status
																		}
																		onUpdateStatus={
																			handleUpdateStatus
																		}
																		onAddNote={
																			openNoteModal
																		}
																	/>
																</DropdownMenu>
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									)}
								</div>
							</CardContent>
						</TabsContent>

						{/* KONTEN TAB 2: RIWAYAT HARI INI */}
						<TabsContent value="riwayat" className="m-0">
							<CardContent className="space-y-4 p-6 pt-0">
								{/* Tampilan Mobile (lg:hidden) untuk RIWAYAT */}
								<div className="space-y-3 lg:hidden">
									{riwayatBookings.length === 0 ? (
										<p className="pt-4 text-center text-sm text-muted-foreground">
											Belum ada riwayat booking hari
											ini.
										</p>
									) : (
										riwayatBookings.map((item) => {
											const bookingSlug =
												item.id.toLowerCase();
											return (
												<div
													key={`${item.id}-compact`}
													className="space-y-4 rounded-2xl border border-border/50 bg-muted/15 p-4 shadow-sm opacity-70"
												>
													{/* ... (Konten Card Riwayat tidak berubah) ... */}
													<div className="flex flex-wrap items-start justify-between gap-3">
														<div className="flex items-center gap-3">
															<Avatar className="h-10 w-10 border border-border/40">
																<AvatarImage
																	src="/placeholder.jpg"
																	alt={
																		item.customer
																	}
																/>
																<AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
																	{
																		item.initials
																	}
																</AvatarFallback>
															</Avatar>
															<div>
																<p className="text-sm font-semibold text-foreground">
																	{
																		item.customer
																	}
																</p>
																<p className="text-xs uppercase tracking-widest text-muted-foreground">
																	{item.id}
																</p>
															</div>
														</div>
														<div className="flex flex-col items-end gap-2 text-right">
															<Badge
																variant="outline"
																className="border-border/50 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
															>
																{item.type}
															</Badge>
														</div>
													</div>
													<div className="flex items-center gap-2">
														<Badge
															className={
																statusBadgeStyles[
																	item.status
																]
															}
														>
															{
																statusLabels[
																	item.status
																]
															}
														</Badge>
													</div>
													<div className="flex items-center gap-2 border-t border-border/40 pt-4">
														<Button
															size="sm"
															variant="outline"
															className="flex-1"
															asChild
														>
															<Link
																href={`/barber/booking/${bookingSlug}`}
															>
																Lihat Detail
															</Link>
														</Button>
													</div>
												</div>
											);
										})
									)}
								</div>

								{/* Tampilan Desktop (hidden lg:block) untuk RIWAYAT */}
								<div className="hidden overflow-x-auto lg:block">
									{riwayatBookings.length === 0 ? (
										<p className="pt-4 text-center text-sm text-muted-foreground">
											Belum ada riwayat booking hari
											ini.
										</p>
									) : (
										<Table className="min-w-[960px] opacity-70">
											{/* ... (Konten Tabel Riwayat tidak berubah) ... */}
											<TableHeader>
												<TableRow>
													<TableHead>
														Pelanggan
													</TableHead>
													<TableHead>
														Jadwal & Lokasi
													</TableHead>
													<TableHead>
														Layanan
													</TableHead>
													<TableHead>
														Status
													</TableHead>
													<TableHead className="text-right">
														Tarif
													</TableHead>
													<TableHead className="text-right">
														Lainnya
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{riwayatBookings.map((item) => {
													const bookingSlug =
														item.id.toLowerCase();
													return (
														<TableRow
															key={item.id}
															className="transition-colors hover:bg-muted/20"
														>
															<TableCell className="align-top">
																<div className="flex items-center gap-3">
																	<Avatar className="h-9 w-9 border border-border/40">
																		<AvatarImage
																			src="/placeholder.jpg"
																			alt={
																				item.customer
																			}
																		/>
																		<AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
																			{
																				item.initials
																			}
																		</AvatarFallback>
																	</Avatar>
																	<div>
																		<p className="text-sm font-semibold text-foreground">
																			{
																				item.customer
																			}
																		</p>
																		<p className="text-xs uppercase tracking-widest text-muted-foreground">
																			{
																				item.id
																			}
																		</p>
																	</div>
																</div>
															</TableCell>
															<TableCell className="align-top">
																<div className="space-y-1 text-xs text-muted-foreground">
																	<span className="flex items-center gap-1">
																		<Clock className="h-3.5 w-3.5 text-primary" />
																		{
																			item.schedule
																		}
																	</span>
																	<span className="flex items-center gap-1">
																		<MapPin className="h-3.5 w-3.5 text-primary" />
																		{
																			item.location
																		}
																	</span>
																</div>
															</TableCell>
															<TableCell className="align-top">
																<div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
																	<Scissors className="h-3.5 w-3.5 text-primary" />
																	{
																		item.service
																	}
																</div>
															</TableCell>
															<TableCell className="align-top">
																<Badge
																	className={
																		statusBadgeStyles[
																			item
																				.status
																		]
																	}
																>
																	{
																		statusLabels[
																			item
																				.status
																		]
																	}
																</Badge>
															</TableCell>
															<TableCell className="align-top text-right text-sm font-semibold text-foreground">
																{item.price}
															</TableCell>
															<TableCell className="align-top text-right">
																<Button
																	variant="outline"
																	size="sm"
																	className="border-border/60"
																	asChild
																>
																	<Link
																		href={`/barber/booking/${bookingSlug}`}
																	>
																		Detail
																	</Link>
																</Button>
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									)}
								</div>
							</CardContent>
						</TabsContent>
					</Card>
				</Tabs>
			</main>

			{/* --- PERUBAHAN: Dialog untuk "Tambah Catatan" --- */}
			<Dialog open={isNoteModalOpen} onOpenChange={setNoteModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Tambah Catatan Manual</DialogTitle>
						<DialogDescription>
							Catatan untuk booking{" "}
							<span className="font-semibold text-foreground">
								#{selectedBookingForNote}
							</span>
							. Catatan ini akan terlihat oleh Anda dan tim.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<Textarea
							placeholder="Tulis catatan di sini..."
							value={noteInputValue}
							onChange={(e) => setNoteInputValue(e.target.value)}
							rows={4}
						/>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setNoteModalOpen(false)}
						>
							Batal
						</Button>
						<Button type="button" onClick={handleSaveNote}>
							Simpan Catatan
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</PageShell>
	);
}