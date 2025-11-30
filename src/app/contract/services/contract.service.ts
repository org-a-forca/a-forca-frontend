import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contract, ContractStatus } from '../entities/contract';
import { Problem } from 'src/app/shared/helpers/problem';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private apiUrl = `${environment.apiUrl}/contrato`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`,
      'Content-Type': 'application/json'
    });
  }


  async getAll(): Promise<Contract[]> {
    const response: any = await this.http
      .get(this.apiUrl, { headers: this.getHeaders() })
      .toPromise();

    if (!response.contratos) return [];

    return response.contratos.map((c: any) => ({
      id: c.id ?? 0,

      date: new Date((c.dataContrato ?? c.data) + 'T00:00:00'),

      employee: {
        id: 0,
        name: c.nomeTrabalhador ?? ''
      },

      employer: {
        id: 0,
        name: c.nomeContratante ?? ''
      },

      servicesPerformed: [],
      servicesPerformedIds: [],

      status: this.mapStatusFromBackend(c.status),

      result: {
        employeeRating: 1,
        employerRating: 1,
        obs: ''
      }
    }));
  }

  async getById(id: number): Promise<Contract | null> {
    try {
      const c: any = await this.http
        .get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
        .toPromise();

      return {
        id: c.id,
        date: new Date((c.dataContrato ?? c.data) + 'T00:00:00'),

        employee: {
          id: c.trabalhador?.id ?? null,
          name: c.trabalhador?.nome ?? '',
          phone: c.trabalhador?.telefone ?? '',
          address: c.trabalhador?.endereco ?? '',
          email: c.trabalhador?.email ?? '',
          jobs: [],
          servicesNames: c.trabalhador?.servicosIds?.join(', ') ?? '',
          references: c.trabalhador?.referencias ?? '',
          level: c.trabalhador?.nivel ?? 1,
          registeredAt: c.trabalhador?.dataCadastro ?? new Date(),
          lastContractAt: c.trabalhador?.dataUltimoContrato ?? null,
          constraints: c.trabalhador?.restricoes ?? '',
          obs: c.trabalhador?.observacoes ?? ''
        },

        employer: c.contratante
          ? { id: c.contratante.id, name: c.contratante.nome }
          : {},

        servicesPerformed: (c.servicosContratados || []).map((s: any) => ({
          id: s.id,
          name: s.nome
        })),

        servicesPerformedIds: (c.servicosContratados || []).map((s: any) => s.id),

        status: this.mapStatusFromBackend(c.status),

        result: {
          employeeRating: c.notaTrabalhador ?? 1,
          employerRating: c.notaContratante ?? 1,
          obs: c.observacoes ?? ''
        }
      };

    } catch (err) {
      return null;
    }
  }

  async save(contract: Contract): Promise<Problem | null> {
    const body = {
      trabalhadorId: contract.employee?.id,
      contratanteId: contract.employer?.id,
      servicosContratadosIds: contract.servicesPerformedIds || [],
      status: contract.status,
      nivel: contract.employee.level,
    };

    if (!body.trabalhadorId || !body.contratanteId) {
      return { message: 'Campos obrigatórios não preenchidos.' };
    }

    if (!body.servicosContratadosIds.length) {
      return { message: 'É necessário selecionar ao menos um serviço.' };
    }

    if (!body.status) {
      return { message: 'O status é obrigatório.' };
    }

    try {
      if (!contract.id) {
        await this.http
          .post(this.apiUrl, body, { headers: this.getHeaders() })
          .toPromise();
      } else {
        await this.http
          .put(`${this.apiUrl}/${contract.id}`, body, { headers: this.getHeaders() })
          .toPromise();
      }

      return null;

    } catch (err: any) {
      return {
        message:
          err.error?.status ||
          err.error?.message ||
          'Erro ao salvar contrato'
      };
    }
  }

  async delete(id: number): Promise<Problem | null> {
    try {
      await this.http
        .delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(), responseType: 'text' })
        .toPromise();

      return null;

    } catch {
      return { message: 'Erro ao excluir contrato.' };
    }
  }

  private mapStatusFromBackend(raw: string): ContractStatus {
    switch ((raw ?? '').toLowerCase()) {
      case 'aberto':
      case 'Aberto':
        return ContractStatus.ABERTO;

      case 'desistiu':
      case 'Desistiu':
        return ContractStatus.DESISTIU;

      case 'feito':
      case 'Feito':
        return ContractStatus.FEITO;

      case 'para depois':
      case 'Para depois':
        return ContractStatus.PARA_DEPOIS;

      case 'pegou fora':
      case 'Pegou fora':
        return ContractStatus.PEGOU_FORA;

      default:
        return ContractStatus.ABERTO;
    }
  }
}
