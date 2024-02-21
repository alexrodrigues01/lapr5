import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {JogadorService} from "../jogador.service";

class MockJogadorService {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    //let mockJogadorService=jasmine.createSpy("spy",);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provide: JogadorService, useClass: MockJogadorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
