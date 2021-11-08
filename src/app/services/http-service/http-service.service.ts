import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) {
  }

  getHeaders(typeMethod: string) {
    if (typeMethod === 'post' || typeMethod === 'put') {
      return new HttpHeaders({'Content-Type' : 'application/json'});
    } else {
      return new HttpHeaders();
    }
  }

  postJSON(url: string, data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(url, data,
        {
          headers: this.getHeaders('post'),
          observe: 'response'
        }
    );
  }

  putJSON(url: string, data: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(url, data,
        {
          headers: this.getHeaders('put'),
          observe: 'response'
        }
    );
  }

  postJSONText(url: string, data: any): Observable<HttpResponse<string>> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'text/plain'
    });
    return this.http.post<string>(url, data,
        {
          headers: this.getHeaders('post-text-plain'),
          observe: 'response'
        }
    );
  }

  getRequest(url: string, data: any): Observable<any> {
    return this.http.get(url + '?' + this.listParams(data), { headers: this.getHeaders('get') } );
  }

  listParams(data: any) {
    if (data === '') {
        return '';
    } else {
        return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    }
  }

  getRequestWithoutParams(url: string): Observable<any> {
    return this.http.get(url, { headers: this.getHeaders('get') });
  }
}
