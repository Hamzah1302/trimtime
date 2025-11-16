"use client";

import {
    MessageCircle,
    Star,
    ThumbsUp,
    TrendingUp,
    UserCheck,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reviews = [
    {
        customer: "Rizky Pratama",
        branch: "SCBD",
        rating: 5,
        highlight: "Suka steam therapy & ambience lounge",
        sentiment: "Positive",
    },
    {
        customer: "Ivana Anjani",
        branch: "Menteng",
        rating: 4,
        highlight: "Barber bagus, waiting list cukup lama",
        sentiment: "Attention",
    },
    {
        customer: "Adrian Yusuf",
        branch: "BSD",
        rating: 3,
        highlight: "Home service telat 10 menit tapi masih ok",
        sentiment: "Follow up",
    },
] as const;

const insights = [
    {
        label: "Rating rata-rata",
        value: "4.86 / 5",
        helper: "+0.2 vs minggu lalu",
    },
    {
        label: "Ulasan baru",
        value: "1.247",
        helper: "62% mention barber tertentu",
    },
    { label: "Balasan owner", value: "92%", helper: "Saran: balas < 2 jam" },
] as const;

export default function OwnerReviewPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Star className='h-4 w-4' />
                                Review Monitoring
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Pantau ulasan & respons
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Balas ulasan, analisis rating per barber, dan
                                bandingkan pelanggan baru vs loyal.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button>Balas ulasan teratas</Button>
                            <Button
                                variant='outline'
                                className='border-border/60'
                            >
                                Export insight
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {insights.map((item) => (
                        <Card
                            key={item.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>
                                    {item.label}
                                </CardDescription>
                                <CardTitle className='text-2xl font-bold'>
                                    {item.value}
                                </CardTitle>
                                <p className='text-xs text-muted-foreground'>
                                    {item.helper}
                                </p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue='reviews' className='space-y-4'>
                    <TabsList>
                        <TabsTrigger value='reviews'>
                            Ulasan terbaru
                        </TabsTrigger>
                        <TabsTrigger value='analysis'>
                            Analisis rating
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='reviews' className='space-y-3'>
                        {reviews.map((review) => (
                            <Card
                                key={review.customer}
                                className='border-border/50 shadow-sm'
                            >
                                <CardContent className='flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
                                    <div className='flex w-full flex-col gap-2'>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='h-10 w-10 border border-border/40'>
                                                <AvatarFallback>
                                                    {review.customer.slice(
                                                        0,
                                                        2
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='font-semibold text-foreground'>
                                                    {review.customer}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {review.branch}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest'
                                            >
                                                {review.sentiment}
                                            </Badge>
                                            <span className='inline-flex items-center gap-1 text-sm font-semibold text-foreground'>
                                                <Star className='h-3.5 w-3.5 text-primary' />
                                                {review.rating}
                                            </span>
                                        </div>
                                        <p className='text-sm text-muted-foreground'>
                                            {review.highlight}
                                        </p>
                                    </div>
                                    <Button
                                        variant='outline'
                                        className='border-border/60'
                                    >
                                        Balas pelanggan
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                    <TabsContent value='analysis'>
                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold'>
                                    Rating per barber & pelanggan
                                </CardTitle>
                                <CardDescription>
                                    Insight pelanggan baru vs lama.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='grid gap-4 sm:grid-cols-2'>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                    <p className='flex items-center gap-2 text-foreground font-semibold'>
                                        <TrendingUp className='h-4 w-4 text-primary' />
                                        Barber dengan rating tertinggi
                                    </p>
                                    <p>Rama Putra • 4.95 / 5 (126 ulasan)</p>
                                    <p>Naya Pratama • 4.92 / 5 (98 ulasan)</p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                    <p className='flex items-center gap-2 text-foreground font-semibold'>
                                        <UserCheck className='h-4 w-4 text-primary' />
                                        Pelanggan baru vs lama
                                    </p>
                                    <p>
                                        Baru 38% • Lama 62% (target 70% loyal)
                                    </p>
                                    <p>
                                        Rekomendasi: aktifkan promo loyal tier
                                    </p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                    <p className='flex items-center gap-2 text-foreground font-semibold'>
                                        <ThumbsUp className='h-4 w-4 text-primary' />
                                        Top keywords
                                    </p>
                                    <p>
                                        “Home service”, “steam therapy”,
                                        “booking cepat”
                                    </p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'>
                                    <p className='flex items-center gap-2 text-foreground font-semibold'>
                                        <MessageCircle className='h-4 w-4 text-primary' />
                                        SLA balasan owner
                                    </p>
                                    <p>Rata-rata 1 jam 40 menit</p>
                                    <p>Target Premium: &lt; 1 jam</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </PageShell>
    );
}
