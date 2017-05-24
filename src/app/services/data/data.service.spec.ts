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
        } else if (connection.request.url.indexOf("booksfromcity") >= 0) {
          mockResponse.type = "getBooksFromCity";
          mockResponse.cityName = "Copenhagen";
        } else if (connection.request.url.indexOf("citiesfrombook") >= 0) {
          mockResponse.type = "getCitiesFromBook";
          mockResponse.bookTitle = "Angular 4: From Theory To Practice";
        } else if (connection.request.url.indexOf("booksfromlatlong") >= 0) {
          mockResponse.type = "getBooksFromLatLong";
          mockResponse.lat = 1.2345;
          mockResponse.long = 5.4321;
        }

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
    }));

    it('should get books from author, and modify the response accordingly.',
      inject([DataService], (service: DataService) => {
        let r;

        service.getSubject().subscribe((results) => r = results);

        service.getBooksFromAuthor("Luke Skywalker").subscribe((res) => {
          expect(res.json().type).toBe("getBooksFromAuthor");
          expect(res.json().authorName).toBe("Luke Skywalker");

          expect(r.type).toBe("getBooksFromAuthor");
          expect(r.authorName).toBe("Luke Skywalker");
        });
      })
    );

    it('should get books from city, and modify the response accordingly.',
      inject([DataService], (service: DataService) => {
        let r;

        service.getSubject().subscribe((results) => r = results);

        service.getBooksFromCity("Copenhagen").subscribe((res) => {
          expect(res.json().type).toBe("getBooksFromCity");
          expect(res.json().cityName).toBe("Copenhagen");

          expect(r.type).toBe("getBooksFromCity");
          expect(r.cityName).toBe("Copenhagen");
        });
      })
    );

    it('should get locations from book title, and modify the response accordingly.',
      inject([DataService], (service: DataService) => {
        let r;

        service.getSubject().subscribe((results) => r = results);

        service.getCitiesFromBook("Angular 4: From Theory To Practice").subscribe((res) => {
          expect(res.type).toBe("getCitiesFromBook");
          expect(res.bookTitle).toBe("Angular 4: From Theory To Practice");

          expect(r.type).toBe("getCitiesFromBook");
          expect(r.bookTitle).toBe("Angular 4: From Theory To Practice");
        });
      })
    );

    it('should get books from lat/long, and modify the response accordingly.',
      inject([DataService], (service: DataService) => {
        let r;

        service.getSubject().subscribe((results) => r = results);

        service.getBooksFromLatLong(1.2345, 5.4321).subscribe((res) => {
          expect(res.json().type).toBe("getBooksFromLatLong");
          expect(res.json().lat).toBe(1.2345);
          expect(res.json().long).toBe(5.4321);

          expect(r.type).toBe("getBooksFromLatLong");
          expect(r.lat).toBe(1.2345);
          expect(r.long).toBe(5.4321);
        });
      })
    );

  });
});
