import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../core/auth.service';
import { adminGuard } from '../../core/admin.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
  ],
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
        if (this.authService.isAdmin()) {
          this.router.navigate(['/painel-admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.erro = 'Email ou senha invalidos';
      },
    });
  }
}
