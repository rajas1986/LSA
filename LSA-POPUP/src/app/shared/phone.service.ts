import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

let newheaders = { 
  'Content-Type':  'application/json', 
  'Authorization': 'Basic ' + btoa('P50002103:1q1q1q')
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('P50002103:1q1q1q')
  })
};
const newHttpOptions  = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + btoa('P50002103:1q1q1q'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root',
})

export class PhoneService {
   private PHONE_URL = "/sap/opu/odata/sap/ZLSA_SPA_SRV/MobileNumberSet?$filter eq ''"
    constructor(private http: HttpClient){}
  
    getPhoneNo(){
        return this.http.get<any>(this.PHONE_URL,newHttpOptions);
    }
    sendOtp(data,csrfToken){
      newheaders['X-CSRF-Token']=csrfToken;
      const httpOptions = new HttpHeaders(newheaders);
      return this.http.post<any>('/sap/opu/odata/sap/ZHR_APP_ENCRYPT_SRV/OtpGenValSet', data, {headers: httpOptions});
    }
    verifyOtp(data,csrfToken){
      newheaders['X-CSRF-Token']=csrfToken;
      const httpOptions = new HttpHeaders(newheaders);
      return this.http.post<any>('/sap/opu/odata/sap/ZHR_APP_ENCRYPT_SRV/OtpGenValSet', data, {headers: httpOptions});
    }
    getYearOfService(awardType,Uname){
      return this.http.get<any>(`/sap/opu/odata/sap/ZLSA_SPA_SRV/GetRequestNumSet(Uname='${Uname}',AwardTypeCode='${awardType}')`,newHttpOptions);
    }
    employeeAccept(data,csrfToken){
      newheaders['X-CSRF-Token']=csrfToken;
      const httpOptions = new HttpHeaders(newheaders);
      return this.http.post<any>(`/sap/opu/odata/sap/ZLSA_SPA_SRV/EmpSubmitSet`, data, {headers: httpOptions});
    }
}