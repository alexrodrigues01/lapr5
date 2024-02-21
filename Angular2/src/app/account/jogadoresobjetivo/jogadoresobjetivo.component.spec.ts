import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadoresobjetivoComponent } from './jogadoresobjetivo.component';
import {JogadorService} from "../../jogador.service";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";

class MockJogadorService {}
class MockPedidoIntroducaoService {}

describe('JogadoresobjetivoComponent', () => {
  let component: JogadoresobjetivoComponent;
  let fixture: ComponentFixture<JogadoresobjetivoComponent>;

  beforeEach(async () => {
    let mockJogadorService={getJogadoresObjetivo: () =>{}};
    // @ts-ignore
    spyOn(mockJogadorService,'getJogadoresObjetivo').and.returnValue({
      subscribe: () => {}
    });

    await TestBed.configureTestingModule({
      declarations: [ JogadoresobjetivoComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService, useValue: mockJogadorService},
        {provide: PedidoIntroducaoService, useClass: MockPedidoIntroducaoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresobjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
