import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {UsuariosService} from "../../services/usuarios.service";
import {Usuario} from "../../models/usuario";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  constructor(
      private location: Location,
      private router: Router,
      private usuariosService: UsuariosService
    ) {
    }

    ngOnInit(): void {
    }

    async send() {

      const nombreInput = document.getElementById("nombre") as HTMLInputElement;
      const apellido1Input = document.getElementById("apellido1") as HTMLInputElement;
      const apellido2Input = document.getElementById("apellido2") as HTMLInputElement;
      const telefonoInput = document.getElementById("telefono") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const usuarioInput = document.getElementById("username") as HTMLInputElement;
      const dniInput = document.getElementById("dni") as HTMLInputElement;

      if (!nombreInput.value || !apellido1Input.value || !apellido2Input.value || !telefonoInput.value || !emailInput.value || !dniInput.value || !usuarioInput.value) {
        alert("Campos incompletos.");
        return;
      }

      const newUsuario: Usuario = {
        nombre: nombreInput.value,
        apellido1: apellido1Input.value,
        apellido2: apellido2Input.value,
        email: emailInput.value,
        dni: dniInput.value,
        username: usuarioInput.value,
        telefono: telefonoInput.value,
      };

      this.usuariosService.addUsuario(newUsuario).subscribe(
        (usuario) => {
          this.router.navigate(['/usuarios']);
          alert("Usuario creado correctamente.")
        },
        (error) => {
          alert('Error al crear el usuario ' + error.error);
          console.error('Error al crear el usuario:', error);
        });

    }

    back() {
      this.router.navigate(['/usuarios']);
    }
}
