import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

export interface Ideia {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  idUsuario: string;
  createAt: string;
  _count?: {
    votos: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class IdeiaService {
  constructor(private http: HttpClient) {}

  buscaIdeias() {
    return this.http.get<Ideia[]>(`${apiUrl}/ideias`);
  }

  criarNovaIdeia(titulo: string, descricao: string) {
    return this.http.post<Ideia>(`${apiUrl}/ideias`, { titulo, descricao });
  }

  atualizarStatus(id: string, status: string) {
    return this.http.patch<Ideia>(`${apiUrl}/ideias/${id}/status`, { status });
  }
}
