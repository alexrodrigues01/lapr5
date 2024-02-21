import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PedidoligacaoService } from './pedidoligacao.service';

describe('PedidoligacaoService', () => {
  let service: PedidoligacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidoligacaoService]
    });
    service = TestBed.inject(PedidoligacaoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
