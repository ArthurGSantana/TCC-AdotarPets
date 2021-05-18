/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaticsService } from './statics.service';

describe('Service: Statics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticsService]
    });
  });

  it('should ...', inject([StaticsService], (service: StaticsService) => {
    expect(service).toBeTruthy();
  }));
});
