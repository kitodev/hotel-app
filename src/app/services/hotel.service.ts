import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Hotel } from '../shared/models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private readonly hotelUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http
      .get<Hotel[]>(this.hotelUrl)
      .pipe(catchError(this.handleError<Hotel[]>(`updateHotel`)));
  }

  deleteHotel(id: number): Observable<Hotel> {
    const url = `${this.hotelUrl}/${id}`;
    return this.http
      .delete<Hotel>(url)
      .pipe(catchError(this.handleError<Hotel>(`deleteHotel`)));
  }

  updateHotel(id: number, data: Hotel): Observable<Hotel> {
    const url = `${this.hotelUrl}/${id}`;
    return this.http
      .put<Hotel>(url, data)
      .pipe(catchError(this.handleError<Hotel>(`updateHotel`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

