import { TestBed } from '@angular/core/testing';

import { TokenSerivce } from './token-serivce';

describe('TokenSerivce', () => {
  let service: TokenSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenSerivce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
