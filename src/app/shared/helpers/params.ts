import { ActivatedRoute } from "@angular/router"

export class Params {
  static readIdParam(route: ActivatedRoute): number {
    const idStr = route.snapshot.paramMap.get('id')

    try {
      const id = Number.parseInt(idStr)
      if (id < 1) {
        return null
      }
      return id
    } catch {
      return null
    }
  }
}