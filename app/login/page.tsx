import Link from "next/link";
import Image from "next/image"; // Import Image sudah ada

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
    // Latar belakang diubah ke variabel tema
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/50 to-muted px-6 py-12 text-foreground">
      {/* Blur diubah ke warna primary (Emas) */}
      <span className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <span className="pointer-events-none absolute bottom-[-6rem] right-[-2rem] h-80 w-80 rounded-full bg-primary/30 blur-[140px]" />
      
      {/* Card container diubah ke variabel tema */}
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl backdrop-blur md:grid-cols-[1.05fr_1fr]">
        
        {/* === KOLOM KIRI (GAMBAR) === */}
        {/* Tidak ada perubahan warna di sini, hanya gambar */}
        <div className="relative hidden min-h-[600px] items-center justify-center p-10 md:flex">
          <Image
            src="/asset/foto_login.jpg" 
            alt="Interior Barbershop Klasik"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
        </div>
        {/* === BATAS KOLOM KIRI === */}


        {/* === KOLOM KANAN (FORM LOGIN) === */}
        {/* Background diubah ke variabel card */}
        <div className="flex flex-col gap-8 bg-card/90 p-8 md:p-10">
          <div className="space-y-2 text-center md:text-left">
            {/* Teks diubah ke variabel foreground */}
            <h2 className="text-3xl font-semibold text-foreground">
              Masuk ke Akun Anda
            </h2>
            <p className="text-base text-muted-foreground">
              Pilih peran Anda untuk melanjutkan.
            </p>
          </div>

          {/* Pilihan Card Login */}
          <div className="grid gap-4">
            {loginOptions.map(
              ({ label, href, icon: Icon, description }) => (
                <Link
                  key={href}
                  href={href}
                  // Warna border, background, hover, dan focus diubah ke variabel tema
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-card/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {/* Warna ikon diubah ke primary (Emas) */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {label}
                      </span>
                      {/* Warna teks hover diubah ke primary (Emas) */}
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/80 transition group-hover:text-primary">
                        Masuk
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>

          {/* Box "Belum punya akun?" */}
          {/* Warna diubah ke variabel muted dan primary */}
          <div className="space-y-3 rounded-2xl border border-border bg-muted p-5 text-sm text-muted-foreground">
            <p className="text-center md:text-left text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-primary/90 hover:underline"
              >
                Daftar sebagai pelanggan
              </Link>
              .
            </p>
            <p className="text-center text-xs text-muted-foreground/80 md:text-left">
              Pendaftaran Mitra Owner & Freelancer via admin.
            </p>
          </div>
        </div>
        {/* === BATAS KOLOM KANAN === */}

      </div>
    </div>
  );
}