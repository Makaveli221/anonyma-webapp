import { TestBed } from '@angular/core/testing';

import { TeaserService } from './teaser.service';

describe('TeaserService', () => {
  let service: TeaserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeaserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
