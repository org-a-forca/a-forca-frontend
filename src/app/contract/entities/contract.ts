import { Employee } from "src/app/employee/entities/employee"
import { Employer } from "src/app/employer/entities/employer"
import { Job } from "src/app/job/entities/job"

export enum ContractStatus {
    ABERTO = 'Aberto',
    PEGOU_FORA = 'Pegou fora',
    DESISTIU = 'Desistiu',
    PARA_DEPOIS = 'Para depois',
    FEITO = 'Feito'
}

export type ContractResult = {
    employeeRating: number,
    employerRating: number,
    obs: string
}

export type Contract = {
    id: number,
    date: Date,
    employee: Employee,
    employer: Partial<Employer>,
    servicesPerformed: Partial<Job>[],
    servicesPerformedIds: number[],
    status: ContractStatus,
    result: ContractResult
}