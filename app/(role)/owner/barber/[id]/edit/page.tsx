import { notFound } from "next/navigation";

import { BarberForm } from "../../_components/barber-form";
import { mockBarbers } from "../../_data/mock-barbers";
import { PageShell } from "@/components/layout/page-shell";

type OwnerBarberEditPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function OwnerBarberEditPage({ params }: OwnerBarberEditPageProps) {
    const { id } = await params;
    const normalizedId = decodeURIComponent(id).toUpperCase();
    const barber = mockBarbers.find((item) => item.id === normalizedId);

    if (!barber) {
        notFound();
    }

    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <BarberForm mode='edit' barberId={barber.id} />
            </div>
        </PageShell>
    );
}
