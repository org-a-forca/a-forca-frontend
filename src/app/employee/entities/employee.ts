import { Job } from "src/app/job/entities/job"

export type Employee = {
    id: number,
    name: string,
    phone: string,
    jobs: Partial<Job>[],
    address: string,
    email: string,
    references: string,
    level: number,
    registeredAt: Date,
    lastContractAt: Date,
    constraints: string,
    obs: string
}