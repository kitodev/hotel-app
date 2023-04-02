import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HotelService } from './hotel.service';
import { Hotel } from '../shared/models/hotel.model';
import { environment } from 'src/environments/environment.prod';
import { mockHotel1, mockHotel3, mockHotelArray } from 'src/mocks/mockHotels';

describe('HotelService', () => {
  let service: HotelService;
  let httpController: HttpTestingController;
  const url = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService],
    });
    service = TestBed.inject(HotelService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getHotels and return an array of Hotel', () => {

      service.getHotels().subscribe((res) => {

        expect(res).toEqual(mockHotelArray);
      });


      const req = httpController.expectOne({
        method: 'GET',
        url: `${url}`,
      });


      req.flush(mockHotelArray);
    });

    it('should call updateBook and return the updated book from the API', () => {
      const id = 17;
      const updatedHotel: Hotel = {
        id: 17,
        name: 'Hotel 1',
        avatar: 'https',
        seasonal_open_from: new Date('2023/06/05'),
        seasonal_open_to: new Date('2023/08/05'),
        createdAt: new Date('2023/12/05'),
        price: 12,
      };

      service.updateHotel(id, mockHotel1).subscribe((data) => {
        expect(data).toEqual(updatedHotel);
      });

      const req = httpController.expectOne({
        method: 'PUT',
        url: `${url}/${mockHotel3.id}`,
      });

      req.flush(updatedHotel);
    });

    it('should call deleteHotel and return the hotel that was deleted from the API', () => {
      const id = 17;

      service.deleteHotel(id).subscribe((data) => {
        expect(data).toEqual(mockHotel3);
      });

      const req = httpController.expectOne({
        method: 'DELETE',
        url: `${url}/${mockHotel3.id}`,
      });

      req.flush(mockHotel3);
    });
});
