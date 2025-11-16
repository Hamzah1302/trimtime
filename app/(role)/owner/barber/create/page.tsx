"use client";

import { BarberForm } from "../_components/barber-form";
import { PageShell } from "@/components/layout/page-shell";

export default function OwnerBarberCreatePage() {
    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <BarberForm mode='create' />
            </div>
        </PageShell>
    );
}
