import { Injectable } from '@angular/core';
import { Category } from '../entities/category';
import { Job } from '../entities/job';
import { JOBS, CATEGORIES } from 'src/app/data-sources/jobs.ds';
import { Field, Problem } from 'src/app/shared/helpers/problem';
import { CommonMsg, ValidationMsg } from 'src/app/shared/helpers/messages';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  async getAll(): Promise<Job[]> {
    return JOBS.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (b.name > a.name) { return -1; }
      return 0;
    })
  }

  async getById(id: number): Promise<Job> {
    return JOBS.find(item => item.id == id)
  }

  async delete(id: number): Promise<Problem> {
    const index = JOBS.findIndex(item => item.id == id)

    if (index < 0) {
      return {
        message: CommonMsg.RECORD_NOT_FOUND
      }
    }

    JOBS.splice(index, 1)

    return null
  }

  async save(job: Job): Promise<Problem> {

    const problem = this.validate(job)

    if (problem) {
      return problem
    }


    if (!job.id) {
      job.id = Date.now()
      JOBS.push(job)
    } else {
      const index = JOBS.findIndex(item => item.id == job.id)
      console.log(index)
      if (index >= 0) {
        JOBS[index] = job
      }
    }

    return null

  }

  private validate(job: Job) {
    let fields: Field[] = []

    if (job.name.trim() === '') {
      fields.push({
        name: 'Nome',
        message: ValidationMsg.FIELD_REQUIRED
      })
    }

    if (job.category == null) {
      fields.push({
        name: 'Categoria',
        message: ValidationMsg.FIELD_REQUIRED
      })
    }

    if (fields.length !== 0) {
      return {
        message: ValidationMsg.INVALID_FIELDS,
        fields: fields
      }
    }

    return null
  }

  async getCategories(): Promise<Category[]> {
    return CATEGORIES.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (b.name > a.name) { return -1; }
      return 0;
    })
  }
}