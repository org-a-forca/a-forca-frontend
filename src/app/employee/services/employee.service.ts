import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from '../entities/employee';
import { Problem } from 'src/app/shared/helpers/problem';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/trabalhador`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🔹 LISTAR TODOS
  async getAll(): Promise<Employee[]> {
    const response: any = await this.http
      .get(this.apiUrl, { headers: this.getHeaders() })
      .toPromise();

    if (response.trabalhadores) {
      return response.trabalhadores.map((t: any) => this.mapToEmployee(t));
    }

    return [];
  }

  // 🔹 BUSCAR POR ID
  async getById(id: number): Promise<Employee | null> {
    try {
      const t: any = await this.http
        .get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
        .toPromise();

      return this.mapToEmployee(t);

    } catch {
      return null;
    }
  }

  // 🔹 SALVAR (criar ou atualizar)
  async save(employee: Employee): Promise<Problem | null> {
    const telefoneLimpo = employee.phone ? employee.phone.replace(/\D/g, '') : '';

    const body = {
      nome: employee.name,
      telefone: telefoneLimpo,
      endereco: employee.address,
      email: employee.email,
      referencias: employee.references,
      restricoes: employee.constraints,
      observacoes: employee.obs,

      // envia apenas os IDs dos serviços selecionados no formulário
      servicosIds: employee.jobs?.map(j => j.id) || []
    };

    try {
      if (!employee.id) {
        await this.http
          .post(this.apiUrl, body, { headers: this.getHeaders(), responseType: 'text' })
          .toPromise();

      } else {
        await this.http
          .put(`${this.apiUrl}/${employee.id}`, body, { headers: this.getHeaders(), responseType: 'text' })
          .toPromise();
      }

      return null;

    } catch {
      return { message: 'Erro ao salvar trabalhador.' };
    }
  }

  // 🔹 EXCLUIR
  async delete(id: number): Promise<Problem | null> {
    try {
      await this.http
        .delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), responseType: 'text' })
        .toPromise();

      return null;

    } catch {
      return { message: 'Erro ao excluir trabalhador.' };
    }
  }

  // 🔹 CONVERSÃO DTO → FRONTEND
  private mapToEmployee(t: any): Employee {
    return {
      id: t.id,
      name: t.nome,
      phone: t.telefone ?? '',
      address: t.endereco ?? '',
      email: t.email ?? '',
      level: t.nivel ?? 1,
      registeredAt: new Date(t.dataCadastro ?? new Date()),
      lastContractAt: t.dataUltimoContrato ? new Date(t.dataUltimoContrato) : null,
      references: t.referencias ?? '',
      constraints: t.restricoes ?? '',
      obs: t.observacoes ?? '',

      // serviços reais NÃO vêm do backend → montamos depois
      jobs: [],

      // backend envia APENAS nome(s):
      // "servicosNomes": "trabaio"
      servicesNames: t.servicosNomes ?? ''
    };
  }
}