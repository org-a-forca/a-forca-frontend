import { Category } from "./category"

export class Job {
    id: number
    name: string
    category: Category

    constructor() {
        this.id = null
        this.name = ''
        this.category = null
    }
}