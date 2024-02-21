import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [InMemoryDataService] });
    service = TestBed.inject(InMemoryDataService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
