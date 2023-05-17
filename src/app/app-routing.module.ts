import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import {AddUsuarioComponent} from "./components/add-usuario/add-usuario.component";
import {EditarUsuarioComponent} from "./components/editar-usuario/editar-usuario.component";

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'add-usuario', component: AddUsuarioComponent },
  {path: 'editar/:id', component: EditarUsuarioComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
