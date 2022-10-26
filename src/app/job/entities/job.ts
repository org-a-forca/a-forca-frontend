import { Category } from "./category"

export type Job = {
    id: number,
    name: string,
    category: Category
}

export type JobDto = {
    id: number,
    name: string,
}