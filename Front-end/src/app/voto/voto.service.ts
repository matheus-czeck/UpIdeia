import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class VotoService {
  constructor(private http: HttpClient) {}

  registrarVoto(idIdeia: string) {
    return this.http.post(`${apiUrl}/voto/${idIdeia}`, {});
  }
}
