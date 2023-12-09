import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

// const baseUrl = 'http://ec2-35-175-190-246.compute-1.amazonaws.com:8080/api/file';
const baseUrl = 'http://localhost:8080/api/file';

@Injectable({
  providedIn: 'root'
})

export class AwsService {

  constructor(private http: HttpClient) { }

   pushFileToCategoryStorage(image: File, icon: File, id: number): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', image);
    data.append('icon', icon);
    // return this.http.post<void>(baseUrl+"/category/"+id, data);
    const newRequest = new HttpRequest('POST', baseUrl+"/category/"+id, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  pushFileToSliderStorage(image: File, id: number): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', image);
    // return this.http.post<void>(baseUrl+"/category/"+id, data);
    const newRequest = new HttpRequest('POST', baseUrl+"/slider/"+id, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  pushFileToPlaceStorage(image: File, icon: File, id: number): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', image);
    data.append('icon', icon);
    // return this.http.post<void>(baseUrl+"/category/"+id, data);
    const newRequest = new HttpRequest('POST', baseUrl+"/place/"+id, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  pushFileToOfferStorage(image: File, id: number): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', image);
    // return this.http.post<void>(baseUrl+"/category/"+id, data);
    const newRequest = new HttpRequest('POST', baseUrl+"/offer/"+id, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
