import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { IdeiaService } from '../ideia.service';

@Component({
  selector: 'app-criar-ideia',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './criar-ideia.component.html',
  styleUrl: './criar-ideia.component.css',
})
export class CriarIdeiaComponent {
  titulo = '';
  descricao = '';
  erro = '';

  constructor(
    private router: Router,
    private ideiaService: IdeiaService,
  ) {}

  criar() {
    this.ideiaService.criarNovaIdeia(this.titulo, this.descricao).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => (this.erro = err.error?.error ?? 'Erro ao criar ideia.'),
    });
  }
}
