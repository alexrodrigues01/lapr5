import { TestBed } from '@angular/core/testing';
import { AccountRoutingModule } from './account-routing.module';

describe('AccountRoutingModule', () => {
  let pipe: AccountRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AccountRoutingModule] });
    pipe = TestBed.inject(AccountRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
