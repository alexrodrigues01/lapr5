import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Estadohumor } from './estadohumor';
import { EstadohumorService } from './estadohumor.service';

describe('EstadohumorService', () => {
  let service: EstadohumorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstadohumorService]
    });
    service = TestBed.inject(EstadohumorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
