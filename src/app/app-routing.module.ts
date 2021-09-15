import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './pages/home/clientes/clientes.component';
import { LoginComponent } from './pages/user/login/login.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
