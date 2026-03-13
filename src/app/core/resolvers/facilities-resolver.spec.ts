import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { facilitiesResolver } from './facilities-resolver';

describe('facilitiesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => facilitiesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
