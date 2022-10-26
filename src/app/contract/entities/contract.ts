import { Employee } from "src/app/employee/entities/employee"
import { Employer } from "src/app/employer/entities/employer"

export enum ContractStatus {
    OPEN = 'open',
    FINISHED = 'finished'
}

export type ContractResult = {
    employeeRating: number,
    employerRating: number,
    obs: string
}

export type Contract = {
    id: number,
    date: Date,
    employee: Partial<Employee>,
    employer: Partial<Employer>,
    description: string,
    status: ContractStatus
    result: ContractResult
}