import { Job } from "src/app/job/entities/job";

export type Employee = {
    id: number;
    name: string;
    phone: string;
    address: string;
    email: string;

    // lista REAL de serviços (montada no form)
    jobs: Partial<Job>[];

    // lista de nomes vindos do backend (string)
    servicesNames?: string;

    references: string;
    level: number;
    registeredAt: Date;
    lastContractAt: Date | null;
    constraints: string;
    obs: string;
}