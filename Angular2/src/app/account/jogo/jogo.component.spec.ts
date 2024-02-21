import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JogoComponent } from './jogo.component';
import {JogadorService} from "../../jogador.service";

class MockJogadorService {}

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogoComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
