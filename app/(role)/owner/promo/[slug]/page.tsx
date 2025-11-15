import { notFound } from "next/navigation";

import { PromoForm } from "../_components/promo-form";
import { ownerPromos } from "../_data/mock-promos";
import { PageShell } from "@/components/layout/page-shell";

type OwnerPromoDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function OwnerPromoDetailPage({ params }: OwnerPromoDetailPageProps) {
    const { slug } = await params;
    const promo = ownerPromos.find((item) => item.slug === decodeURIComponent(slug));

    if (!promo) {
        notFound();
    }

    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <PromoForm mode='edit' promo={promo} />
            </div>
        </PageShell>
    );
}
