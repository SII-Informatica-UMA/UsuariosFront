import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { ListaUsuariosComponent } from './lista-usuarios.component';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

describe('ListaUsuariosComponent', () => {
  let component: ListaUsuariosComponent;
  let fixture: ComponentFixture<ListaUsuariosComponent>;
  let usuariosService: UsuariosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaUsuariosComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UsuariosService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsuariosComponent);
    component = fixture.componentInstance;
    usuariosService = TestBed.inject(UsuariosService);
  });

  it('debe crear la componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe devolver la lista de usuarios cuando se inicializa', () => {
    const mockUsuarios: Usuario[] = [
      new Usuario('John', 'Doe', 'Doe', 'john@example.com', 'johndoe', '123456789', '555-1234'),
      new Usuario('Jane', 'Smith', 'Smith', 'jane@example.com', 'janesmith', '987654321', '555-5678'),
      new Usuario('Michael', 'Johnson', 'Johnson', 'michael@example.com', 'michaeljohnson', '567890123', '555-9876'),
    ];

    spyOn(usuariosService, 'getAllUsuarios').and.returnValue(of(mockUsuarios));

    fixture.detectChanges();

    expect(component.listaUsuarios).toEqual(mockUsuarios);
  });

  it('debe borrar un usuario cuando eliminarUsuario es llamado', () => {
    const mockUserId = 1;
    spyOn(usuariosService, 'deleteUsuario').and.returnValue(of({}));

    spyOn(component, 'obtenerUsuarios');

    component.eliminarUsuario(mockUserId);

    expect(usuariosService.deleteUsuario).toHaveBeenCalledWith(mockUserId);
    expect(component.obtenerUsuarios).toHaveBeenCalled();
  });

  it('Debe navegar a add-usuario cuando addUsuario es llamado', () => {
    spyOn(component['router'], 'navigate');

    component.addUsuario();

    expect(component['router'].navigate).toHaveBeenCalledWith(['add-usuario']);
  });

  // Add more test cases as needed

});
