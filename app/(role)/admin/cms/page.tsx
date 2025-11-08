"use client";

import {
    Calendar,
    Camera,
    ImagePlus,
    Megaphone,
    PenSquare,
    Tags,
    UploadCloud,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const banners = [
    {
        title: "TrimTime Weekend Sale",
        position: "Home user app",
        status: "Live",
        period: "9 - 11 Feb",
    },
    {
        title: "Freelancer Highlight Jakarta",
        position: "Marketplace & email",
        status: "Scheduled",
        period: "12 Feb",
    },
] as const;

export default function AdminCmsPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Megaphone className='h-4 w-4' />
                                CMS & Konten
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>Kelola banner, artikel, dan barber unggulan</h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pastikan semua kampanye tampil konsisten di aplikasi user & portal owner.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button className='gap-2'>
                                <ImagePlus className='h-4 w-4' />
                                Banner baru
                            </Button>
                            <Button variant='outline' className='border-border/60 gap-2'>
                                <UploadCloud className='h-4 w-4' />
                                Import CSV
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <Tabs defaultValue='banner' className='space-y-4'>
                    <TabsList className='grid w-full grid-cols-3'>
                        <TabsTrigger value='banner'>Banner & promo</TabsTrigger>
                        <TabsTrigger value='artikel'>Artikel & event</TabsTrigger>
                        <TabsTrigger value='featured'>Barber unggulan</TabsTrigger>
                    </TabsList>

                    <TabsContent value='banner' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Banner aktif</CardTitle>
                                <CardDescription>Disinkronkan ke homepage aplikasi user.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                {banners.map((banner) => (
                                    <div key={banner.title} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                        <div className='flex flex-wrap items-center justify-between'>
                                            <div>
                                                <p className='text-base font-semibold text-foreground'>{banner.title}</p>
                                                <p className='text-xs text-muted-foreground'>{banner.position}</p>
                                                <p className='text-xs text-muted-foreground'>Periode: {banner.period}</p>
                                            </div>
                                            <Badge variant='outline' className='border-border/40 text-[10px] uppercase tracking-widest'>
                                                {banner.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Form banner baru</CardTitle>
                                <CardDescription>Upload visual dan tentukan segmentasi.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='banner-title'>Judul</Label>
                                        <Input id='banner-title' placeholder='TrimTime Weekend Sale' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='banner-slot'>Posisi</Label>
                                        <Input id='banner-slot' placeholder='Home user app' />
                                    </div>
                                </div>
                                <div className='grid gap-4 sm:grid-cols-2'>
                                    <div className='space-y-2'>
                                        <Label>Mulai</Label>
                                        <Input type='date' defaultValue='2025-02-10' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label>Selesai</Label>
                                        <Input type='date' defaultValue='2025-02-12' />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='banner-desc'>Deskripsi singkat</Label>
                                    <Textarea id='banner-desc' rows={3} placeholder='Highlight benefit promo, CTA, dsb' />
                                </div>
                                <div className='rounded-xl border border-dashed border-border/60 bg-muted/15 p-6 text-center text-sm text-muted-foreground'>
                                    <Camera className='mx-auto mb-2 h-6 w-6 text-primary' />
                                    <p>Upload banner 1080x600 (JPG/PNG)</p>
                                    <Button variant='outline' className='mt-3 border-border/60'>
                                        Pilih file
                                    </Button>
                                </div>
                                <Button className='w-full'>Simpan dan publish</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='artikel' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Artikel & event lokal</CardTitle>
                                <CardDescription>Tampilkan edukasi perawatan dan event komunitas.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {[
                                    { title: "Workshop styling Bandung", date: "12 Feb", status: "Live" },
                                    { title: "Tips home service aman", date: "10 Feb", status: "Draft" },
                                ].map((item) => (
                                    <div key={item.title} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-base font-semibold text-foreground'>{item.title}</p>
                                                <p className='text-xs text-muted-foreground'>
                                                    <Calendar className='mr-1 inline h-3.5 w-3.5 text-primary' />
                                                    {item.date}
                                                </p>
                                            </div>
                                            <Badge
                                                variant='outline'
                                                className='border-border/40 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {item.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                                <Button variant='outline' className='w-full border-border/60 gap-2'>
                                    <PenSquare className='h-4 w-4' />
                                    Buat artikel baru
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='featured' className='space-y-4'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>Barber unggulan & sponsor</CardTitle>
                                <CardDescription>Tentukan barber yang tampil di hero user.</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                {[
                                    { name: "Rama Putra", metric: "Rating 4.95 • 120 booking" },
                                    { name: "Naya Pratama", metric: "Freelancer otw • 98 booking" },
                                ].map((item) => (
                                    <div key={item.name} className='rounded-xl border border-border/40 bg-muted/15 p-4'>
                                        <p className='text-base font-semibold text-foreground'>{item.name}</p>
                                        <p>{item.metric}</p>
                                    </div>
                                ))}
                                <Button variant='outline' className='w-full border-border/60 gap-2'>
                                    <Tags className='h-4 w-4' />
                                    Atur slot sponsor
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </PageShell>
    );
}
