import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  entrar() {
    this.authService.entrar(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.salvarToken(res.token);
        this.authService.salvarRegra(res.regra);
        this.router.navigate(['/']);
      },
      error: () => {
        this.erro = 'Email ou senha invalidos';
      },
    });
  }
}
