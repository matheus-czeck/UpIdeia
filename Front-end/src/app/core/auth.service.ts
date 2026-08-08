import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  cadastrarUsuario(nome: string, email: string, password: string) {
    return this.http.post(`${apiUrl}/usuario`, { nome, email, password });
  }

  entrar(email: string, password: string) {
    return this.http.post<{ token: string; regra: string }>(
      `${apiUrl}/usuario/login`,
      {
        email,
        password,
      },
    );
  }

  salvarRegra(regra: string) {
    return localStorage.setItem('regra', regra);
  }
  getRegra(): string | null {
    return localStorage.getItem('regra');
  }
  isAdmin(): boolean {
    return this.getRegra() === 'ADMIN';
  }

  salvarToken(token: string) {
    return localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  logout() {
    // Remove token and role to properly logout the user on client-side UI
    localStorage.removeItem('token');
    localStorage.removeItem('regra');
  }
}
