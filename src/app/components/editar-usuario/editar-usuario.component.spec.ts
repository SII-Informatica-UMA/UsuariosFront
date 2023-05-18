import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarUsuarioComponent } from './editar-usuario.component';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('EditarUsuarioComponent', () => {
  let component: EditarUsuarioComponent;
  let fixture: ComponentFixture<EditarUsuarioComponent>;
  let usuariosServiceSpy: jasmine.SpyObj<UsuariosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const usuariosService = jasmine.createSpyObj('UsuariosService', ['getUsuarioById', 'updateUsuario']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [EditarUsuarioComponent],
      imports: [FormsModule],
      providers: [
        Location,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
        { provide: UsuariosService, useValue: usuariosService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioComponent);
    component = fixture.componentInstance;
    usuariosServiceSpy = TestBed.inject(UsuariosService) as jasmine.SpyObj<UsuariosService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener el usuario al inicializarse', () => {
    const usuario: Usuario = {
      id: 1,
      nombre: 'Juan',
      apellido1: 'Perez',
      apellido2: 'Gallardo',
      email: 'jpegallardo@example.com',
      dni: '123456789',
      username: 'juanpe',
      telefono: '1234567890'
    };
    usuariosServiceSpy.getUsuarioById.and.returnValue(of(usuario));

    component.ngOnInit();

    expect(usuariosServiceSpy.getUsuarioById).toHaveBeenCalledWith(1);
    expect(component.usuario).toEqual(usuario);
  });

  it('Debería mostrar una alerta al haber error al edita el usuario', () => {
    const errorMessage = 'Error al editar el usuario.';
    usuariosServiceSpy.updateUsuario.and.returnValue(throwError({ error: errorMessage }));

    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.onUpdate();

    expect(window.alert).toHaveBeenCalledWith('Error al editar el usuario ' + errorMessage);
    expect(console.error).toHaveBeenCalled();
  });


});
