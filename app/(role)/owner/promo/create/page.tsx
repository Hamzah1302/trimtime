import { PromoForm } from "../_components/promo-form";
import { PageShell } from "@/components/layout/page-shell";

export default function OwnerPromoCreatePage() {
    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <PromoForm mode='create' />
            </div>
        </PageShell>
    );
}
