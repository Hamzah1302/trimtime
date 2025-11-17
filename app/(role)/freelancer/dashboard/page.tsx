"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  TrendingUp,
  Truck,
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

const todayJobs = [
  {
    id: "JOB-2391",
    customer: "Dimas Saputra",
    time: "10:00 WIB",
    address: "Menara BCA Lt. 32, Jakarta Pusat",
    service: "Home Service Deluxe",
    distance: "8 km",
    travelTime: "25 menit",
    ongkir: "Rp 50.000",
    status: "on-the-way",
    phone: "+62 812-8890-1122"
  },
  {
    id: "JOB-2387",
    customer: "Vino Mahardika",
    time: "13:00 WIB",
    address: "Apartemen Senayan Residence Tower B",
    service: "Signature Fade + Steam",
    distance: "4 km",
    travelTime: "15 menit",
    ongkir: "Rp 30.000",
    status: "confirmed",
    phone: "+62 811-5566-7788"
  },
  {
    id: "JOB-2384",
    customer: "Hafidz Rahman",
    time: "15:30 WIB",
    address: "Apartemen Sudirman Park Tower A",
    service: "Home Service Basic",
    distance: "6 km",
    travelTime: "20 menit",
    ongkir: "Rp 40.000",
    status: "upcoming",
    phone: "+62 813-7700-4511"
  }
] as const;

const completedToday = [
  {
    customer: "Ahmad Rizki",
    time: "08:00 WIB",
    location: "Apartemen Sudirman",
    distance: "12 km",
    earned: "Rp 230.000"
  },
  {
    customer: "Budi Santoso",
    time: "09:00 WIB",
    location: "Rumah Kebayoran",
    distance: "6 km",
    earned: "Rp 180.000"
  }
] as const;

const mobileBarberTips = [
  {
    title: "Konfirmasi alamat lengkap dan akses parkir",
    description: "Hubungi pelanggan 30 menit sebelum untuk memastikan alamat tepat, akses lift, dan area parkir motor/mobil."
  },
  {
    title: "Cek traffic dan berangkat lebih awal",
    description: "Gunakan Google Maps live traffic. Jika macet, berangkat 15-20 menit lebih awal untuk on-time arrival."
  },
  {
    title: "Pastikan pelanggan sediakan setup area",
    description: "Minta pelanggan sediakan handuk, cermin, dan area dekat power outlet untuk clipper dan hairdryer."
  }
] as const;

const mobileLearning = [
  {
    title: "Setup portable barbershop dalam 5 menit",
    description: "Teknik efisien membawa dan setup peralatan portable untuk hemat waktu antar job.",
    cta: "Tonton video"
  },
  {
    title: "Time management untuk 5+ job sehari",
    description: "Strategi mengatur jarak dan waktu antar job agar tidak terlambat dan tetap dapat bonus.",
    cta: "Ikuti kelas"
  }
] as const;

const coverageAreas = [
  { area: "Jakarta Selatan", jobs: 5, earnings: "Rp 1.200.000" },
  { area: "Jakarta Pusat", jobs: 3, earnings: "Rp 850.000" }
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
  }
} as const;

export default function FreelancerDashboardPage() {
  const totalServiceEarned = 650000;
  const totalOngkirEarned = 200000;
  const totalDistanceToday = 18;
  const completedJobsCount = 2;

  // Calculate next job (first non-completed)
  const nextJob = todayJobs.find(job => job.status !== "completed");
  const currentTime = "09:30"; // Mock current time
  const minutesUntilNextJob = 30; // Mock calculation

  return (
    <PageShell background="soft" contentClassName="gap-6">
      {/* Header */}
      <Card className="border-border/50">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-primary/40 shadow-lg">
              <AvatarImage src="/placeholder.jpg" alt="Naya Pratama" />
              <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                NP
              </AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs">
              Top Freelancer
            </Badge>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Naya Pratama</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Jakarta Selatan
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Verified
              </span>
              <span className="inline-flex items-center gap-1">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                Level: Platinum
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Job Alert - Most Important */}
      {nextJob && (
        <Card className="border-blue-300 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-blue-900">
                  Next job dalam {minutesUntilNextJob} menit
                </CardTitle>
              </div>
              <Badge className="bg-blue-600 text-white">
                {nextJob.time}
              </Badge>
            </div>
            <CardDescription className="text-blue-700">
              Berangkat sekarang untuk tiba on-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-blue-300 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-lg">
                    {nextJob.customer}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {nextJob.service}
                  </p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {nextJob.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-primary" />
                      {nextJob.distance} • {nextJob.travelTime} perjalanan
                    </p>
                    <p className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      Ongkir: {nextJob.ongkir}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" asChild>
                    <a href={`https://maps.google.com?q=${nextJob.address}`} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4" />
                      Lihat rute
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`tel:${nextJob.phone}`}>
                      <Phone className="h-4 w-4" />
                      Hubungi
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards - 3 cards focused on mobile barber */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Revenue Today */}
        <Card className="border-green-300 bg-green-50">
          <CardHeader>
            <CardDescription className="text-green-700">
              Pendapatan hari ini
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-green-900">
              Rp {(totalServiceEarned + totalOngkirEarned).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm text-green-700">
              <p>Service: Rp {totalServiceEarned.toLocaleString()}</p>
              <p>Ongkir: Rp {totalOngkirEarned.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Distance Today */}
        <Card className="border-border/50">
          <CardHeader>
            <CardDescription>Jarak tempuh hari ini</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {totalDistanceToday} km
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {completedJobsCount} job completed • Avg {(totalDistanceToday / completedJobsCount).toFixed(1)}km/job
            </p>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card className="border-border/50">
          <CardHeader>
            <CardDescription>Rating pelanggan</CardDescription>
            <CardTitle className="text-3xl font-bold">4.92 / 5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Excellent
              </Badge>
              <p className="text-sm text-muted-foreground">27 ulasan baru</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Jobs Schedule */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Jadwal home service hari ini</CardTitle>
              <CardDescription>
                {todayJobs.length} job terjadwal • {completedJobsCount} selesai
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/freelancer/jobs">Lihat semua job</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Completed Jobs */}
          {completedToday.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">
                Completed
              </p>
              {completedToday.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 p-3 opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-700">
                      {job.time}
                    </Badge>
                    <div>
                      <p className="font-semibold text-foreground">
                        {job.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.location} • {job.distance}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-600">{job.earned}</p>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Jobs */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">
              Upcoming
            </p>
            {todayJobs.map((job) => {
              const config = statusConfig[job.status];
              return (
                <div
                  key={job.id}
                  className="rounded-lg border border-border/40 bg-muted/20 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={config.badge}>
                          {config.label}
                        </Badge>
                        <Badge variant="outline">{job.time}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.id}
                        </Badge>
                      </div>
                      <p className="font-semibold text-foreground">
                        {job.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.service}
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {job.address}
                        </p>
                        <p className="flex items-center gap-2">
                          <Navigation className="h-3.5 w-3.5 text-primary" />
                          {job.distance} • {job.travelTime} perjalanan
                        </p>
                        <p className="flex items-center gap-2">
                          <Truck className="h-3.5 w-3.5 text-primary" />
                          Ongkir: {job.ongkir}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/freelancer/jobs/${job.id.toLowerCase()}`}>
                          Detail
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <a href={`tel:${job.phone}`}>
                          <Phone className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Coverage Area */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Area layanan minggu ini</CardTitle>
          <CardDescription>
            Tracking lokasi dan earnings per area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {coverageAreas.map((area) => (
            <div
              key={area.area}
              className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 p-4"
            >
              <div>
                <p className="font-semibold text-foreground">{area.area}</p>
                <p className="text-sm text-muted-foreground">
                  {area.jobs} job completed
                </p>
              </div>
              <p className="font-semibold text-primary">{area.earnings}</p>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            Expand coverage area
          </Button>
        </CardContent>
      </Card>

      {/* Tips & Learning */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Mobile Barber Tips */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Tips untuk barber mobile</CardTitle>
            <CardDescription>
              Best practices untuk home service profesional
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mobileBarberTips.map((tip, index) => (
              <div
                key={index}
                className="rounded-lg border border-border/40 bg-muted/20 p-4"
              >
                <p className="text-sm font-semibold text-foreground">
                  {index + 1}. {tip.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tip.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mobile Learning */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Pengembangan skill mobile barber</CardTitle>
            <CardDescription>
              Upgrade skill khusus untuk freelancer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mobileLearning.map((item) => (
              <div
                key={item.title}
                className="space-y-3 rounded-lg border border-border/40 bg-muted/20 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  {item.cta}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Target */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Target mingguan</CardTitle>
          <CardDescription>
            Fokus coverage area luas dan rating tinggi untuk bonus
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/40 bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Total pendapatan
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
              Rp 7.500.000
            </p>
            <Progress value={72} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              Kejar Rp 2,9 jt lagi untuk bonus cashback
            </p>
          </div>
          <div className="rounded-lg border border-border/40 bg-muted/20 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Home service sukses
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">9 / 12</p>
            <Progress value={75} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              Pertahankan rating 4.8+ untuk akses job premium
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/freelancer/jobs">
              <CalendarCheck className="h-4 w-4" />
              Lihat job board
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/freelancer/earnings">
              <Wallet className="h-4 w-4" />
              Riwayat pendapatan
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/freelancer/profile">
              <Star className="h-4 w-4" />
              Kelola rating & review
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/freelancer/settings">
              Pengaturan akun
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}