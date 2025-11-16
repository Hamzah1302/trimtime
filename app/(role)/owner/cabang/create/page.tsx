"use client";

import { BranchForm } from "../_components/branch-form";

import { PageShell } from "@/components/layout/page-shell";

export default function OwnerBranchCreatePage() {
    return (
        <PageShell background='soft'>
            <div className='px-5 py-6 lg:px-8 lg:py-8'>
                <BranchForm mode='create' />
            </div>
        </PageShell>
    );
}
