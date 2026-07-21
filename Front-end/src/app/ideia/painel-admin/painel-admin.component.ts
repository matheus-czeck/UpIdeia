import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { IdeiaService, Ideia } from '../ideia.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './painel-admin.component.html',
  styleUrl: './painel-admin.component.css',
})
export class PainelAdminComponent implements OnInit {
  ideias: Ideia[] = [];
  status = ['PENDENTE', 'ANALISE', 'DESENVOLVIMENTO', 'REJEITADA'];
  erro = '';

  constructor(private ideiaService: IdeiaService) {}

  ngOnInit(): void {
    this.carregarIdeias();
  }

  carregarIdeias() {
    this.ideiaService.buscaIdeias().subscribe({
      next: (ideias) => (this.ideias = ideias),
      error: () => (this.erro = 'Erro ao carregar ideias'),
    });
  }

  mudarStatus(idIdeia: string, novoStatus: string) {
    this.ideiaService.atualizarStatus(idIdeia, novoStatus).subscribe({
      next: () => this.carregarIdeias(),
      error: () => (this.erro = 'Erro ao atualizar status'),
    });
  }
}
