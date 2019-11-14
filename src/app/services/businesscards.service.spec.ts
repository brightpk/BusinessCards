/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinesscardsService } from './businesscards.service';

describe('Service: Businesscards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinesscardsService]
    });
  });

  it('should ...', inject([BusinesscardsService], (service: BusinesscardsService) => {
    expect(service).toBeTruthy();
  }));
});
