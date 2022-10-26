import { Injectable } from '@angular/core';
import { EMPLOYEES } from 'src/app/data-sources/employees.ds';
import { CommonMsg, EmployeeMsg, ValidationMsg } from 'src/app/shared/helpers/messages';
import { Field, Problem } from 'src/app/shared/helpers/problem';
import { Employee } from '../entities/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  async getAll(): Promise<Employee[]> {
    return EMPLOYEES.sort((a, b) => {
      if (a.name > b.name) { return 1; }
      if (b.name > a.name) { return -1; }
      return 0;
    })
  }

  async getById(id: number): Promise<Employee> {
    return EMPLOYEES.find(item => item.id == id)
  }

  async delete(id: number): Promise<Problem> {
    const index = EMPLOYEES.findIndex(item => item.id == id)

    if (index < 0) {
      return {
        message: CommonMsg.RECORD_NOT_FOUND
      }
    }

    EMPLOYEES.splice(index, 1)

    return null
  }

  async save(employee: Employee): Promise<Problem> {

    const problem = this.validate(employee)

    if (problem) {
      return problem
    }


    if (!employee.id) {
      employee.id = Date.now()
      employee.registeredAt = new Date()
      employee.level = 1

      EMPLOYEES.push(employee)
    } else {
      const index = EMPLOYEES.findIndex(item => item.id == employee.id)
      console.log(index)
      if (index >= 0) {
        EMPLOYEES[index] = employee
      }
    }

    return null

  }

  private validate(employee: Employee) {
    let fields: Field[] = []

    if (employee.name.trim() === '') {
      fields.push({
        name: 'Nome',
        message: ValidationMsg.FIELD_REQUIRED
      })
    }

    if (employee.phone.trim() === '') {
      fields.push({
        name: 'Telefone',
        message: ValidationMsg.FIELD_REQUIRED
      })
    }

    if (!employee.jobs || employee.jobs.length == 0) {
      fields.push({
        name: 'Serviços',
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
