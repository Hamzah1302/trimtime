"use client";

import { StoreForm } from "../_components/store-form";
import { PageShell } from "@/components/layout/page-shell";

export default function OwnerStoreCreatePage() {
    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <StoreForm mode='create' />
            </div>
        </PageShell>
    );
}
