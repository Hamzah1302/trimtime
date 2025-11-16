"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { ArrowLeft, CalendarCheck, Scissors } from "lucide-react";

import { barberServices, promoCatalog } from "../_data/booking-options";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ManualBookingForm = {
    customerName: string;
    phone: string;
    scheduleDate: string;
    scheduleTime: string;
    type: "on-site" | "home-service";
    notes: string;
    promoCode: string;
};

export default function BarberBookingCreatePage() {
    const [form, setForm] = useState<ManualBookingForm>({
        customerName: "",
        phone: "",
        scheduleDate: "",
        scheduleTime: "",
        type: "on-site",
        notes: "",
        promoCode: "",
    });
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

    const handleChange = useCallback(<K extends keyof ManualBookingForm>(key: K, value: ManualBookingForm[K]) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const toggleServiceSelection = useCallback((serviceId: string) => {
        setSelectedServiceIds((prev) =>
            prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
        );
    }, []);

    const selectedServices = useMemo(
        () => barberServices.filter((service) => selectedServiceIds.includes(service.id)),
        [selectedServiceIds]
    );

    const subtotal = useMemo(
        () => selectedServices.reduce((acc, service) => acc + service.price, 0),
        [selectedServices]
    );

    const appliedPromo = useMemo(() => {
        const code = form.promoCode.trim().toUpperCase();
        return code ? promoCatalog[code] ?? null : null;
    }, [form.promoCode]);

    const promoIsEligible = useMemo(() => {
        if (!appliedPromo) return false;
        if (appliedPromo.minSubtotal && subtotal < appliedPromo.minSubtotal) return false;
        return true;
    }, [appliedPromo, subtotal]);

    const discountValue = useMemo(() => {
        if (!appliedPromo || !promoIsEligible) return 0;
        if (appliedPromo.discountType === "percent") {
            return Math.round(subtotal * appliedPromo.value);
        }
        return appliedPromo.value;
    }, [appliedPromo, promoIsEligible, subtotal]);

    const grandTotal = useMemo(() => Math.max(subtotal - discountValue, 0), [subtotal, discountValue]);

    const isFormValid = useMemo(() => {
        return (
            form.customerName.trim().length > 0 &&
            form.phone.trim().length > 0 &&
            form.scheduleDate.trim().length > 0 &&
            form.scheduleTime.trim().length > 0 &&
            selectedServiceIds.length > 0
        );
    }, [form, selectedServiceIds.length]);

    const formatCurrency = useCallback((value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    }, []);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const payload = {
                ...form,
                services: selectedServices.map((service) => service.id),
                subtotal,
                discount: discountValue,
                total: grandTotal,
            };

            // Placeholder: integrate with mutation or navigation once API is ready.
            console.log("submit booking", payload);
        },
        [discountValue, form, grandTotal, selectedServices, subtotal]
    );

    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                    <div className='space-y-3'>
                        <Badge className='w-fit gap-2 bg-primary/10 text-primary'>
                            <Scissors className='h-3.5 w-3.5' />
                            Booking manual barber
                        </Badge>
                        <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Buat booking baru</h1>
                        <p className='max-w-2xl text-sm text-muted-foreground'>
                            Catat permintaan pelanggan secara manual agar kapasitas kursi, jadwal barber, dan notifikasi pelanggan selalu sinkron.
                        </p>
                    </div>
                    <Button variant='ghost' className='self-start gap-2 text-primary' asChild>
                        <Link href='/barber/booking'>
                            <ArrowLeft className='h-4 w-4' />
                            Kembali ke daftar booking
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
                    <div className='space-y-6'>
                        <Card className='border-border/60 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-lg font-semibold'>Informasi pelanggan</CardTitle>
                                <CardDescription>Isi detail dasar untuk mencatat sesi baru.</CardDescription>
                            </CardHeader>
                            <CardContent className='grid gap-4 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label htmlFor='customer-name'>Nama pelanggan</Label>
                                    <Input
                                        id='customer-name'
                                        placeholder='Contoh: Dimas Saputra'
                                        value={form.customerName}
                                        onChange={(event) => handleChange("customerName", event.target.value)}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='customer-phone'>Nomor telepon</Label>
                                    <Input
                                        id='customer-phone'
                                        placeholder='Contoh: 0812xxxxxxx'
                                        value={form.phone}
                                        onChange={(event) => handleChange("phone", event.target.value)}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='schedule-date'>Tanggal</Label>
                                    <Input
                                        id='schedule-date'
                                        type='date'
                                        value={form.scheduleDate}
                                        onChange={(event) => handleChange("scheduleDate", event.target.value)}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='schedule-time'>Waktu</Label>
                                    <Input
                                        id='schedule-time'
                                        type='time'
                                        value={form.scheduleTime}
                                        onChange={(event) => handleChange("scheduleTime", event.target.value)}
                                    />
                                </div>
                                <div className='space-y-2 sm:col-span-2'>
                                    <Label htmlFor='service-type'>Tipe layanan</Label>
                                    <Select
                                        value={form.type}
                                        onValueChange={(value: ManualBookingForm["type"]) => handleChange("type", value)}
                                    >
                                        <SelectTrigger id='service-type'>
                                            <SelectValue placeholder='Pilih tipe layanan' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='on-site'>On-site (di barbershop)</SelectItem>
                                            <SelectItem value='home-service'>Home service</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2 sm:col-span-2'>
                                    <Label htmlFor='notes'>Catatan tambahan</Label>
                                    <Textarea
                                        id='notes'
                                        rows={4}
                                        placeholder='Permintaan khusus, preferensi barber, atau catatan penting lainnya.'
                                        value={form.notes}
                                        onChange={(event) => handleChange("notes", event.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className='border-border/60 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-lg font-semibold'>Pilih layanan</CardTitle>
                                <CardDescription>Centang layanan yang dibutuhkan pelanggan.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                <div className='space-y-2 rounded-xl border border-border/40 bg-muted/15 p-3'>
                                    {barberServices.map((service) => {
                                        const isChecked = selectedServiceIds.includes(service.id);
                                        return (
                                            <label
                                                key={service.id}
                                                htmlFor={`service-${service.id}`}
                                                className='flex flex-col gap-2 rounded-lg border border-transparent px-2 py-2 transition hover:bg-background/80'
                                            >
                                                <div className='flex items-start justify-between gap-3'>
                                                    <div className='flex items-start gap-3'>
                                                        <Checkbox
                                                            id={`service-${service.id}`}
                                                            checked={isChecked}
                                                            onCheckedChange={() => toggleServiceSelection(service.id)}
                                                        />
                                                        <div>
                                                            <p className='text-sm font-semibold text-foreground'>{service.name}</p>
                                                            <p className='text-xs text-muted-foreground'>{service.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className='text-right text-sm font-semibold text-foreground'>
                                                        {formatCurrency(service.price)}
                                                    </div>
                                                </div>
                                                <div className='pl-8 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                                    Durasi: {service.duration}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                                {selectedServiceIds.length === 0 ? (
                                    <p className='text-[11px] text-destructive'>Pilih minimal satu layanan.</p>
                                ) : null}
                            </CardContent>
                        </Card>

                        <Card className='border-border/60 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-lg font-semibold'>Kode promo (opsional)</CardTitle>
                                <CardDescription>Masukkan kode promo pelanggan bila tersedia.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
                                    <div className='w-full space-y-2 sm:max-w-xs'>
                                        <Label htmlFor='promo-code'>Kode promo</Label>
                                        <Input
                                            id='promo-code'
                                            placeholder='Contoh: TRIM10'
                                            value={form.promoCode}
                                            onChange={(event) => handleChange("promoCode", event.target.value)}
                                        />
                                    </div>
                                    {appliedPromo ? (
                                        <Badge variant='outline' className='w-fit border-primary/40 bg-primary/10 text-[11px] font-semibold uppercase tracking-widest text-primary'>
                                            {appliedPromo.label}
                                        </Badge>
                                    ) : null}
                                </div>
                                {appliedPromo ? (
                                    <p className='text-xs text-muted-foreground'>
                                        {promoIsEligible ? "Promo diterapkan otomatis saat booking disimpan." : appliedPromo.notes ?? "Promo belum memenuhi syarat."}
                                    </p>
                                ) : (
                                    <p className='text-xs text-muted-foreground'>Masukkan kode promo pelanggan jika tersedia.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className='space-y-6'>
                        <Card className='border-border/60 bg-muted/20 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground'>
                                    <CalendarCheck className='h-4 w-4 text-primary' />
                                    Ringkasan biaya
                                </CardTitle>
                                <CardDescription>Pantau subtotal dan diskon sebelum menyimpan booking.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                {selectedServices.length === 0 ? (
                                    <p className='text-xs text-muted-foreground'>Belum ada layanan yang dipilih.</p>
                                ) : (
                                    selectedServices.map((service) => (
                                        <div key={`summary-${service.id}`} className='flex items-center justify-between'>
                                            <span>{service.name}</span>
                                            <span className='font-medium text-foreground'>{formatCurrency(service.price)}</span>
                                        </div>
                                    ))
                                )}
                                <div className='flex items-center justify-between pt-2 text-xs uppercase tracking-widest text-muted-foreground'>
                                    <span>Subtotal</span>
                                    <span className='text-sm font-semibold text-foreground'>{formatCurrency(subtotal)}</span>
                                </div>
                                {discountValue > 0 ? (
                                    <div className='flex items-center justify-between text-xs uppercase tracking-widest text-emerald-600'>
                                        <span>Diskon</span>
                                        <span className='text-sm font-semibold'>-{formatCurrency(discountValue)}</span>
                                    </div>
                                ) : null}
                                <div className='flex items-center justify-between border-t border-border/40 pt-3 text-sm font-semibold text-foreground'>
                                    <span>Total</span>
                                    <span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2 text-xs text-muted-foreground'>
                                <p>Nominal akan disinkronkan ke dashboard owner dan invoice pelanggan.</p>
                            </CardFooter>
                        </Card>

                        <Card className='border-border/60 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-lg font-semibold'>Simpan booking</CardTitle>
                                <CardDescription>Pastikan data sudah lengkap sebelum menyimpan.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                <p>
                                    Setelah disimpan, booking akan muncul di daftar barber dan pelanggan menerima notifikasi melalui aplikasi TrimTime atau WhatsApp.
                                </p>
                                <p>Data dapat diedit kembali dari detail booking.</p>
                            </CardContent>
                            <CardFooter className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                                <Button type='button' variant='outline' className='w-full border-border/60 sm:w-auto' asChild>
                                    <Link href='/barber/booking'>Batalkan</Link>
                                </Button>
                                <Button type='submit' className='w-full sm:w-auto' disabled={!isFormValid}>
                                    Simpan booking manual
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </PageShell>
    );
}
