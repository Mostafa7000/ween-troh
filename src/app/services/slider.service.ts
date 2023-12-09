import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Slider} from "../models/Slider";

// const baseUrl = 'http://ec2-35-175-190-246.compute-1.amazonaws.com:8080/api/sliders/dash';
const baseUrl = 'http://localhost:8080/api/sliders';

@Injectable({
  providedIn: 'root'
})

export class SliderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Slider[]> {
    return this.http.get<Slider[]>(baseUrl).pipe(
      map(
        response => response
      )
    )
  }

  getOrderById(id: string | null): Observable<Slider> {
    return this.http.get<Slider>(baseUrl + "/" + id).pipe(
      map(
        response => response
      )
    )
  }


  addSlider(Slider: Slider): Observable<any>{
    return this.http.post<Slider>(baseUrl, Slider);
  }
  removeSlider(id: number): Observable<any>{
    return this.http.delete<Slider>(baseUrl+"/"+id);
  }
  get(id: any): Observable<Slider> {
    return this.http.get<Slider>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Slider[]> {
    return this.http.get<Slider[]>(`${baseUrl}?title=${title}`);
  }
}
