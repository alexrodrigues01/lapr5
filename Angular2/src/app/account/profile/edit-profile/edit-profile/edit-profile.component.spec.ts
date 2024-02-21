import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import {JogadorService} from "../../../../jogador.service";

class MockJogadorService {
  user = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  userValue = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  nivelGrafo = 0;
}

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
