import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Offer} from "../models/Offer";

// const baseUrl = 'http://ec2-35-175-190-246.compute-1.amazonaws.com:8080/api/offers/dash';
const baseUrl = 'http://localhost:8080/api/offers';

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(baseUrl).pipe(
      map(
        response => response
      )
    )
  }

  getOrderById(id: string | null): Observable<Offer> {

    return this.http.get<Offer>(baseUrl + "/" + id).pipe(
      map( // @ts-ignore
        response => response.data
      )
    )
  }


  addOffer(Offer: Offer): Observable<any>{
    return this.http.post<Offer>(baseUrl, Offer);
  }
  removeOffer(id: number): Observable<any>{
    return this.http.delete<Offer>(baseUrl+"/"+id);
  }
  get(id: any): Observable<Offer> {
    return this.http.get<Offer>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${baseUrl}?title=${title}`);
  }
}
