import { TestBed } from '@angular/core/testing';
import { AccountModule } from './account.module';

describe('AccountModule', () => {
  let pipe: AccountModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AccountModule] });
    pipe = TestBed.inject(AccountModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
