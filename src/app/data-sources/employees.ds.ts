import { Employee } from "../employee/entities/employee"

export const EMPLOYEES: Employee[] = [
    {
        id: 1,
        name: 'Carlos Alberto Luz',
        phone: '(35) 99977-8090',
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
        address: 'R. José das Couves 195. Cidade Nova',
        email: '',
        references: 'Gralha Azul',
        level: 2,
        registeredAt: new Date('05/07/2022'),
        lastContractAt: new Date('10/25/2022'),
        constraints: '',
        obs: 'Estudante da UFLA'
    },
    {
        id: 2,
        name: 'Marilda Dias Lopes',
        phone: '(35) 99955-8290',
        jobs: [
            {
                id: 6,
                name: "Faxina",
            }
        ],
        address: 'R. José XYZ 200. Jardim Fabiana',
        email: '',
        references: '',
        level: 1,
        registeredAt: new Date('08/12/2021'),
        lastContractAt: new Date('07/12/2022'),
        constraints: 'Disponível 3a. ou 5a.',
        obs: ''
    }
]