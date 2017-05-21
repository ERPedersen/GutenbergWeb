import {TestBed, inject} from '@angular/core/testing';

import {DataService} from './data.service';
import {HttpModule, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

describe('DataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        DataService
      ]
    });
  });

  it('should ...', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  describe('HTTP Methods', () => {

    beforeEach(inject([XHRBackend], (mockBackend) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {

        let mockResponse: any = {type: "", data: [], search: false};

        if (connection.request.url.indexOf("booksfromauthor") >= 0) {
          mockResponse.type = "getBooksFromAuthor";
          mockResponse.authorName = "Luke Skywalker";
        }

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
    }));

    it('should get the books from the api, and modify the response accordingly.', inject([DataService], (service: DataService) => {
      let r;

      service.getSubject().subscribe((results) => r = results);

      service.getBooksFromAuthor("Luke Skywalker").subscribe((res) => {
        expect(res.json().type).toBe("getBooksFromAuthor");
        expect(res.json().authorName).toBe("Luke Skywalker");

        expect(r.type).toBe("getBooksFromAuthor");
        expect(r.authorName).toBe("Luke Skywalker");
      });

    }));
  });
});
