import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink,InputTextModule, PasswordModule, ButtonModule, MessageModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  nome = ''
  email = ''
  password = ''
  erro = ''

  constructor(private authService: AuthService, private router: Router){}

  cadastrar(){
    this.authService.cadastrarUsuario(this.nome, this.email, this.password).subscribe({
      next: ()=>{
        this.router.navigate(['/login'])
      },
      error: (err)=>{
        this.erro = err.error?.error ?? "Erro ao criar contra."
      }
    })
  }

}
