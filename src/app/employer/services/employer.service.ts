import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employer } from '../entities/employer';
import { Problem } from 'src/app/shared/helpers/problem';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private apiUrl = `${environment.apiUrl}/contratante`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`,
      'Content-Type': 'application/json'
    });
  }

  async getAll(): Promise<Employer[]> {
    const response: any = await this.http
      .get(this.apiUrl, { headers: this.getHeaders() })
      .toPromise();

    if (response.contratantes) {
      return response.contratantes.map((c: any) => this.mapToEmployer(c));
    }

    return [];
  }

  async getById(id: number): Promise<Employer | null> {
    try {
      const c: any = await this.http
        .get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
        .toPromise();
      return this.mapToEmployer(c);
    } catch {
      return null;
    }
  }

  async save(employer: Employer): Promise<Problem | null> {
    const telefoneLimpo = employer.phone ? employer.phone.replace(/\D/g, '') : '';

    const body = {
      nome: employer.name,
      telefone: telefoneLimpo,
      endereco: employer.address,
      email: employer.email,
      obs: employer.obs
    };

    try {
      if (!employer.id) {
        await this.http
          .post(this.apiUrl, body, { headers: this.getHeaders(), responseType: 'text' })
          .toPromise();
      } else {
        await this.http
          .put(`${this.apiUrl}/${employer.id}`, body, { headers: this.getHeaders(), responseType: 'text' })
          .toPromise();
      }

      return null;
    } catch {
      return {
        message: 'Erro ao salvar contratante'
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
      return {
        message: 'Erro ao excluir contratante'
      };
    }
  }

  private mapToEmployer(c: any): Employer {
    return {
      id: c.id,
      name: c.nome,
      phone: c.telefone,
      address: c.endereco ?? '',
      email: c.email ?? '',
      registeredAt: new Date(c.registeredAt ?? new Date()),
      obs: c.obs ?? ''
    };
  }
}