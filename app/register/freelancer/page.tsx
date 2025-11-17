// hamzah1302/trimtime/trimtime-master/app/register/freelancer/page.tsx

import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, Video } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FreelancerRegisterPage() {
  return (
    <PageShell
      background="plain"
      containerClassName="pb-20 sm:pb-16"
      // Ubah max-width dan contentClassName
      contentClassName="gap-10"
    >
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Tombol kembali, di luar grid */}
        <header className="flex w-full items-center justify-between gap-4">
          <Button asChild variant="ghost" className="gap-2 px-0 text-muted-foreground hover:text-foreground">
            <Link href="/login/freelancer">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke login freelancer
            </Link>
          </Button>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            TrimTime Freelancer
          </span>
        </header>

        {/* =================================================
          PERUBAHAN UTAMA: Layout Grid 2 Kolom
          =================================================
        */}
        <main className="grid w-full grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
          
          {/* KOLOM KIRI: Informasi & Langkah Selanjutnya */}
          <div className="space-y-8 md:pt-4">
            <section className="space-y-3 text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-primary/20 dark:text-primary-light">
                Bergabung sebagai partner lepas
              </p>
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Daftar sebagai Freelancer TrimTime
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Lengkapi profil profesional kamu dan unggah bukti portofolio dalam bentuk video atau link.
                Setelah disetujui admin TrimTime, kamu akan menerima email verifikasi untuk mengaktifkan akun.
              </p>
            </section>

            {/* "Langkah Selanjutnya" dipindah ke kolom kiri */}
            <section className="space-y-3 rounded-2xl border border-border/60 bg-muted/40 p-5 text-sm text-muted-foreground dark:bg-slate-800/60">
              <div className="flex items-center gap-3 text-foreground">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <p className="font-semibold">Apa langkah selanjutnya?</p>
              </div>
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Tim admin TrimTime akan meninjau portofolio kamu maksimal 1×24 jam kerja.
                </li>
                <li>
                  Jika disetujui, kamu akan menerima email verifikasi untuk mengaktifkan akun freelancer.
                </li>
                <li>
                  Setelah aktif, kamu bisa login dan mulai memilih job on-demand sesuai keahlianmu.
                </li>
              </ol>
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 text-xs text-primary dark:bg-primary/10">
                <Video className="h-4 w-4" />
                <span>Pastikan video portofolio menampilkan hasil karya dan proses kerja terbaikmu.</span>
              </div>
            </section>
          </div>

          {/* KOLOM KANAN: Formulir Pendaftaran */}
          <section className="space-y-6 rounded-3xl border border-border bg-card/95 p-6 shadow-md dark:border-slate-800 dark:bg-slate-900/90">
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nama lengkap
                  </label>
                  <Input
                    id="full-name"
                    name="full-name"
                    placeholder="Tulis nama sesuai KTP"
                    autoComplete="name"
                    required
                    className="rounded-xl border-border" // Ubah jadi rounded-xl
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nomor WhatsApp aktif
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Contoh: 0812 3456 7890"
                    autoComplete="tel"
                    required
                    className="rounded-xl border-border" // Ubah jadi rounded-xl
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email profesional
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="freelancer@contoh.com"
                    autoComplete="email"
                    required
                    className="rounded-xl border-border" // Ubah jadi rounded-xl
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Domisili utama
                  </label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Kota / Kabupaten"
                    required
                    className="rounded-xl border-border" // Ubah jadi rounded-xl
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="services" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Spesialisasi layanan barber
                </label>
                <Textarea
                  id="services"
                  name="services"
                  placeholder="Contoh: Fade haircut, hair tattoo, coloring, perawatan rambut, dll."
                  required
                  className="rounded-xl border-border" // Ubah jadi rounded-xl
                />
                <p className="text-xs text-muted-foreground">
                  Ceritakan jenis layanan utama dan pengalaman profesional kamu.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="portfolio-video" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Unggah video portofolio
                  </label>
                  <Input
                    id="portfolio-video"
                    name="portfolio-video"
                    type="file"
                    accept="video/mp4,video/mov"
                    className="rounded-xl border-dashed" // Ubah jadi rounded-xl
                  />
                  <p className="text-xs text-muted-foreground">
                    Format MP4/MOV, maks 100MB.
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="portfolio-link" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Link video portofolio
                  </label>
                  <Input
                    id="portfolio-link"
                    name="portfolio-link"
                    type="url"
                    placeholder="https://youtu.be/"
                    className="rounded-xl border-border" // Ubah jadi rounded-xl
                  />
                  <p className="text-xs text-muted-foreground">
                    YouTube, Drive, Instagram, dll.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Catatan tambahan (opsional)
                </label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Tuliskan sertifikasi, pengalaman lomba, atau preferensi job."
                  className="rounded-xl border-border" // Ubah jadi rounded-xl
                />
              </div>

              <div className="space-y-3 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground dark:bg-slate-800/50">
                <p className="font-semibold text-foreground">Konfirmasi pendaftaran</p>
                <label className="flex items-start gap-3 text-left">
                  <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border" />
                  <span>
                    Saya menyatakan data yang diisi benar dan siap mengikuti proses kurasi freelancer TrimTime. Saya memahami bahwa akun akan aktif setelah admin menyetujui portofolio saya.
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Kirim pendaftaran freelancer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </section>
        </main>
      </div>
    </PageShell>
  );
}