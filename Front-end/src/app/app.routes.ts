import { Routes } from '@angular/router';
import { ListaIdeiasComponent } from './ideia/lista-ideias/lista-ideias.component';
import { LoginComponent } from './usuario/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { CriarIdeiaComponent } from './ideia/criar-ideia/criar-ideia.component';
import { PainelAdminComponent } from './ideia/painel-admin/painel-admin.component';
import { adminGuard } from './core/admin.guard';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: ListaIdeiasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'criar-ideia',
    component: CriarIdeiaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'painel-admin',
    component: PainelAdminComponent,
    canActivate: [adminGuard],
  },
];
