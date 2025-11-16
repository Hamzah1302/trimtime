export type BarberSkill =
    | "Skin fade"
    | "Beard sculpting"
    | "Kids specialist"
    | "Colouring basic";

export type ShiftOption = "Pagi (09:00-17:00)" | "Sore (13:00-21:00)";

export const barberSkills: BarberSkill[] = [
    "Skin fade",
    "Beard sculpting",
    "Kids specialist",
    "Colouring basic",
];

export const shiftOptions: ShiftOption[] = ["Pagi (09:00-17:00)", "Sore (13:00-21:00)"];

export type MockBarber = {
    id: string;
    name: string;
    branch: string;
    level: "Lead Stylist" | "Senior" | "Junior";
    status: "Aktif" | "Cuti" | "Nonaktif";
    shift: ShiftOption;
    email: string;
    phone: string;
    skills?: BarberSkill[];
};

export const mockBarbers: MockBarber[] = [
    {
        id: "BRB-001",
        name: "Rama Putra",
        branch: "SCBD",
        level: "Lead Stylist",
        status: "Aktif",
        shift: "Pagi (09:00-17:00)",
        email: "rama.putra@trimtime.id",
        phone: "0821-0000-1111",
        skills: ["Skin fade", "Beard sculpting"],
    },
    {
        id: "BRB-002",
        name: "Hafidz Rahman",
        branch: "Menteng",
        level: "Senior",
        status: "Cuti",
        shift: "Sore (13:00-21:00)",
        email: "hafidz.rahman@trimtime.id",
        phone: "0821-0000-2222",
        skills: ["Kids specialist", "Skin fade"],
    },
    {
        id: "BRB-003",
        name: "Yoga Mahendra",
        branch: "BSD",
        level: "Junior",
        status: "Aktif",
        shift: "Sore (13:00-21:00)",
        email: "yoga.mahendra@trimtime.id",
        phone: "0821-0000-3333",
        skills: ["Colouring basic"],
    },
];
