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

  it('should trim data', inject([SearchService], (service: SearchService) => {
    let sorted = service.trimData([" A", "B", "       C"]);
    expect(sorted[0]).toBe("A");
    expect(sorted[1]).toBe("B");
    expect(sorted[2]).toBe("C");
  }));

  it('should sort data', inject([SearchService], (service: SearchService) => {
    let sorted = service.sortData(["B", "C", "A", "C"]);
    expect(sorted[0]).toBe("A");
    expect(sorted[1]).toBe("B");
    expect(sorted[2]).toBe("C");
    expect(sorted[3]).toBe("C");
  }));

  it('should return error', inject([SearchService], (service: SearchService) => {
    service.handleError("", "").subscribe((res) => {}, (error) => {
      expect(error.error).toBeTruthy();
    });
  }));

  describe("HTTP methods", () => {

    beforeEach(inject([XHRBackend], (mockBackend) => {

      mockBackend.connections.subscribe((connection: MockConnection) => {
        let mockResponse = {type: "", data: []};

        if (connection.request.url.indexOf("book") >= 0) {
          mockResponse.type = "book";
        } else if (connection.request.url.indexOf("author") >= 0) {
          mockResponse.type = "author";
        } else if (connection.request.url.indexOf("city") >= 0) {
          mockResponse.type = "city";
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

      service.getSearchResults("city", "test").subscribe((locations) => {
        expect(locations.json().type).toBe("city");
        expect(r.type).toBe("city");
      });
    }));

  });
});
