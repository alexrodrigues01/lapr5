import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Jogador } from './jogador';
import { JogadorService } from './jogador.service';

describe('JogadorService', () => {
  let service: JogadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JogadorService]
    });
    service = TestBed.inject(JogadorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`nivelGrafo has default value`, () => {
    expect(service.nivelGrafo).toEqual(0);
  });

  describe('addJogador', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const jogadorStub: Jogador = <any>{};
      service.addJogador(jogadorStub).subscribe(res => {
        expect(res).toEqual(jogadorStub);
      });
      const req = httpTestingController.expectOne(
        'https://localhost:5001/api/Jogadores'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(jogadorStub);
      httpTestingController.verify();
    });
  });
});
