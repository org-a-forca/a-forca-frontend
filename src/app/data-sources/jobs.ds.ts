import { Category } from "../job/entities/category"
import { Job } from "../job/entities/job"

export const CATEGORIES: Category[] = [
    {
        id: 1,
        name: "Reforma predial"
    },
    {
        id: 2,
        name: "Cuidados com a casa"
    },
    {
        id: 3,
        name: "Festas"
    },
    {
        id: 4,
        name: "Veículos"
    },
    {
        id: 5,
        name: "Cuidador(a)"
    },
    {
        id: 6,
        name: "Informática"
    },
    {
        id: 7,
        name: "Beleza"
    },
    {
        id: 8,
        name: "Outros"
    }
]

export const JOBS: Job[] = [
    {
        id: 1,
        name: "Calhas e rufos",
        category: {
            id: 1,
            name: "Reforma predial"
        }
    },
    {
        id: 2,
        name: "Carpintaria",
        category: {
            id: 1,
            name: "Reforma predial"
        }
    },
    {
        id: 3,
        name: "Eletricista",
        category: {
            id: 1,
            name: "Reforma predial"
        }
    },
    {
        id: 4,
        name: "Antenista",
        category: {
            id: 2,
            name: "Cuidados com a casa"
        }
    },
    {
        id: 5,
        name: "Cozinha",
        category: {
            id: 2,
            name: "Cuidados com a casa"
        }
    },
    {
        id: 6,
        name: "Faxina",
        category: {
            id: 2,
            name: "Cuidados com a casa"
        }
    }
]