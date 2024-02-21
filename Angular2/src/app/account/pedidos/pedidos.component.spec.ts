import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosComponent } from './pedidos.component';
import {JogadorService} from "../../jogador.service";
import {PedidoligacaoService} from "../../pedidoligacao.service";

class MockJogadorService {
  user = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  userValue = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  nivelGrafo = 0;
}

describe('PedidosComponent', () => {
  let component: PedidosComponent;
  let fixture: ComponentFixture<PedidosComponent>;

  beforeEach(async () => {
    let mockPedidoLigacaoService={getPedidosLigacaoPendentes: () =>{}};
    // @ts-ignore
    spyOn(mockPedidoLigacaoService,'getPedidosLigacaoPendentes').and.returnValue({
      subscribe: () => {}
    });

    await TestBed.configureTestingModule({
      declarations: [ PedidosComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService},
        {provide: PedidoligacaoService, useValue: mockPedidoLigacaoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
