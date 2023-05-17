import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuariosService} from "../../services/usuarios.service";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {

    usuario: any = {
      nombre: '',
      apellido1: '',
      apellido2: '',
      email: '',
      telefono: '',
      dni: '',
      username: ''
    };


    constructor(
      private location: Location,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private usuariosService: UsuariosService
    ) {
    }

    ngOnInit() {
      const id = this.activatedRoute.snapshot.params['id'];
      this.usuariosService.getUsuarioById(id).subscribe(
        data => {
          this.usuario = data;
        },
        err => {
          alert('Error al acceder al usuario ' + err.error);
          console.error('Error al acceder al usuario', err);
          this.router.navigate(['/usuarios']);
        }
      );
    }

    async onUpdate() {

      const nombreInput = document.getElementById("nombre") as HTMLInputElement;
      const apellido1Input = document.getElementById("apellido1") as HTMLInputElement;
      const apellido2Input = document.getElementById("apellido2") as HTMLInputElement;
      const telefonoInput = document.getElementById("telefono") as HTMLInputElement;
      const dniInput = document.getElementById("dni") as HTMLInputElement;
      const usernameInput = document.getElementById("username") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;

      const newUsuario: Usuario = {
        id: this.usuario.id,
        nombre: nombreInput.value,
        apellido1: apellido1Input.value,
        apellido2: apellido2Input.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        dni: dniInput.value,
        username: usernameInput.value,
      };

      console.log(newUsuario);
      this.usuariosService.updateUsuario(newUsuario).subscribe(
        (usuario) => {
          this.router.navigate(['/usuarios']);
          alert("Usuario editado correctamente.")
        },
        (error) => {
          alert('Error al editar el usuario ' + error.error);
          console.error('Error al editar el usuario:', error);
        });

    }

    back() {
      this.router.navigate(['/usuarios']);
    }

}
