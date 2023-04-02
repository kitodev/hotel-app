import { Hotel } from 'src/app/shared/models/hotel.model';

const mockHotel1: Hotel = {
  id: 15,
  name: 'Hotel 1',
  avatar: 'https',
  seasonal_open_from: new Date('2023/05/05'),
  seasonal_open_to: new Date('2023/08/05'),
  createdAt: new Date('2023/12/05'),
  price: 12,
};

const mockHotel2: Hotel = {
  id: 16,
  name: 'Hotel 2',
  avatar: 'https',
  seasonal_open_from: new Date('2023/12/05'),
  seasonal_open_to: new Date('2023/12/05'),
  createdAt: new Date('2023/12/05'),
  price: 127,
};

const mockHotel3: Hotel = {
  id: 17,
  name: 'Hotel 3',
  avatar: 'https',
  seasonal_open_from: new Date('2023/12/05'),
  seasonal_open_to: new Date('2023/12/05'),
  createdAt: new Date('2023/12/05'),
  price: 125,
};

const mockHotelArray: Hotel[] = [mockHotel1, mockHotel2, mockHotel3];

export { mockHotel1, mockHotel2, mockHotel3, mockHotelArray };
