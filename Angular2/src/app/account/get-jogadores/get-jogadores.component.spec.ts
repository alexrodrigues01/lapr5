import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetJogadoresComponent } from './get-jogadores.component';
import {JogadorService} from "../../jogador.service";

describe('GetJogadoresComponent', () => {
  let component: GetJogadoresComponent;
  let fixture: ComponentFixture<GetJogadoresComponent>;

  beforeEach(async () => {
    let mockJogadorService={getAllJogadores: () =>{}};
    // @ts-ignore
    spyOn(mockJogadorService,'getAllJogadores').and.returnValue({
      subscribe: () => {}
    });

    await TestBed.configureTestingModule({
      declarations: [ GetJogadoresComponent ],
      providers: [{provide: JogadorService, useValue: mockJogadorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetJogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GetJogadoresComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
