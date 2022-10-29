import { Employee } from "src/app/employee/entities/employee"
import { Employer } from "src/app/employer/entities/employer"
import { Job } from "src/app/job/entities/job"

export enum ContractStatus {
    ABERTO = 'aberto',
    PEGOU_FORA = 'pegou_fora',
    DESISTIU = 'desistiu',
    PARA_DEPOIS = 'para_depois',
    FEITO = 'feito',
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
    servicesPerformed: Partial<Job>[],
    status: ContractStatus
    result: ContractResult
}