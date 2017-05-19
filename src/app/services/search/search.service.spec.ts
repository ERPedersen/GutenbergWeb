import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import {HttpModule} from '@angular/http';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [HttpModule]
    });
  });

  it('should be injectable', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
