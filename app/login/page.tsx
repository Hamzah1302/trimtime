import Link from "next/link";
import Image from "next/image"; // <-- 1. Tambahkan import Image

import {
  BriefcaseBusiness,
  Crown,
  Scissors,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const loginOptions = [
  {
    label: "Owner Barbershop",
    href: "/login/owner",
    icon: Crown,
    description:
      "Kelola cabang, barber, dan laporan pendapatan secara real-time.",
  },
  {
    label: "Barber Partner",
    href: "/login/barber",
    icon: Scissors,
    description:
      "Kendalikan jadwal, status booking, dan pendapatan harian Anda.",
  },
  {
    label: "Pelanggan TrimTime",
    href: "/login/user",
    icon: UserRound,
    description:
      "Booking cepat tanpa antre dan pantau progres barber pilihan Anda.",
  },
  {
    label: "Freelancer TrimTime",
    href: "/login/freelancer",
    icon: BriefcaseBusiness,
    description:
      "Gabung jaringan job home service eksklusif dengan jadwal fleksibel.",
  },
] as const;

export default function LoginPage() {
  return (
    // 2. Perbaikan typo: bg-linear-to-b -> bg-gradient-to-b
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 px-6 py-12 text-slate-900">
      <span className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
      <span className="pointer-events-none absolute bottom-[-6rem] right-[-2rem] h-80 w-80 rounded-full bg-blue-300/40 blur-[140px]" />
      
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-blue-100/70 bg-white/95 shadow-2xl backdrop-blur md:grid-cols-[1.05fr_1fr]">
        
        {/* === 3. KOLOM KIRI (DIUBAH TOTAL) === */}
        {/* Menghapus semua teks dan menggantinya dengan gambar */}
        <div className="relative hidden min-h-[600px] items-center justify-center p-10 md:flex">
          {/* Gambar Background (Ganti path jika perlu) */}
          <Image
            src="/asset/foto_login.jpg" // Asumsi gambar ada di /public/image_e60efd.jpg
            alt="Interior Barbershop Klasik"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
        
        </div>
        {/* === BATAS KOLOM KIRI === */}


        {/* === 4. KOLOM KANAN (Teks Disederhanakan) === */}
        <div className="flex flex-col gap-8 bg-white/90 p-8 md:p-10">
          <div className="space-y-2 text-center md:text-left">
            {/* PERUBAIKAN: Judul & Deskripsi disederhanakan */}
            <h2 className="text-3xl font-semibold text-slate-900">
              Masuk ke Akun Anda
            </h2>
            <p className="text-base text-slate-500">
              Pilih peran Anda untuk melanjutkan.
            </p>
          </div>

          {/* Bagian ini (pilihan card) sudah sangat bagus, tidak diubah */}
          <div className="grid gap-4">
            {loginOptions.map(
              ({ label, href, icon: Icon, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {label}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 transition group-hover:text-blue-600">
                        Masuk
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>

          {/* Bagian "Belum punya akun?" tetap dipertahankan */}
          <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-500">
            <p className="text-center md:text-left text-slate-600">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Daftar sebagai pelanggan
              </Link>
              .
            </p>
            <p className="text-center text-xs text-slate-400 md:text-left">
              Pendaftaran Mitra Owner & Freelancer via admin.
            </p>
          </div>
        </div>
        {/* === BATAS KOLOM KANAN === */}

      </div>
    </div>
  );
}