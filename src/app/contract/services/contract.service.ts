import { Injectable } from '@angular/core';
import { CONTRACTS } from 'src/app/data-sources/contracts.ds';
import { EMPLOYEES } from 'src/app/data-sources/employees.ds';
import { CommonMsg, ValidationMsg } from 'src/app/shared/helpers/messages';
import { Field, Problem } from 'src/app/shared/helpers/problem';
import { Contract } from '../entities/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  async getAll(): Promise<Contract[]> {
    return CONTRACTS.sort((a, b) => {
      if (a.date > b.date) { return 1; }
      if (b.date > a.date) { return -1; }
      return 0;
    })
  }

  async getById(id: number): Promise<Contract> {
    const contract = CONTRACTS.find(item => item.id == id)
    return contract ? JSON.parse(JSON.stringify(contract)) : null
  }

  async delete(id: number): Promise<Problem> {
    const index = CONTRACTS.findIndex(item => item.id == id)

    if (index < 0) {
      return {
        message: CommonMsg.RECORD_NOT_FOUND
      }
    }

    CONTRACTS.splice(index, 1)

    return null
  }

  async save(contract: Contract): Promise<Problem> {

    const problem = this.validate(contract)

    if (problem) {
      return problem
    }

    if (!contract.id) {
      contract.id = Date.now()
      contract.date = new Date()
      CONTRACTS.push(contract)
    } else {
      const index = CONTRACTS.findIndex(item => item.id == contract.id)
      console.log(index)
      if (index >= 0) {
        CONTRACTS[index] = contract
      }
    }

    return null

  }

  private validate(contract: Contract) {
    let fields: Field[] = []

    if (!contract.employee) {
      fields.push({
        name: 'Que trabalha',
        message: ValidationMsg.FIELD_REQUIRED
      })
    }

    if (!contract.employer) {
      fields.push({
        name: 'Contratante',
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
