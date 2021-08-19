/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InfoGeralService } from './info-geral.service';

describe('Service: InfoGeral', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoGeralService]
    });
  });

  it('should ...', inject([InfoGeralService], (service: InfoGeralService) => {
    expect(service).toBeTruthy();
  }));
});
