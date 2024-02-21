import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelGrafoComponent } from './nivel-grafo.component';
import {JogadorService} from "../../jogador.service";

describe('NivelGrafoComponent', () => {
  let component: NivelGrafoComponent;
  let fixture: ComponentFixture<NivelGrafoComponent>;
  let service : JogadorService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [ NivelGrafoComponent, {provide: JogadorService, useClass: MockJogadorService } ]
    })
      .compileComponents();
    component = TestBed.inject(NivelGrafoComponent);
    service = TestBed.inject(JogadorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelGrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

class MockJogadorService {
  user = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  userSubject = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  nivelGrafo: number= 0;
}



