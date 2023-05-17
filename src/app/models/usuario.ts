export class Usuario {
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  telefono: string;
  dni: string;
  username: string;
  id?: number;

  constructor(
    nombre: string,
    apellido1: string,
    apellido2: string,
    email: string,
    username: string,
    dni: string,
    telefono: string
  ) {
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.email = email;
    this.username = username;
    this.dni = dni;
    this.telefono = telefono;
  }
}
