import {TestBed, inject} from '@angular/core/testing';

import {SearchService} from './search.service';
import {HttpModule, XHRBackend, ResponseOptions, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('SearchService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        SearchService
      ]
    });
  });

  it('should be injectable', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  describe("HTTP methods", () => {

    beforeEach(inject([XHRBackend], (mockBackend) => {

      mockBackend.connections.subscribe((connection: MockConnection) => {
        let mockResponse = {type: "", data: []};

        if (connection.request.url.indexOf("book") >= 0) {
          mockResponse.type = "book";
        } else if (connection.request.url.indexOf("author") >= 0) {
          mockResponse.type = "author";
        } else if (connection.request.url.indexOf("location") >= 0) {
          mockResponse.type = "location";
        }

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
    }));

    it('should return books if type is book.', inject([SearchService], (service: SearchService) => {

      let r;
      service.getSubject().subscribe(results => r = results);

      service.getSearchResults("book", "test").subscribe((books) => {
        expect(books.json().type).toBe("book");
        expect(r.type).toBe("book");
      });
    }));

    it('should return authors if type is author.', inject([SearchService], (service: SearchService) => {

      let r;
      service.getSubject().subscribe(results => r = results);

      service.getSearchResults("author", "test").subscribe((authors) => {
        expect(authors.json().type).toBe("author");
        expect(r.type).toBe("author");
      });
    }));

    it('should return locations if type is location.', inject([SearchService], (service: SearchService) => {

      let r;
      service.getSubject().subscribe(results => r = results);

      service.getSearchResults("location", "test").subscribe((locations) => {
        expect(locations.json().type).toBe("location");
        expect(r.type).toBe("location");
      });
    }));

  });
});
