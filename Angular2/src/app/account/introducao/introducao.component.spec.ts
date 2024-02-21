import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroducaoComponent } from './introducao.component';
import {RouterTestingModule} from "@angular/router/testing";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";
import {JogadorService} from "../../jogador.service";

class MockJogadorService {
  user = {id: '1', nome: 'miguelz', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  userValue = {id: '1', nome: 'miguel', email:'miguel@gmail.com', telefone:'916666666', pais:'portugal', rua:'rua x', localidade:'porto', codigoPostal:'4470-222', dataNascimento:'28-11-2001', linkedInLink:'linkedlin.com/miguel', facebookLink: 'facebook.com/miguel', interestTags:'x', estadoHumor:'farto', dataEstadoHumor:'11-11-2011'};
  nivelGrafo = 0;
}

describe('IntroducaoComponent', () => {
  let component: IntroducaoComponent;
  let fixture: ComponentFixture<IntroducaoComponent>;

  beforeEach(async () => {
    let mockPedidoIntroducaoService={getPedidosIntroducao: () =>{}};
    // @ts-ignore
    spyOn(mockPedidoIntroducaoService, 'getPedidosIntroducao').and.returnValue({
      subscribe: () => {}
    });
    await TestBed.configureTestingModule({
      declarations: [ IntroducaoComponent ],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{provide: PedidoIntroducaoService, useValue: mockPedidoIntroducaoService},
        {provide: JogadorService, useClass: MockJogadorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
