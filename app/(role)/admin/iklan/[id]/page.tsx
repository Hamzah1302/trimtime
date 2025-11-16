import Link from "next/link";

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
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Building,
    CalendarClock,
    CheckCircle2,
    Coins,
    FileText,
    Megaphone,
    Target,
} from "lucide-react";

const sponsorDetail = {
    partner: "Pomade Alpha",
    brandCategory: "Grooming Product",
    slot: "Homepage Hero",
    coverage: "Nasional",
    period: "1-31 Mar 2025",
    status: "Terbooking",
    investment: "Rp 220.000.000",
    cpm: "Rp 18.000",
    cta: "Belanja sekarang",
    contact: {
        pic: "Sarah Prameswari",
        email: "partnership@pomadealpha.com",
        phone: "+62 812-8800-111",
    },
    deliverables: "Hero banner + push notif + highlight freelancer",
    documents: "IO #ALP-8891, NDA, Creative brief",
    lastSync: "17 Nov 2025, 14:20",
};

const deliverableStatus = [
    {
        label: "Creative banner",
        detail: "Ukuran 1080x1350 px",
        status: "done" as const,
        updatedAt: "14 Nov",
    },
    {
        label: "Push notif copy",
        detail: "Sudah approve, menunggu schedule",
        status: "done" as const,
        updatedAt: "15 Nov",
    },
    {
        label: "Freelancer highlight",
        detail: "Brief diterima, produksi 18 Nov",
        status: "pending" as const,
        updatedAt: "-",
    },
];

const kpiStats = [
    { label: "CTR target", value: "3.5%", helper: "Week 1: 3.1%" },
    { label: "Conversion", value: "410 booking", helper: "vs target 380" },
    {
        label: "Spend harian",
        value: "Rp 7,3 jt",
        helper: "Budget 30 jt/minggu",
    },
];

const activationTimeline = [
    {
        title: "Kickoff meeting",
        date: "8 Nov 2025",
        note: "Review KPI & creative brief",
    },
    {
        title: "Creative upload",
        date: "13 Nov 2025",
        note: "Banner disetujui QA",
    },
    {
        title: "Push notif + hero",
        date: "15 Nov 2025",
        note: "Live di jam prime time",
    },
    {
        title: "Freelancer highlight",
        date: "18 Nov 2025",
        note: "Menunggu dokumentasi lapangan",
    },
];

const roiBreakdown = [
    { label: "Klik", value: "18.230", helper: "+9% vs minggu lalu" },
    { label: "Booking", value: "1.220", helper: "38% organic uplift" },
    { label: "Pendapatan", value: "Rp 310 jt", helper: "ROI 3.1x" },
];

type AdminIklanDetailPageProps = {
    params: Promise<{ id: string }>;
};

export default async function AdminIklanDetailPage({
    params,
}: AdminIklanDetailPageProps) {
    const { id } = await params;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Megaphone className='h-4 w-4' />
                                Detail Sponsor
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground uppercase tracking-widest'>
                                    Campaign #{id}
                                </p>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    {sponsorDetail.partner}
                                </h1>
                                <p className='text-sm text-muted-foreground lg:text-base'>
                                    {sponsorDetail.brandCategory} • Slot{" "}
                                    {sponsorDetail.slot}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button
                                asChild
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Link
                                    href='/admin/iklan'
                                    className='inline-flex items-center gap-2'
                                >
                                    <ArrowLeft className='h-4 w-4' />
                                    Kembali ke iklan
                                </Link>
                            </Button>
                            <Button asChild className='gap-2'>
                                <Link
                                    href={`/admin/iklan/${id}/edit`}
                                    className='inline-flex items-center gap-2'
                                >
                                    <Building className='h-4 w-4' />
                                    Edit kesepakatan
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-10'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Profil kampanye & kontak
                            </CardTitle>
                            <CardDescription>
                                Data PIC, periode kontrak, dan status KPI utama.
                            </CardDescription>
                        </div>
                        <Badge
                            variant='outline'
                            className='border-border/60 text-[10px] uppercase tracking-widest'
                        >
                            {sponsorDetail.status}
                        </Badge>
                    </CardHeader>
                    <CardContent className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
                        <div className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <InfoItem
                                    label='Partner'
                                    value={sponsorDetail.partner}
                                />
                                <InfoItem
                                    label='Kategori'
                                    value={sponsorDetail.brandCategory}
                                />
                                <InfoItem
                                    label='Slot iklan'
                                    value={sponsorDetail.slot}
                                />
                                <InfoItem
                                    label='Periode'
                                    value={sponsorDetail.period}
                                />
                                <InfoItem
                                    label='Coverage'
                                    value={sponsorDetail.coverage}
                                />
                                <InfoItem
                                    label='Deliverables'
                                    value={sponsorDetail.deliverables}
                                />
                            </div>
                            <Separator />
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <InfoItem
                                    label='PIC partner'
                                    value={sponsorDetail.contact.pic}
                                />
                                <InfoItem
                                    label='Email'
                                    value={sponsorDetail.contact.email}
                                />
                                <InfoItem
                                    label='WhatsApp'
                                    value={sponsorDetail.contact.phone}
                                />
                                <InfoItem
                                    label='Dokumen'
                                    value={sponsorDetail.documents}
                                    icon={
                                        <FileText className='h-4 w-4 text-primary' />
                                    }
                                />
                            </div>
                        </div>
                        <div className='space-y-4 rounded-2xl border border-border/40 bg-muted/10 p-4 text-sm'>
                            <div className='flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground'>
                                <span>Kontrak & KPI</span>
                                <CalendarClock className='h-4 w-4 text-primary' />
                            </div>
                            {kpiStats.map((item) => (
                                <div key={item.label} className='space-y-1'>
                                    <p className='text-xs text-muted-foreground'>
                                        {item.label}
                                    </p>
                                    <p className='text-lg font-semibold text-foreground'>
                                        {item.value}
                                    </p>
                                    <p className='text-[11px] text-muted-foreground'>
                                        {item.helper}
                                    </p>
                                </div>
                            ))}
                            <Separator />
                            <div className='rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Terakhir sinkron
                                </p>
                                <p>{sponsorDetail.lastSync}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Status deliverables
                            </CardTitle>
                            <CardDescription>
                                Checklist creative, channel, dan aktivasi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {deliverableStatus.map((item) => (
                                <div
                                    key={item.label}
                                    className='flex gap-3 rounded-xl border border-border/40 bg-muted/10 p-4'
                                >
                                    <div className='mt-0.5'>
                                        {item.status === "done" ? (
                                            <CheckCircle2 className='h-5 w-5 text-primary' />
                                        ) : (
                                            <Target className='h-5 w-5 text-amber-500' />
                                        )}
                                    </div>
                                    <div className='space-y-1 text-sm'>
                                        <p className='font-semibold text-foreground'>
                                            {item.label}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            {item.detail}
                                        </p>
                                        <p className='text-[11px] uppercase tracking-widest text-muted-foreground'>
                                            Update {item.updatedAt}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Timeline aktivasi
                            </CardTitle>
                            <CardDescription>
                                Catatan milestone penting.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {activationTimeline.map((event) => (
                                <div
                                    key={event.title}
                                    className='rounded-xl border border-border/40 bg-muted/10 p-4'
                                >
                                    <p className='text-sm font-semibold text-foreground'>
                                        {event.title}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {event.date}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {event.note}
                                    </p>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Next action
                                </p>
                                <p>
                                    Pastikan dokumentasi freelancer highlight
                                    siap sebelum 18 Nov, lalu schedule push
                                    reminder.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            ROI & pendapatan
                        </CardTitle>
                        <CardDescription>
                            Performa kampanye dan rekomendasi optimasi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 lg:grid-cols-3'>
                        {roiBreakdown.map((item) => (
                            <div
                                key={item.label}
                                className='rounded-xl border border-border/40 bg-muted/10 p-4 text-sm text-muted-foreground'
                            >
                                <p className='flex items-center gap-2 text-foreground font-semibold'>
                                    <Coins className='h-4 w-4 text-primary' />
                                    {item.label}
                                </p>
                                <p className='text-xl font-bold text-foreground'>
                                    {item.value}
                                </p>
                                <p>{item.helper}</p>
                            </div>
                        ))}
                        <div className='rounded-xl border border-border/40 bg-muted/10 p-4 text-sm text-muted-foreground lg:col-span-3'>
                            <p className='flex items-center gap-2 text-foreground font-semibold'>
                                <Target className='h-4 w-4 text-primary' />
                                Insight optimasi
                            </p>
                            <p>
                                Aktifkan placement marketplace + promo bundling
                                pomade untuk menjaga CTR di atas 3,5%.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}

type InfoItemProps = {
    label: string;
    value: string;
    icon?: React.ReactNode;
};

function InfoItem({ label, value, icon }: InfoItemProps) {
    return (
        <div className='space-y-1 rounded-lg border border-border/40 bg-background/80 p-3'>
            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                {label}
            </p>
            <div className='flex items-center gap-2 text-sm font-semibold text-foreground'>
                {icon}
                <span>{value}</span>
            </div>
        </div>
    );
}
