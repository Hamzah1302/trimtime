"use client";
import Link from "next/link";
import {
  Scissors,
  Users,
  Store,
  Calendar,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles, // Tetap di-import untuk bagian lain
  Menu,
  X,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  User,
  Building,
  UserCheck,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image"; // Import Image sudah ada

// --- DATA ROLES (Tidak Berubah) ---
const roles = [
  {
    icon: User,
    title: "Pelanggan",
    description:
      "Booking tanpa antre, panggil barber ke rumah (Home Service), dan beli produk grooming.",
  },
  {
    icon: Building,
    title: "Owner Barbershop",
    description:
      "Kelola jadwal barber, lihat laporan keuangan, dan jual produk di marketplace.",
  },
  {
    icon: UserCheck,
    title: "Barber (Karyawan)",
    description:
      "Dapatkan jadwal booking otomatis, atur pelanggan, dan lihat pendapatan komisi.",
  },
  {
    icon: Briefcase,
    title: "Freelance Barber",
    description:
      "Terima panggilan Home Service tanpa harus punya tempat. Atur jadwal fleksibel Anda sendiri.",
  },
];

// --- DATA STATS (Tidak Berubah) ---
const stats = [
  { value: "50+", label: "Barbershop Partner" },
  { value: "25%", label: "Average Growth" },
  { value: "85%", label: "Customer Retention" },
];

// --- DATA TESTIMONI (Tidak Berubah) ---
const testimonials = [
  {
    name: "Asep Sunarya",
    role: "Owner, Barbershop Asgar",
    content:
      "Semenjak pakai TrimTime, barbershop saya jadi lebih teratur. Nggak ada lagi antrean numpuk. Pelanggan Garut juga senang bisa booking dulu.",
    avatar: "AS",
  },
  {
    name: "Rina Marlina",
    role: "Pelanggan (Ibu Rumah Tangga)",
    content:
      "Fitur Home Service-nya ngebantu banget. Saya bisa panggil barber ke rumah untuk anak saya. Praktis dan aman, barbernya bisa dilacak via GPS.",
    avatar: "RM",
  },
  {
    name: "Budi Hartono",
    role: "Freelance Barber, Garut",
    content:
      "Saya bisa tetap kerja sebagai barber freelance di sela-sela kuliah. Aplikasinya gampang dipakai untuk terima panggilan. Sangat fleksibel.",
    avatar: "BH",
  },
];

// --- DATA HARGA (Tidak Berubah) ---
const pricingPlans = [
  {
    name: "Lite",
    price: "Gratis",
    period: "",
    description: "Untuk barber mandiri atau yang baru mulai",
    features: [
      "Fitur dasar booking",
      "Manajemen 1 barber",
      "Tampil di aplikasi pelanggan",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "50K",
    period: "/bulan",
    description: "Untuk barbershop kecil & menengah",
    features: [
      "Semua fitur Lite",
      "Laporan keuangan",
      "Fitur marketplace produk",
      "Manajemen s.d 5 barber",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "100K",
    period: "/bulan",
    description: "Untuk bisnis yang ingin tumbuh",
    features: [
      "Semua fitur Pro",
      "Analitik AI (prediksi ramai)",
      "Prioritas tampil di pencarian",
      "Dukungan prioritas",
    ],
    popular: false,
  },
];

// --- DATA FAQ (Tidak Berubah) ---
const faqs = [
  {
    question: "Apa itu TrimTime?",
    answer: (
      <>
        TrimTime adalah platform digital yang menghubungkan pelanggan, tukang
        cukur (barber), dan pemilik barbershop.
        <br />
        <br />
        Dengan TrimTime, kamu bisa booking jadwal cukur tanpa antre, memesan
        barber panggilan ke rumah, dan bahkan membeli produk grooming langsung
        dari barbershop favoritmu.
      </>
    ),
  },
  {
    question: "Siapa saja yang bisa menggunakan TrimTime?",
    answer: (
      <>
        TrimTime bisa digunakan oleh empat jenis pengguna:
        <ul className="list-disc space-y-1 pl-6 mt-2">
          <li>
            <b>Pelanggan</b> – untuk booking layanan cukur & home service.
          </li>
          <li>
            <b>Barber</b> – untuk menerima jadwal dan mengatur pelanggan.
          </li>
          <li>
            <b>Freelance Barber</b> – untuk melayani panggilan tanpa harus
            punya tempat tetap.
          </li>
          <li>
            <b>Owner Barbershop</b> – untuk mengatur barber, laporan keuangan,
            dan marketplace produk.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Apakah TrimTime hanya untuk barbershop besar?",
    answer: (
      <>
        Tidak. TrimTime justru dirancang untuk barber kecil dan mandiri di
        daerah seperti Garut dan sekitarnya.
        <br />
        <br />
        Setiap barber — bahkan yang belum punya tempat tetap — bisa mendaftar
        sebagai freelance barber dan menerima pelanggan dari aplikasi.
      </>
    ),
  },
  {
    question: "Bagaimana cara melakukan booking di TrimTime?",
    answer: (
      <ol className="list-decimal space-y-1 pl-6 mt-2">
        <li>Buka aplikasi TrimTime.</li>
        <li>Pilih barbershop atau barber freelance terdekat.</li>
        <li>Pilih layanan dan waktu yang tersedia.</li>
        <li>Lakukan pembayaran (QRIS, e-wallet, atau tunai).</li>
        <li>Tunggu konfirmasi barber — dan nikmati cukur tanpa antre! 💈</li>
      </ol>
    ),
  },
  {
    question:
      "Apakah TrimTime menyediakan layanan panggilan ke rumah (home service)?",
    answer: (
      <>
        Ya. Kamu bisa pilih opsi “Home Service” saat booking.
        <br />
        <br />
        Barber akan datang ke rumahmu sesuai jadwal yang dipilih, dan kamu bisa
        melacak posisi barber secara real-time melalui GPS di aplikasi.
      </>
    ),
  },
  {
    question: "Apa keuntungan bagi barber yang bergabung di TrimTime?",
    answer: (
      <>
        Barber mendapatkan:
        <ul className="list-disc space-y-1 pl-6 mt-2">
          <li>Sistem booking otomatis tanpa ribet antre manual.</li>
          <li>Laporan keuangan & pendapatan harian.</li>
          <li>Fitur AI Prediction untuk tahu waktu ramai.</li>
          <li>Akses marketplace untuk menjual produk grooming.</li>
          <li>Peluang pelanggan baru lewat fitur Freelance Barber.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Apakah TrimTime berbayar untuk pengguna?",
    answer: (
      <>
        Untuk pelanggan, TrimTime gratis digunakan.
        <br />
        <br />
        Untuk barber & owner, tersedia 3 pilihan paket:
        <ul className="list-disc space-y-1 pl-6 mt-2">
          <li>
            <b>Lite (Gratis)</b> – fitur dasar booking.
          </li>
          <li>
            <b>Pro (Rp50.000/bulan)</b> – laporan & marketplace.
          </li>
          <li>
            <b>Business (Rp100.000/bulan)</b> – analitik AI & prioritas
            tampil.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Apakah data pengguna TrimTime aman?",
    answer: (
      <>
        Ya. Semua data pengguna dan transaksi disimpan di server PostgreSQL &
        Firebase yang terenkripsi.
        <br />
        <br />
        TrimTime mengikuti kebijakan Keamanan Data PSE dan Privasi Pengguna
        Digital Indonesia.
      </>
    ),
  },
  {
    question: "Apakah TrimTime bisa digunakan di luar Garut?",
    answer: (
      <>
        Saat ini fokus pengembangan masih di Garut dan sekitarnya, tapi ke depan
        TrimTime akan diperluas ke wilayah Tasikmalaya, Bandung, dan Ciamis
        sebagai tahap ekspansi regional.
      </>
    ),
  },
];

// --- KOMPONEN UTAMA ---
export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-blue-100/60 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            
            {/* === PERUBAHAN: LOGO BARU DI SINI === */}
            <Link
              href="/"
              className="flex items-center" // ClassName disederhanakan
            >
              {/* Ganti ikon Sparkles dan Teks dengan Logo Gambar */}
              <Image
                src="/asset/logo-trimtime.png" // Pastikan file ini ada di /public/logo-trimtime.png
                alt="TrimTime Logo"
                width={100} // Sesuaikan lebar logo Anda
                height={20} // Sesuaikan tinggi logo Anda
                priority // Penting untuk LCP (Largest Contentful Paint)
              />
            </Link>
            {/* === BATAS PERUBAHAN LOGO === */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#roles" 
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Untuk Siapa
              </Link>
              <Link
                href="#about"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Mengapa Kami
              </Link>
              <Link
                href="#pricing"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Harga
              </Link>
              <Link
                href="#faq"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                FAQ
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Masuk
                </Link>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link href="/register">Daftar Sekarang</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-blue-100/60 py-4">
              <div className="flex flex-col gap-4">
                <Link href="#roles" className="text-slate-600">
                  Untuk Siapa
                </Link>
                <Link href="#about" className="text-slate-600">
                  Mengapa Kami
                </Link>
                <Link href="#pricing" className="text-slate-600">
                  Harga
                </Link>
                <Link href="#faq" className="text-slate-600">
                  FAQ
                </Link>
                <div className="flex flex-col gap-2 pt-2 border-t border-blue-100/60">
                  <Link href="/login" className="text-slate-600">
                    Masuk
                  </Link>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 w-fit"
                    asChild
                  >
                    <Link href="/register">Daftar Sekarang</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kolom Teks */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <MapPin className="h-4 w-4" />
                Dibuat untuk Ekosistem Barbershop Garut
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900">
                Platform Ekosistem
                <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                  {" "}
                  Barbershop di Garut
                </span>
              </h1>

              <p className="mx-auto lg:mx-0 max-w-2xl text-xl text-slate-600">
                Menghubungkan Pelanggan, Owner, Barber, dan Freelancer dalam
                satu aplikasi. Booking, Home Service, dan Marketplace jadi satu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  asChild
                >
                  <Link href="/login/user">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Booking Sekarang
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3"
                  asChild
                >
                  <Link href="/register/owner">Daftar Sebagai Mitra</Link>
                </Button>
              </div>
            </div>

            {/* Kolom Visual (Placeholder Slideshow) */}
            <div className="relative h-[400px] lg:h-[500px] w-full bg-slate-200 rounded-xl overflow-hidden shadow-xl border border-blue-200">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700">
                <p className="text-center text-lg font-semibold px-4">
                  [Tempat untuk Slideshow Gambar Aplikasi]
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-700">
                  {stat.value}
                </div>
                <div className="mt-1 text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian "Untuk Siapa" */}
      <section id="roles" className="bg-blue-50/50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Dibuat Untuk Ekosistem Barbershop
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              TrimTime memberdayakan setiap peran dalam industri, bukan hanya
              pemilik.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <Card
                  key={index}
                  className="border border-blue-100/70 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">
                      {role.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {role.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Placeholder Slideshow Tambahan */}
          <div className="mt-16 relative h-[300px] w-full bg-slate-200 rounded-xl overflow-hidden shadow-lg border border-blue-200">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700">
              <p className="text-center text-lg font-semibold px-4">
                [Tempat untuk Slideshow Fitur Unggulan]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900">
                Mengapa Memilih TrimTime?
              </h2>
              <p className="mb-6 text-slate-600">
                TrimTime hadir sebagai solusi digital terdepan untuk industri
                barbershop, dimulai dari Garut. Kami memahami tantangan unik
                yang dihadapi pemilik dan barber lokal.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Mudah Digunakan
                    </h4>
                    <p className="text-sm text-slate-600">
                      Interface yang intuitif, tidak perlu training khusus.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Support Lokal
                    </h4>
                    <p className="text-sm text-slate-600">
                      Tim support kami ada di Garut, siap membantu kapan saja.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Ekosistem Terintegrasi
                    </h4>
                    <p className="text-sm text-slate-600">
                      Semua fitur (booking, home service, marketplace) dalam
                      satu platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                <div className="rounded-xl bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Dashboard Analytics</h4>
                      <p className="text-sm text-slate-500">
                        Real-time insights
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Hari Ini</span>
                      <span className="font-semibold text-green-600">
                        +15%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-blue-100">
                      <div className="h-2 w-3/4 rounded-full bg-blue-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-blue-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Apa Kata Mereka?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Dengar langsung dari ekosistem kami di Garut dan sekitarnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-blue-100 bg-white p-6 shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-slate-600">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Pilih Paket Yang Tepat
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Harga jujur dan transparan, dirancang untuk pasar Garut. Mulai
              gratis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-6 ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-lg"
                    : "border border-blue-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                      Terpopuler
                    </span>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-blue-600">
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-blue-600">
                        {plan.price}
                      </span>
                      <span className="text-slate-500">{plan.period}</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                    asChild
                  >
                    <Link href="/register">Pilih Paket</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-blue-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-blue-700">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Temukan jawaban untuk pertanyaan umum tentang TrimTime
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border border-blue-100 bg-white"
              >
                <CardContent className="p-0">
                  <button
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-blue-50"
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                  >
                    <h3 className="pr-4 font-semibold text-slate-900">
                      {faq.question}
                    </h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <div className="text-slate-600">{faq.answer}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              
              {/* === PERUBAHAN: LOGO BARU DI FOOTER === */}
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/asset/logo-trimtime.png" // Pastikan file ini ada di /public/logo-trimtime.png
                  alt="TrimTime Logo"
                  width={90} // Sedikit lebih besar di footer
                  height={15} 
                />
              </div>
              {/* === BATAS PERUBAHAN LOGO === */}

              <p className="mb-6 text-lg leading-relaxed text-slate-600">
                Platform ekosistem barbershop terpadu. Dibuat dan didedikasikan
                untuk mendukung pertumbuhan industri barbershop di Garut dan
                sekitarnya.
              </p>
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-700">
                  Dipercaya oleh 50+ Partner di Garut
                </span>
              </div>
              <div className="flex gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link href="/register/owner">Daftar Mitra</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300"
                  asChild
                >
                  <Link href="/login/user">Booking Cukur</Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-blue-700 mb-6 text-lg">
                Produk
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#roles"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Untuk Siapa
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Mengapa Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Harga & Paket
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-blue-700 mb-6 text-lg">
                Dukungan
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Pusat Bantuan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="font-medium text-slate-600 transition-colors hover:text-blue-600"
                  >
                    Syarat Layanan
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span>
                  &copy; {new Date().getFullYear()} TrimTime. All rights
                  reserved.
                </span>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
              <div className="text-sm text-slate-500">
                Made with ❤️ in Garut, Indonesia
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}