import { Employer } from "../employer/entities/employer"

export const EMPLOYERS: Employer[] = [
    {
        id: 1,
        name: 'Camila dos Reis',
        phone: '(35) 99900-0099',
        address: '',
        email: '',
        registeredAt: new Date('08/30/2022'),
        obs: 'Está esperando nenê e quer faxina depois'
    },
    {
        id: 2,
        name: 'Luiza Maria',
        phone: '(35) 99999-8899',
        address: 'Bairro Dona Wanda',
        email: '',
        registeredAt: new Date('07/01/2022'),
        obs: 'Mora em Nepomuceno'
    },
    {
        id: 3,
        name: 'Daniel Silva',
        phone: '(31) 99977-8090',
        address: '',
        email: 'daniel@email.com',
        registeredAt: new Date('01/02/2017'),
        obs: 'Professor da UFLA'
    },
    {
        id: 4,
        name: 'Magarette Almeida',
        phone: '(31) 98888-5252',
        address: '',
        email: '',
        registeredAt: new Date('05/16/2020'),
        obs: ''
    }
]