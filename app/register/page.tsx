import Link from "next/link";

import { ArrowLeft, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { RegisterForm } from "@/components/register/register-form";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <PageShell background="plain" containerClassName="pb-20 sm:pb-16" contentClassName="gap-10">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit gap-2 px-0 text-muted-foreground hover:text-foreground"
        >
          <Link href="/login">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke login
          </Link>
        </Button>

        <div className="space-y-5 rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm backdrop-blur">
          <header className="space-y-3 text-center sm:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Mulai perjalananmu di TrimTime
            </p>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Buat akun TrimTime
              </h1>
              <p className="text-sm text-muted-foreground">
                Satu akun untuk booking layanan, mengelola jadwal, dan mengumpulkan loyalty point.
              </p>
            </div>
          </header>

          <section className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-inner">
            <RegisterForm />
          </section>

          <section className="rounded-2xl border border-dashed border-border/70 bg-muted/40 p-4 text-center text-xs text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-primary underline-offset-2 hover:underline">
              Masuk di sini
            </Link>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
