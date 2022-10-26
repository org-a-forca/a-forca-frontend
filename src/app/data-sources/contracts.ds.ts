import { Contract, ContractStatus } from "../contract/entities/contract"

export const CONTRACTS: Contract[] = [
    {
        id: 1,
        date: new Date('10/25/2022'),
        employee: {
            id: 1,
            name: 'Carlos Alberto Luz'
        },
        employer: {
            id: 1,
            name: 'Camila dos Reis',
        },
        status: ContractStatus.FINISHED,
        result: {
            employeeRating: 1,
            employerRating: 1,
            obs: 'Pessoa que trabalha não fez contato'
        },
        description: 'Pedreiro e  encanamentos',
    },
    {
        id: 2,
        date: new Date('07/12/2022'),
        employee: {
            id: 2,
            name: 'Marilda Dias Lopes'
        },
        employer: {
            id: 1,
            name: 'Camila dos Reis'
        },
        status: ContractStatus.OPEN,
        result: {
            employeeRating: null,
            employerRating: null,
            obs: ''
        },
        description: 'Retireiro'
    }
]