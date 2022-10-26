import { JobDto } from "src/app/job/entities/job"

export type Employee = {
    id: number,
    name: string,
    phone: string,
    jobs: JobDto[],
    address: string,
    email: string,
    references: string,
    level: number,
    registeredAt: Date,
    lastContractAt: Date,
    constraints: string,
    obs: string
}

export type EmployeeDto = {
    id: number,
    name: string,
}