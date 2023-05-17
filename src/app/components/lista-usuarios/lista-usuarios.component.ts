import {Component, Directive, OnInit} from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit{

  listaUsuarios: Usuario[] = [];

    constructor(private usuariosService: UsuariosService,
                private router: Router) {}

    ngOnInit(): void {
      this.obtenerUsuarios();
    }

    obtenerUsuarios(): void {
      this.usuariosService.getAllUsuarios().subscribe(
        usuarios => {
        this.listaUsuarios = usuarios;
      });
    }

    eliminarUsuario(id: any): void {
      this.usuariosService.deleteUsuario(id).subscribe(() => {
        this.obtenerUsuarios();
      });
    }


    addUsuario() {
      this.router.navigate(['add-usuario']);
    }

}
