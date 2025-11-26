import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Job } from '../entities/job';
import { Category } from '../entities/category';
import { Problem } from 'src/app/shared/helpers/problem';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = `${environment.apiUrl}/servico`;
  private categoryUrl = `${environment.apiUrl}/categoria`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`,
      'Content-Type': 'application/json'
    });
  }

  async getAll(): Promise<Job[]> {
    const response: any = await this.http
      .get(`${this.apiUrl}`, { headers: this.getHeaders() })
      .toPromise();

    if (response.servicos) {
      return response.servicos.map((s: any) => ({
        id: s.id,
        name: s.nome,
        category: s.categoriaNome ? { id: 0, name: s.categoriaNome } : null
      }));
    }

    return [];
  }

  async getById(id: number): Promise<Job | null> {
    try {
      const s: any = await this.http
        .get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
        .toPromise();
      return this.mapToJob(s);
    } catch {
      return null;
    }
  }

  async save(job: Job): Promise<Problem | null> {
    const body = {
      nome: job.name,
      categoriaId: job.category?.id
    };

    try {
      if (!job.id) {
        await this.http
          .post(this.apiUrl, body, { headers: this.getHeaders(), responseType: 'text' })
          .toPromise();
      } else {
        await this.http
          .put(`${this.apiUrl}/${job.id}`, body, { headers: this.getHeaders(), responseType: 'text' })
          .toPromise();
      }

      return null;
    } catch {
      return {
        message: 'Erro ao salvar serviço'
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
        message: 'Erro ao excluir serviço'
      };
    }
  }

  async getCategories(): Promise<Category[]> {
    const response: any = await this.http
      .get(this.categoryUrl, { headers: this.getHeaders() })
      .toPromise();

    return response.map((c: any) => ({
      id: c.id,
      name: c.nome
    }));
  }

  async createCategory(body: { nome: string }): Promise<any> {
    return this.http
      .post(`${this.categoryUrl}`, body, { headers: this.getHeaders() })
      .toPromise();
  }


  private mapToJob(s: any): Job {
    return {
      id: s.id,
      name: s.nome,
      category: s.categoria ? this.mapToCategory(s.categoria) : null
    };
  }

  private mapToCategory(c: any): Category {
    return {
      id: c.id,
      name: c.nome
    };
  }
}