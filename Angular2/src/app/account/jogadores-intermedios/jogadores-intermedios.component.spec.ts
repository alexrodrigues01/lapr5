import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadoresIntermediosComponent } from './jogadores-intermedios.component';
import {JogadorService} from "../../jogador.service";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";

class MockJogadorService {}
class MockPedidoIntroducaoService {}

describe('JogadoresIntermediosComponent', () => {
  let component: JogadoresIntermediosComponent;
  let fixture: ComponentFixture<JogadoresIntermediosComponent>;

  beforeEach(async () => {
    let mockJogadorService={getJogadoresIntermedio: () =>{}};
    // @ts-ignore
    spyOn(mockJogadorService,'getJogadoresIntermedio').and.returnValue({
      subscribe: () => {}
    });

    await TestBed.configureTestingModule({
      declarations: [ JogadoresIntermediosComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService, useValue: mockJogadorService},
        {provide: PedidoIntroducaoService, useClass: MockPedidoIntroducaoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresIntermediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
