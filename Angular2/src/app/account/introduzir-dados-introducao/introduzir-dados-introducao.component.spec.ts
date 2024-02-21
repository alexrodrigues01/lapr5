import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduzirDadosIntroducaoComponent } from './introduzir-dados-introducao.component';
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";
import {JogadorService} from "../../jogador.service";

class MockJogadorService {}
class MockPedidoIntroducaoService {}

describe('IntroduzirDadosIntroducaoComponent', () => {
  let component: IntroduzirDadosIntroducaoComponent;
  let fixture: ComponentFixture<IntroduzirDadosIntroducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroduzirDadosIntroducaoComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService},
        {provide: PedidoIntroducaoService, useClass: MockPedidoIntroducaoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduzirDadosIntroducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
