import { notFound } from "next/navigation";

import { BranchForm } from "../../_components/branch-form";
import { mockBranches } from "../../_data/mock-branches";
import { PageShell } from "@/components/layout/page-shell";

type OwnerBranchEditPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function OwnerBranchEditPage({ params }: OwnerBranchEditPageProps) {
    const { slug } = await params;
    const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
    const branch = mockBranches.find((item) => item.slug === normalizedSlug);

    if (!branch) {
        notFound();
    }

    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <BranchForm mode='edit' branch={branch} />
            </div>
        </PageShell>
    );
}
