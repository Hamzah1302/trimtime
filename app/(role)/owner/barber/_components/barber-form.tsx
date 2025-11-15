"use client";

import Link from "next/link";

import { ArrowLeft, Info, UploadCloud } from "lucide-react";

import { barberSkills, mockBarbers, shiftOptions, type MockBarber } from "../_data/mock-barbers";
import { mockBranches } from "../../cabang/_data/mock-branches";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const STATUS_VARIANTS: Record<MockBarber["status"], string> = {
    Aktif: "bg-emerald-500/10 text-emerald-600",
    Cuti: "bg-amber-500/10 text-amber-600",
    Nonaktif: "bg-destructive/10 text-destructive",
};

type BarberFormProps = {
    mode: "create" | "edit";
    barberId?: string;
};

function getBarberById(id?: string) {
    if (!id) return undefined;
    return mockBarbers.find((barber) => barber.id === id);
}

export function BarberForm({ mode, barberId }: BarberFormProps) {
    const barber = getBarberById(barberId);
    const selectedSkills = new Set(barber?.skills ?? []);
    const branchOptions = mockBranches.map((branch) => ({
        value: branch.slug,
        label: branch.name,
        description: branch.address,
    }));
    const defaultBranchValue = branchOptions.find((option) => {
        if (!barber?.branch) return false;
        const normalizedBranch = barber.branch.toLowerCase();
        return (
            option.value === barber.branch ||
            option.label.toLowerCase() === normalizedBranch ||
            option.label.toLowerCase().includes(normalizedBranch)
        );
    })?.value;

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between gap-4'>
                <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                        <Info className='h-4 w-4 text-primary' />
                        {mode === "create" ? "Registrasi barber" : "Edit data barber"}
                    </div>
                    <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                        {mode === "create" ? "Tambah barber baru" : `Perbarui profil ${barber?.name ?? "barber"}`}
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Isi data personal, skill, dan cabang bertugas. Sistem akan mengirim credential otomatis ke email barber.
                    </p>
                </div>
                <Button variant='ghost' className='hidden gap-2 text-primary sm:inline-flex' asChild>
                    <Link href='/owner/barber'>
                        <ArrowLeft className='h-4 w-4' />
                        Kembali ke daftar barber
                    </Link>
                </Button>
            </div>

            {barber && (
                <Card className='border-border/60 bg-muted/10'>
                    <CardContent className='flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='flex items-center gap-3'>
                            <Avatar className='h-12 w-12'>
                                <AvatarImage src='/placeholder.jpg' alt={barber.name} />
                                <AvatarFallback>{barber.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-semibold text-foreground'>{barber.name}</p>
                                <p className='text-xs text-muted-foreground'>ID {barber.id}</p>
                            </div>
                        </div>
                        <Badge className={`${STATUS_VARIANTS[barber.status]} border-none px-3 py-1 text-xs font-semibold uppercase tracking-widest`}>
                            {barber.status}
                        </Badge>
                    </CardContent>
                </Card>
            )}

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Data personal</CardTitle>
                    <CardDescription>Informasi ini diperlukan untuk onboarding akun barber.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='barber-name'>Nama lengkap</Label>
                            <Input id='barber-name' placeholder='Nama barber' defaultValue={barber?.name ?? ""} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='barber-email'>Email</Label>
                            <Input id='barber-email' placeholder='barber@trimtime.com' defaultValue={barber?.email ?? ""} />
                        </div>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='barber-phone'>Nomor telepon</Label>
                            <Input id='barber-phone' placeholder='08xxxxxxxxxx' defaultValue={barber?.phone ?? ""} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='barber-branch'>Cabang bertugas</Label>
                            <Select defaultValue={defaultBranchValue}>
                                <SelectTrigger id='barber-branch' className='w-full justify-between border-border/60'>
                                    <SelectValue placeholder='Pilih cabang' />
                                </SelectTrigger>
                                <SelectContent className='min-w-64'>
                                    {branchOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className='flex flex-col'>
                                                <span className='font-medium text-foreground'>{option.label}</span>
                                                <span className='text-xs text-muted-foreground'>{option.description}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='barber-notes'>Catatan onboarding</Label>
                        <Textarea
                            id='barber-notes'
                            rows={3}
                            placeholder='Contoh: butuh training color correction, jadwal preferensi shift sore.'
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Skillset barber</CardTitle>
                    <CardDescription>Pilih keahlian utama barber untuk membantu auto-routing booking.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid gap-3 sm:grid-cols-2'>
                        {barberSkills.map((skill) => (
                            <label
                                key={skill}
                                className='flex items-center gap-3 rounded-lg border border-border/40 bg-background/70 px-3 py-2 text-sm text-foreground'
                            >
                                <Checkbox defaultChecked={selectedSkills.has(skill)} className='border-border/60' />
                                {skill}
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className='border-border/60 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Shift dan level</CardTitle>
                    <CardDescription>Pilih shift default serta level barber untuk penugasan.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='barber-level'>Level barber</Label>
                            <Input id='barber-level' placeholder='Lead Stylist / Senior / Junior' defaultValue={barber?.level ?? ""} />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='barber-shift'>Shift default</Label>
                            <Input id='barber-shift' placeholder='Pilih shift' defaultValue={barber?.shift ?? ""} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label>Shift pilihan</Label>
                        <div className='grid gap-3 sm:grid-cols-2'>
                            {shiftOptions.map((shift) => (
                                <label key={shift} className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2 text-sm'>
                                    <Checkbox defaultChecked={barber?.shift === shift} className='border-border/60' />
                                    {shift}
                                </label>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='border border-dashed border-primary/50 bg-primary/5'>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold text-primary'>
                        {mode === "create" ? "Siap kirim credential barber?" : "Simpan pembaruan data barber"}
                    </CardTitle>
                    <CardDescription className='text-sm text-primary/80'>
                        {mode === "create"
                            ? "TrimTime akan mengirim email berisi credential dan panduan onboarding."
                            : "Perubahan akan langsung tersedia di dashboard owner dan aplikasi barber."}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <Button variant='outline' className='w-full border-border/60 text-sm text-muted-foreground sm:w-auto' asChild>
                        <Link href='/owner/barber'>
                            Batal
                        </Link>
                    </Button>
                    <Button className='w-full sm:w-auto'>
                        {mode === "create" ? "Kirim undangan akun" : "Simpan perubahan"}
                    </Button>
                </CardFooter>
            </Card>

            {mode === "edit" && barber && (
                <Card className='border-border/60 bg-muted/10 shadow-sm'>
                    <CardContent className='flex flex-col gap-3 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
                        <div>
                            <span className='font-semibold text-foreground'>Terakhir login:</span> 2 jam lalu dari aplikasi barber TrimTime.
                        </div>
                        <Button variant='ghost' className='gap-2 text-destructive hover:text-destructive/90'>
                            Nonaktifkan akun sementara
                        </Button>
                    </CardContent>
                </Card>
            )}

            <Card className='border-border/60 bg-muted/10 shadow-sm'>
                <CardContent className='grid gap-3 p-4 text-sm text-muted-foreground sm:grid-cols-2'>
                    <div>
                        <p className='font-semibold text-foreground'>Tips onboarding sukses</p>
                        <p>Mulai dengan shift tandem dengan lead stylist untuk memastikan kualitas layanan konsisten.</p>
                    </div>
                    <div>
                        <p className='font-semibold text-foreground'>Perlengkapan wajib</p>
                        <ul className='list-disc pl-5'>
                            <li>Seragam TrimTime terbaru</li>
                            <li>Toolkit steril (gunting, clipper, razor)</li>
                            <li>Kartu identitas TrimTime</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card className='border border-dashed border-primary/40 bg-primary/5'>
                <CardContent className='flex flex-col gap-3 p-4 text-sm text-primary/80 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-3'>
                        <UploadCloud className='h-5 w-5 text-primary' />
                        <div>
                            <p className='font-semibold text-primary'>Download template data barber</p>
                            <p className='text-sm'>Import massal aktifkan hingga 50 barber sekaligus via CSV.</p>
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
