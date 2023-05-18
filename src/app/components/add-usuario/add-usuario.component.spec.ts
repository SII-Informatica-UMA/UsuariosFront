import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AddUsuarioComponent } from './add-usuario.component';
import { UsuariosService } from '../../services/usuarios.service';
import { of } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddUsuarioComponent', () => {
  let component: AddUsuarioComponent;
  let fixture: ComponentFixture<AddUsuarioComponent>;
  let usuariosServiceSpy: jasmine.SpyObj<UsuariosService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('UsuariosService', ['addUsuario']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
      declarations: [AddUsuarioComponent],
      providers: [
        Location,
        { provide: UsuariosService, useValue: spy }
      ]
    }).compileComponents();

    usuariosServiceSpy = TestBed.inject(UsuariosService) as jasmine.SpyObj<UsuariosService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsuarioComponent);
    component = fixture.componentInstance;

    usuariosServiceSpy.addUsuario.and.returnValue(of({}));
    spyOn(window, 'alert');
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('debe crear', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar un error si los campos estan incompletos', () => {
    const sendButton = fixture.nativeElement.querySelector('button[type="submit"]');
    sendButton.click();
    expect(window.alert).toHaveBeenCalledWith('Campos incompletos.');
    expect(usuariosServiceSpy.addUsuario).not.toHaveBeenCalled();
  });

  it('debe navegar a /usuarios en boton de volver', () => {
    const backButton = fixture.nativeElement.querySelector('button[type="button"]');
    if (backButton) {
      backButton.click();
      expect(component.router.navigate).toHaveBeenCalledWith(['/usuarios']);
    } else {
      fail('boton de volver no encontrado');
    }
  });
});
