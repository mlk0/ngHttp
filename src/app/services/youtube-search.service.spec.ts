/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YoutubeSearchService } from './youtube-search.service';

describe('YoutubeSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YoutubeSearchService]
    });
  });

  it('should ...', inject([YoutubeSearchService], (service: YoutubeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
