import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Relacao } from './relacao';
import { RelacaoService } from './relacao.service';

describe('RelacaoService', () => {
  let service: RelacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RelacaoService]
    });
    service = TestBed.inject(RelacaoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
