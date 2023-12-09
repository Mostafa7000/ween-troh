import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Place} from "../models/Place";

// const baseUrl = 'http://ec2-35-175-190-246.compute-1.amazonaws.com:8080/api/places/dash';
const baseUrl = 'http://localhost:8080/api/places';

@Injectable({
  providedIn: 'root'
})

export class PlaceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Place[]> {
    return this.http.get<Place[]>(baseUrl).pipe(
      map(
        response => response
      )
    )
  }

  getOrderById(id: string | null): Observable<Place> {
    return this.http.get<Place>(baseUrl + "/" + id).pipe(
      map(
        // @ts-ignore
        response => response.data
      )
    )
  }


  addPlace(Place: Place): Observable<any>{
    return this.http.post<Place>(baseUrl, Place);
  }
  removePlace(id: number): Observable<any>{
    return this.http.delete<Place>(baseUrl+"/"+id);
  }
  get(id: any): Observable<Place> {
    return this.http.get<Place>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Place[]> {
    return this.http.get<Place[]>(`${baseUrl}?title=${title}`);
  }
}
