import { Injectable } from '@angular/core';
import { Category } from '../entities/category';
import { Job } from '../entities/job';
import { JOBS, CATEGORIES } from 'src/app/data-sources/jobs.ds';
import { Field, Problem } from 'src/app/shared/helpers/problem';
import { CommonMsg, ValidationMsg } from 'src/app/shared/helpers/messages';
import { EMPLOYEES } from 'src/app/data-sources/employees.ds';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  async getAll(): Promise<Job[]> {
    return JOBS.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA > nameB) { return 1; }
      if (nameB > nameA) { return -1; }
      return 0;
    })
  }

  async getById(id: number): Promise<Job> {
    const job = JOBS.find(item => item.id == id)
    return job ? JSON.parse(JSON.stringify(job)) : null
  }

  async delete(id: number): Promise<Problem> {
    const index = JOBS.findIndex(job => job.id == id)

    if (index < 0) {
      return null
    }


    const isJobInUse = EMPLOYEES.find(employee => {
      return employee.jobs.find(job => job.id === id)
    }) ? true : false

    if (isJobInUse) {
      return {
        message: CommonMsg.RECORD_IN_USE
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

    const sameNameJob = JOBS.find(item => item.name === job.name)
    if (sameNameJob && sameNameJob.id !== job.id) {
      return {
        message: ValidationMsg.DUPLICATED_RECORD
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