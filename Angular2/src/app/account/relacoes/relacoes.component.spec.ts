import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelacoesComponent } from './relacoes.component';
import {JogadorService} from "../../jogador.service";
import {RelacaoService} from "../../relacao.service";

class MockJogadorService {
  user = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  userValue = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  nivelGrafo = 0;
}

describe('RelacoesComponent', () => {
  let component: RelacoesComponent;
  let fixture: ComponentFixture<RelacoesComponent>;

  beforeEach(async () => {
    let mockRelacaoService={getRelacoes: () =>{}};
    // @ts-ignore
    spyOn(mockRelacaoService,'getRelacoes').and.returnValue({
      subscribe: () => {}
    });

    await TestBed.configureTestingModule({
      declarations: [ RelacoesComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService},
        {provide: RelacaoService, useValue: mockRelacaoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
