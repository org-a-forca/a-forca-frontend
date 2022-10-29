import { Injectable } from '@angular/core';
import { CONTRACTS } from 'src/app/data-sources/contracts.ds';
import { EMPLOYERS } from 'src/app/data-sources/employers.ds';
import { CommonMsg, ValidationMsg } from 'src/app/shared/helpers/messages';
import { Field, Problem } from 'src/app/shared/helpers/problem';
import { Employer } from '../entities/employer';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  async getAll(): Promise<Employer[]> {
    return EMPLOYERS.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (b.name > a.name) { return -1; }
      return 0;
    })
  }

  async getById(id: number): Promise<Employer> {
    const employer = EMPLOYERS.find(item => item.id == id)
    return employer ? JSON.parse(JSON.stringify(employer)) : null
  }

  async delete(id: number): Promise<Problem> {
    const index = EMPLOYERS.findIndex(item => item.id == id)

    if (index < 0) {
      return null
    }

    const isEmployerInUse = CONTRACTS.find(contract => {
      return (contract.employer && contract.employer.id === id)
    }) ? true : false

    if (isEmployerInUse) {
      return {
        message: CommonMsg.RECORD_IN_USE
      }
    }

    EMPLOYERS.splice(index, 1)
    return null
  }

  async save(employer: Employer): Promise<Problem> {

    const problem = this.validate(employer)

    if (problem) {
      return problem
    }


    if (!employer.id) {
      employer.id = Date.now()
      employer.registeredAt = new Date()

      EMPLOYERS.push(employer)
    } else {
      const index = EMPLOYERS.findIndex(item => item.id == employer.id)
      console.log(index)
      if (index >= 0) {
        EMPLOYERS[index] = employer
      }
    }

    return null

  }

  private validate(employer: Employer) {
    let fields: Field[] = []

    if (employer.name.trim() === '') {
      fields.push({
        name: 'Nome',
        message: ValidationMsg.FIELD_REQUIRED
      })
    }

    if (employer.phone.trim() === '') {
      fields.push({
        name: 'Telefone',
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

}
