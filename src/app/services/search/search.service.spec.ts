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

        if (connection.request.url.indexOf("fuzzybook") >= 0) {
          mockResponse.type = "books";
        } else if (connection.request.url.indexOf("fuzzyauthor") >= 0) {
          mockResponse.type = "authors";
        } else if (connection.request.url.indexOf("fuzzycity") >= 0) {
          mockResponse.type = "locations";
        }

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
    }));

    it('should return books if type is books.', inject([SearchService], (service: SearchService) => {

      let r;
      service.getSubject().subscribe(results => r = results);

      service.getSearchResults("books", "test").subscribe((books) => {
        expect(books.json().type).toBe("books");
        expect(r.type).toBe("books");
      });
    }));

    it('should return authors if type is authors.', inject([SearchService], (service: SearchService) => {

      let r;
      service.getSubject().subscribe(results => r = results);

      service.getSearchResults("authors", "test").subscribe((authors) => {
        expect(authors.json().type).toBe("authors");
        expect(r.type).toBe("authors");
      });
    }));

    it('should return locations if type is locations.', inject([SearchService], (service: SearchService) => {

      let r;
      service.getSubject().subscribe(results => r = results);

      service.getSearchResults("locations", "test").subscribe((locations) => {
        expect(locations.json().type).toBe("locations");
        expect(r.type).toBe("locations");
      });
    }));

  });
});
