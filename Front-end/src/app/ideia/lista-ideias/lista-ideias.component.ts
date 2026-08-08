import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { IdeiaService, Ideia } from '../ideia.service';
import { VotoService } from '../../voto/voto.service';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-ideias',
  standalone: true,
  imports: [CommonModule, RouterLink, MessageModule, FormsModule],
  templateUrl: './lista-ideias.component.html',
  styleUrl: './lista-ideias.component.css',
})
export class ListaIdeiasComponent implements OnInit {
  ideias: Ideia[] = [];
  todasIdeias: Ideia[] = [];
  erro = '';
  selectedStatus = '';
  votos = new Set<string>();
  statuses = ['', 'PENDENTE', 'ANALISE', 'DESENVOLVIMENTO', 'REJEITADA'];

  constructor(
    private ideiaService: IdeiaService,
    private votoService: VotoService,
    public authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    // clear client-side vote markers and filters and refresh view
    this.votos.clear();
    this.selectedStatus = '';
    this.aplicarFiltro();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.carregarIdeias();
    if (this.authService.getToken()) {
      this.carregarVotos();
    }
  }

  carregarIdeias() {
    this.ideiaService.buscaIdeias().subscribe({
      next: (ideias) => {
        this.todasIdeias = ideias;
        this.aplicarFiltro();
      },
      error: () => (this.erro = 'Erro ao carregar Ideias'),
    });
  }

  carregarVotos() {
    this.votoService.minhasIdeiasVotadas().subscribe({
      next: (res) => {
        this.votos = new Set(res.ids || []);
      },
      error: () => {
        // ignore silently
      },
    });
  }

  aplicarFiltro() {
    if (!this.selectedStatus) {
      this.ideias = this.todasIdeias;
    } else {
      this.ideias = this.todasIdeias.filter(
        (i) => i.status === this.selectedStatus,
      );
    }
  }

  votar(idIdeia: string) {
    if (!this.authService.getToken()) return;

    if (this.votos.has(idIdeia)) {
      this.votoService.removerVoto(idIdeia).subscribe({
        next: () => {
          this.carregarIdeias();
          this.carregarVotos();
        },
        error: (err) =>
          (this.erro = err.error?.error ?? 'Erro ao remover voto'),
      });
    } else {
      this.votoService.registrarVoto(idIdeia).subscribe({
        next: () => {
          this.carregarIdeias();
          this.carregarVotos();
        },
        error: (err) =>
          (this.erro = err.error?.error ?? 'Erro ao registrar voto'),
      });
    }
  }
}
