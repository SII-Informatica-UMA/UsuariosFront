import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = "http://localhost:8080";

    constructor(private http: HttpClient) { }

    getAllUsuarios(): Observable<[]> {
      return this.http.get<[]>(`${this.apiUrl}/usuarios`);
    }

    getUsuarioById(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
    }

    addUsuario(usuario: Usuario): Observable<any> {
      return this.http.post(`${this.apiUrl}/usuarios`, usuario, { observe: 'response' });
    }

    updateUsuario(usuario: Usuario): Observable<any> {
      return this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, usuario, { observe: 'response' });
    }

    deleteUsuario(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/usuarios/${id}`, { observe: 'response' });
    }
}
