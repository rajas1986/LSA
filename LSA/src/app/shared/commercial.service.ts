import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

let newheaders = { 
  'Content-Type':  'application/json', 
  //'Authorization': 'Basic ' + btoa('P10053423:9o9o9o'),
  //'Authorization': 'Basic ' + btoa('P50002103:1q1q1q'),
  'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  'Pragma': 'no-cache',
  'Expires': '0'
}

const newHttpOptions  = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      //.set('Authorization', 'Basic ' + btoa('P10053423:9o9o9o'))
      //.set('Authorization', 'Basic ' + btoa('P50002103:1q1q1q'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};

export const data = [
    {
      sno:"1",
      ecode:"50002103",
      ename:"Shyamanta Nath",
      certMobile:435345342,
      status:"Approved by C&B",
      remarks:"Process it fast"
    },
    {
      sno:"2",
      ecode:"50002103",
      ename:"David Nath ",
      certMobile:435345342,
      status:"Approved by C&B",
      remarks:"Process it slow"
    },
    {
      sno:"3",
      ecode:"50002103",
      ename:"Michael Nath",
      certMobile:435345342,
      status:"Approved by C&B",
      remarks:"Process it fast"
    }
  ]

@Injectable({
    providedIn: 'root',
  })

  export class CommercialService{
      eDataSource: any;
      constructor(private http: HttpClient){}
      getCommercialData(){
          return data;
      }

      getOdataCommercial(){
        return this.http.get("/sap/opu/odata/sap/ZLSA_SPA_SRV/CommercialTeamSet?$filter eq ''",newHttpOptions);
      }

      processRequests(requests,csrfToken) {
        newheaders['X-CSRF-Token'] = csrfToken;
        const httpOptions = new HttpHeaders(newheaders);
        return this.http.post('/sap/opu/odata/sap/ZLSA_SPA_SRV/CommSubmitHdrSet', requests,{headers: httpOptions});
     //   // * How to make deep insert? Harphool has told to do deep insert
     }
  }