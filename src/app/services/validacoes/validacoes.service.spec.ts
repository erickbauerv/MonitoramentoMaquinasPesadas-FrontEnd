import { TestBed } from '@angular/core/testing';

import { ValidacoesService } from './validacoes.service';

describe('ValidacoesService', () => {
  let service: ValidacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
