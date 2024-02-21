import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetEstadoHumorComponent } from './get-estado-humor.component';
import {EstadohumorService} from "../../../estadohumor.service";
import {JogadorService} from "../../../jogador.service";

class MockJogadorService {
  user = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  userValue = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  nivelGrafo = 0;
}

describe('GetEstadoHumorComponent', () => {
  let component: GetEstadoHumorComponent;
  let fixture: ComponentFixture<GetEstadoHumorComponent>;

  beforeEach(async () => {
    let mockEstadoHumorService={getEstadoHumorById: () =>{}};
    // @ts-ignore
    spyOn(mockEstadoHumorService,'getEstadoHumorById').and.returnValue({
      subscribe: () => {}
    });

    await TestBed.configureTestingModule({
      declarations: [ GetEstadoHumorComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService},
        {provide: EstadohumorService, useValue: mockEstadoHumorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEstadoHumorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
