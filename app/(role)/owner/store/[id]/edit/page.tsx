import { notFound } from "next/navigation";

import { StoreForm } from "../../_components/store-form";
import { mockStoreProducts } from "../../_data/mock-products";
import { PageShell } from "@/components/layout/page-shell";

type OwnerStoreEditPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function OwnerStoreEditPage({ params }: OwnerStoreEditPageProps) {
    const { id } = await params;
    const normalizedId = decodeURIComponent(id).toUpperCase();
    const product = mockStoreProducts.find((item) => item.id === normalizedId);

    if (!product) {
        notFound();
    }

    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <StoreForm mode='edit' productId={product.id} />
            </div>
        </PageShell>
    );
}
