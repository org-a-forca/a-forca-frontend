import { Contract, ContractStatus } from "../contract/entities/contract"

export const CONTRACTS: Contract[] = [
    {
        id: 1,
        date: new Date('10/25/2022'),
        employee: {
            id: 1,
            name: 'Carlos Alberto Luz',
            jobs: [
                {
                    id: 1,
                    name: "Calhas e rufos",
                },
                {
                    id: 2,
                    name: "Carpintaria",
                },
            ],
        },
        employer: {
            id: 1,
            name: 'Camila dos Reis'
        },
        status: ContractStatus.ABERTO,
        result: {
            employeeRating: 1,
            employerRating: 1,
            obs: 'Pessoa que trabalha não fez contato'
        },
        servicesPerformed: [
            {
                id: 2,
                name: "Carpintaria",
            }
        ],
    },
    {
        id: 2,
        date: new Date('07/12/2022'),
        employee: {
            id: 2,
            name: 'Marilda Dias Lopes',
            jobs: [
                {
                    id: 6,
                    name: "Faxina",
                }
            ],
        },
        employer: {
            id: 1,
            name: 'Camila dos Reis'
        },
        status: ContractStatus.ABERTO,
        result: {
            employeeRating: null,
            employerRating: null,
            obs: ''
        },
        servicesPerformed: [
            {
                id: 6,
                name: "Faxina",
            }
        ]
    }
]