import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRelacaoComponent } from './edit-relacao.component';
import {RelacaoService} from "../../../relacao.service";

class MockRelacaoService{}

describe('EditRelacaoComponent', () => {
  let component: EditRelacaoComponent;
  let fixture: ComponentFixture<EditRelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRelacaoComponent ],
      providers: [{provide: RelacaoService, useClass: MockRelacaoService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
