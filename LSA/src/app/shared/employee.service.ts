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
      sno:"1",
      ecode:"50002103",
      ename:"Shyamanta Nath",
      certMobile:435345342,
      status:"Submitted by employee",
      remarks:"ok"
    },
    {
      sno:"2",
      ecode:"50002103",
      ename:"David Nath ",
      certMobile:435345342,
      status:"Submitted by employee",
      remarks:"ok"
    },
    {
      sno:"3",
      ecode:"50002103",
      ename:"Michael Nath",
      certMobile:435345342,
      status:"Submitted by employee",
      remarks:"ok"
    }
  ]

export const dataNew = {"body":{"d":{"results":[{"__metadata":{"id":"https://rrnwgwdev.ril.com/sap/opu/odata/sap/ZLSA_SPA_SRV/EmpOverViewSet(SerialNum='0001',ReqNum='000000000005')","uri":"https://rrnwgwdev.ril.com/sap/opu/odata/sap/ZLSA_SPA_SRV/EmpOverViewSet(SerialNum='0001',ReqNum='000000000005')","type":"ZLSA_SPA_SRV.EmpOverView"},"SerialNum":"0001","Uname":"P50002103","Pernr":"50002103","EmpName":"Janany Shetty","MobileNumber":"8765456789","Status":"Submitted by Employee","Remarks":"10 YEARS COMPLETION AWARD","AwardType":"Long Service Award","ReqNum":"000000000005"}]}}}
@Injectable({
    providedIn: 'root',
  })

  export class EmployeeService{
      constructor(private http: HttpClient){}
      getEmployeeData(){
          return data;
      }

      getOdataEmployee():any {
        //return of(dataNew);
        return this.http.get("/sap/opu/odata/sap/ZLSA_SPA_SRV/EmpOverViewSet?filter eq ''",newHttpOptions);
      }
  }