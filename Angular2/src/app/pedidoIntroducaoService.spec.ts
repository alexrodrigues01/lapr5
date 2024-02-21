import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Pedidointroducao } from './pedidointroducao';
import { PedidoIntroducaoService } from './pedidoIntroducaoService';

describe('PedidoIntroducaoService', () => {
  let service: PedidoIntroducaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidoIntroducaoService]
    });
    service = TestBed.inject(PedidoIntroducaoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('criarPedidoIntroducao', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const pedidointroducaoStub: Pedidointroducao = <any>{};
      service.criarPedidoIntroducao(pedidointroducaoStub).subscribe(res => {
        expect(res).toEqual(pedidointroducaoStub);
      });
      const req = httpTestingController.expectOne(
        'https://localhost:5001/api/introducoes'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(pedidointroducaoStub);
      httpTestingController.verify();
    });
  });
});
