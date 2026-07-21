import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IdeiaService, Ideia } from '../ideia.service';
import { VotoService } from '../../voto/voto.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-lista-ideias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-ideias.component.html',
  styleUrl: './lista-ideias.component.css'
})
export class ListaIdeiasComponent {
  ideias: Ideia[] = []
  erro = ''

  constructor(
    private ideiaService: IdeiaService,
    private votoService: VotoService,
    public authService: AuthService
  ){}

  ngOnInit() {
   this.carregarIdeias()
  }

  carregarIdeias(){
    this.ideiaService.buscaIdeias().subscribe({
      next: (ideias) => (this.ideias = ideias),
      error: ()=> (this.erro = "Erro ao carregar Ideias")
    })
  }

  votar(idIdeia: string){
    this.votoService.registrarVoto(idIdeia).subscribe({
      next:()=> this.carregarIdeias(),
      error: (err) => (this.erro = err.error?.error ?? "Erro ao registrar voto")
    })
  }

}
