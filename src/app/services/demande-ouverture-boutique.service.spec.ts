import { TestBed } from '@angular/core/testing';

import { DemandeOuvertureBoutiqueService } from './demande-ouverture-boutique.service';

describe('DemandeOuvertureBoutiqueService', () => {
  let service: DemandeOuvertureBoutiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeOuvertureBoutiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
