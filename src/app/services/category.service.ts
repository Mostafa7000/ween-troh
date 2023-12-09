import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Category} from "../models/Categorymodel";

// const baseUrl = 'http://ec2-35-175-190-246.compute-1.amazonaws.com:8080/api/category/dash';
const baseUrl = 'http://localhost:8080/api/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl).pipe(
      map(
        response => response
      )
    )
  }

  getOrderById(id: string | null): Observable<Category> {
    return this.http.get<Category>(baseUrl + "/" + id).pipe(
      map(
        response => response
      )
    )
  }


  addCategory(category: Category): Observable<any>{
    // data.append('file', category.fileIcon);
    return this.http.post<Category>(baseUrl, category);
  }

  removeCategory(id: number): Observable<any>{
    return this.http.delete<Category>(baseUrl+"/"+id);
  }
  get(id: any): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}?title=${title}`);
  }
}
