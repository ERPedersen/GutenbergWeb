import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpModule} from '@angular/http';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));
});
