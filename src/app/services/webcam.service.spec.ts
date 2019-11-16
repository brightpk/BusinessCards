/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebcamService } from './webcam.service';

describe('Service: Webcam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebcamService]
    });
  });

  it('should ...', inject([WebcamService], (service: WebcamService) => {
    expect(service).toBeTruthy();
  }));
});
