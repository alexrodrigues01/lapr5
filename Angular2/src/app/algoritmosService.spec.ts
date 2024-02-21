import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AlgoritmosService } from './algoritmosService';

describe('AlgoritmosService', () => {
  let service: AlgoritmosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlgoritmosService]
    });
    service = TestBed.inject(AlgoritmosService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
