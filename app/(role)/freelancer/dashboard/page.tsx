"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  TrendingUp,
  Wallet
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
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const summaryMetrics = [
  {
    label: "Job Aktif",
    value: "5 penugasan",
    helper: "3 on-site, 2 home service",
    trend: "+1 dibanding kemarin",
    icon: BriefcaseBusiness
  },
  {
    label: "Pendapatan Minggu Ini",
    value: "Rp 4.850.000",
    helper: "Tercapai 72% dari target",
    trend: "+9% dibanding minggu lalu",
    icon: Wallet
  },
  {
    label: "Rating Pelanggan",
    value: "4.92 / 5",
    helper: "27 ulasan baru",
    trend: "Pertahankan konsistensi",
    icon: Star
  },
  {
    label: "Jam Tersedia",
    value: "18 jam",
    helper: "3 jam masih kosong",
    trend: "Isi slot sore untuk bonus",
    icon: Clock
  }
] as const;

const activeJobs = [
  {
    id: "JOB-2391",
    customer: "Dimas Saputra",
    time: "11 Feb • 10:00 WIB",
    location: "Menara BCA, Jakarta",
    service: "Home Service Deluxe",
    status: "OTW",
    statusTone: "ongoing"
  },
  {
    id: "JOB-2387",
    customer: "Vino Mahardika",
    time: "11 Feb • 13:00 WIB",
    location: "TrimTime HQ, SCBD",
    service: "Signature Fade + Steam",
    status: "Terkonfirmasi",
    statusTone: "confirmed"
  },
  {
    id: "JOB-2384",
    customer: "Hafidz Rahman",
    time: "11 Feb • 15:30 WIB",
    location: "Apartemen Sudirman Park",
    service: "Home Service Basic",
    status: "Briefing",
    statusTone: "pending"
  }
] as const;

const learningHighlights = [
  {
    title: "Kelas styling editorial",
    description: "Ikuti workshop online 45 menit untuk gaya foto campaign.",
    cta: "Gabung kelas",
    href: "/freelancer/pengaturan"
  },
  {
    title: "Optimalkan profil sosial",
    description: "Perbarui portofolio video untuk mempercepat approval job.",
    cta: "Atur portofolio",
    href: "/freelancer/pengaturan"
  }
] as const;

const statusBadgeStyles = {
  pending: "bg-amber-500/15 text-amber-600",
  confirmed: "bg-primary/10 text-primary",
  ongoing: "bg-sky-500/15 text-sky-600"
} satisfies Record<string, string>;

export default function FreelancerDashboardPage() {
  return (
    <PageShell background="soft" contentClassName="gap-0">
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-primary/40 shadow-lg">
                <AvatarImage src="/placeholder.jpg" alt="Naya Pratama" />
                <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                  NP
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 border border-primary/40 bg-primary text-primary-foreground shadow">
                Top Freelancer
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Dashboard Freelancer
              </p>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Naya Pratama</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Jakarta Selatan
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Status: Verified
                </span>
                <span className="inline-flex items-center gap-1">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  Level: Platinum
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-border/40 bg-card/80 p-4 shadow-sm backdrop-blur lg:items-end">
            <Badge variant="outline" className="border-border/60 bg-muted/30 text-xs font-semibold uppercase tracking-widest">
              Slot Minggu Ini
            </Badge>
            <p className="text-sm text-muted-foreground">
              Kuota job tersisa <span className="font-semibold text-foreground">2</span> dari 7 penerimaan.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-border/60" asChild>
                <Link href="/freelancer/jobs">Lihat job board</Link>
              </Button>
              <Button asChild>
                <Link href="/freelancer/home-service">Mulai perjalanan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="space-y-6 px-5 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map(({ label, value, helper, trend, icon: Icon }) => (
            <Card key={label} className="border-border/50 bg-card/90 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <Badge variant="outline" className="border-border/40 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-card-foreground">{value}</CardTitle>
                <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                  {helper}
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t border-border/40 pt-4">
                <p className="text-xs font-semibold text-emerald-600">{trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-xl font-semibold tracking-tight">Job aktif hari ini</CardTitle>
                <CardDescription>Monitor progress penugasan dan status perjalanan.</CardDescription>
              </div>
              <Button variant="outline" className="border-border/60" asChild>
                <Link href="/freelancer/jobs">Kelola semua job</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-11 w-11 border border-border/40 shadow-sm">
                      <AvatarImage src="/placeholder.jpg" alt={job.customer} />
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {job.customer
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-card-foreground">{job.customer}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarCheck className="h-3.5 w-3.5 text-primary" />
                          {job.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BriefcaseBusiness className="h-3.5 w-3.5 text-primary" />
                          {job.service}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {job.location}
                        </span>
                      </div>
                      <Badge className={statusBadgeStyles[job.statusTone]}>{job.status}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 text-xs text-muted-foreground sm:items-end">
                    <p className="font-semibold uppercase tracking-widest text-foreground">{job.id}</p>
                    <Button variant="outline" size="sm" className="border-border/60" asChild>
                      <Link href={`/freelancer/jobs/${job.id.toLowerCase()}`}>Detail job</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="space-y-3">
              <CardTitle className="text-xl font-semibold tracking-tight">Pengembangan skill</CardTitle>
              <CardDescription>Upgrade kemampuan untuk naik level dan akses job eksklusif.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningHighlights.map((item) => (
                <div key={item.title} className="space-y-3 rounded-xl border border-border/40 bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <TrendingUp className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-border/60" asChild>
                    <Link href={item.href}>{item.cta}</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-xl font-semibold tracking-tight">Tips komunikasi pelanggan</CardTitle>
              <CardDescription>Bangun relasi profesional agar pelanggan langganan makin loyal.</CardDescription>
            </div>
            <Badge variant="outline" className="border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground">
              Update 30 menit lalu
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Konfirmasi 1 jam sebelum sesi",
                description: "Gunakan template WhatsApp profesional agar pelanggan siap menerima layanan.",
                icon: MessageCircle
              },
              {
                title: "Rekomendasikan perawatan",
                description: "Setelah layanan selesai, sarankan produk TrimTime untuk upsell tambahan.",
                icon: ArrowRight
              },
              {
                title: "Minta ulasan positif",
                description: "Kirim link rating agar reputasi profil kamu terus naik.",
                icon: Star
              }
            ].map((tip) => (
              <div key={tip.title} className="flex gap-3 rounded-xl border border-border/40 bg-background/70 px-4 py-3 shadow-sm">
                <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <tip.icon className="h-4 w-4" />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{tip.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-3">
            <CardTitle className="text-xl font-semibold tracking-tight">Target mingguan</CardTitle>
            <CardDescription>Fokus pada kombinasi job on-site dan home service untuk bonus.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total pendapatan</p>
                <p className="text-2xl font-bold text-foreground">Rp 7.500.000</p>
                <Progress value={72} className="mt-3" />
                <p className="mt-2 text-xs text-muted-foreground">Kejar minimal Rp 2.900.000 lagi untuk bonus cashback.</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Home service sukses</p>
                <p className="text-2xl font-bold text-foreground">9 / 12</p>
                <Progress value={75} className="mt-3" />
                <p className="mt-2 text-xs text-muted-foreground">Pertahankan rating 4.8+ untuk akses prioritas job corporate.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </PageShell>
  );
}
