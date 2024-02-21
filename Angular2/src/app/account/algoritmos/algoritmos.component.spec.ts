import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlgoritmosComponent } from './algoritmos.component';
import {JogadorService} from "../../jogador.service";
import {AlgoritmosService} from "../../algoritmosService";

class MockJogadorService {}
class MockAlgoritmosService {}

describe('AlgoritmosComponent', () => {
  let component: AlgoritmosComponent;
  let fixture: ComponentFixture<AlgoritmosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmosComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService},
        {provide: AlgoritmosService, useClass: MockAlgoritmosService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
