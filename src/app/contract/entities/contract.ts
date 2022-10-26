import { EmployeeDto } from "src/app/employee/entities/employee"
import { EmployerDto } from "src/app/employer/entities/employer"

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
    employee: EmployeeDto,
    employer: EmployerDto,
    description: string,
    status: ContractStatus
    result: ContractResult
}