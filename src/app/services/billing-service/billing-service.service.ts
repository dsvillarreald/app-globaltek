import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service.service';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private httpService: HttpService) { }

  getBillings(): Observable<any> {
    return this.httpService.getRequestWithoutParams(environment.endpointBillingApi).map(
      response => {
        return response;
      }, (error: any) => {
        return error;
      }
    );
  }

  getBillById(id: string): Observable<any> {
    return this.httpService.getRequestWithoutParams(`${environment.endpointBillingApi}/${id}`).map(
      response => {
        return response;
      }, (error: any) => {
        return error;
      }
    );
  }

  postBilling(body: any): Observable<any> {
    return this.httpService.postJSON(environment.endpointBillingApi, body).map(
      response => {
        return response;
      }, (error: any) => {
        return error;
      }
    )
  }
}
