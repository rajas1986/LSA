import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

let newheaders = { 
  'Content-Type':  'application/json', 
  //'Authorization': 'Basic ' + btoa('P50002103:1q1q1q'),
  'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  'Pragma': 'no-cache',
  'Expires': '0'
}

const newHttpOptions  = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      //.set('Authorization', 'Basic ' + btoa('P50002103:1q1q1q'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};

export const data = [
    {
      ecode:"50002103",
      ename:"Shyamanta Nath",
      certMobile:435345342,
      status:"Submitted by employee",
      amount:5000
    },
    {
      ecode:"50002103",
      ename:"David Nath ",
      certMobile:435345342,
      status:"Submitted by employee",
      amount:5000
    },
    {
      ecode:"50002103",
      ename:"Michael Nath",
      certMobile:435345342,
      status:"Submitted by employee",
      amount:"10000"
    }
  ]

@Injectable({
    providedIn: 'root',
  })

  export class CabService{
      eDataSource: any;
      constructor(private http: HttpClient){}
      getCabData(){
          return data
      }

      getOdataCab():any {
        //return of(dataNew);
        return this.http.get("/sap/opu/odata/sap/ZLSA_SPA_SRV/CnBOverViewSet?$filter eq ''",newHttpOptions);
      }

      approveRequests(requests,csrfToken) {
        newheaders['X-CSRF-Token'] = csrfToken;
        const httpOptions = new HttpHeaders(newheaders);
        return this.http.post('/sap/opu/odata/sap/ZLSA_SPA_SRV/CnBSubmitHdrSet', requests,{headers: httpOptions});
     //   // * How to make deep insert? Harphool has told to do deep insert
     }
      rejectRequests(requests,csrfToken) {
        newheaders['X-CSRF-Token'] = csrfToken;
        const httpOptions = new HttpHeaders(newheaders);
        return this.http.post('/sap/opu/odata/sap/ZLSA_SPA_SRV/CnBSubmitHdrSet', requests,{headers: httpOptions});
      }
  }