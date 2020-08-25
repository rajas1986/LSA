import { Component, OnInit, ViewChild, TemplateRef,
  AfterViewInit,ElementRef} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CabService } from "../../shared/cab.service";
import { NotificationService } from "../../shared/notification.service";
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogComponent } from "./dialog/dialog.component";
import { ErrordialogComponent } from './errordialog/errordialog.component';

@Component({
  selector: 'app-cab',
  templateUrl: './cab.component.html',
  styleUrls: ['./cab.component.css']
})
export class CabComponent implements OnInit{
  csrfToken;
  DataSource:any = null;
  public reasons : any = {};
  selection = new SelectionModel(true, []);
  DisplayedColumns=['select','awardtype','ecode','ename','certMobile','status','amount','reason'];
  constructor(
    public cabService: CabService,
    private dialog: MatDialog,
    private notificationService:NotificationService
    ){}
  ngOnInit(){
    this.getTableData();
  }

  getTableData(){
    this.cabService.getOdataCab().subscribe((response,index) => {
      this.csrfToken = response.headers.get('X-CSRF-Token');
      //console.log(response.body.d.results);
      this.selection.clear();
      let dataArray = response.body.d.results.map((data,index)=>{
        data['no'] = index;
        return data;
      });
      this.DataSource = new MatTableDataSource(dataArray);
      //console.log(response.body.d.results);
    });
  }

 isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.DataSource.data.length;
    return numSelected === numRows;
  }
  selectAll() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.DataSource.data.forEach((row) => this.selection.select(row));
  }
  verifyReasons(){
    let valid;
    valid = this.selection.selected.every((req,index)=>{
      if(!this.reasons[req.no] || this.reasons[req.no]==="")  {
        this.notificationService.warn("Kindly fill the reason for Rejection!!");
        return false;
      } 
      return true;
    })
    if(valid){
      this.openDialog(false);
    }
  }
  openDialog(val){
    
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.minWidth = 'fit-content';
    if(val){
      dialogConfig.data= {
        action:"Approve",
        class:"text-success",
        key:true
      };
    }
    else{
      dialogConfig.data= {
        action:"Reject",
        class:"text-danger",
        key:false
      };
    }
   
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.postRequest(val)
        : this.notificationService.success(':: Transaction Cancelled');
    });
  }

  postRequest(val){
    console.log(val);
    if(val){
    this.approveRequest();
    //this.notificationService.primary("Approved Successfully!!");
    }
    else{
    this.rejectRequest();
    //this.notificationService.warn("Rejected Successfully!!");
    }
  }

  approveRequest(){
    //*Here is the approval function
    let tempArray = [];
    let finalData = JSON.parse(JSON.stringify(this.selection.selected));
    //console.log(finalData);
    finalData.forEach((data) => {
      delete data.__metadata;
      let dataArr = {
        //AwardType : data.AwardType,
        AwardTypeCode : data.AwardTypeCode,
        //EmpName : data.EmpName,
        //MobileNumber : data.MobileNumber,
        Pernr : data.Pernr,
        ReqNum: data.ReqNum,
        RewardAmount: data.RewardAmount,
        //Status: data.Status,
        StatusCode: data.StatusCode,
        Uname: data.Uname,
        RejectionReason: ''
      }
      tempArray.push(dataArr);
    })
    //console.log(tempArray);
    let newPayload = {
      Uname: '',
      Action: 'APP',
      CnBSubmitHdrToItemNav: tempArray
    }
    //console.log(newPayload);
    this.cabService.approveRequests(newPayload, this.csrfToken).subscribe(
      (response) => {
        //console.log(response);
        //this.getTableData();
        //this.cabService.eDataSource = [];
        this.cabService.eDataSource = response;
        this.openDialogError("Approve");
        //this.notificationService.primary(':: Approved successfully!!');
      },
      (error) => {
        // * Harphool was asking to open a dialog here incase there was error in approving some of the requests.  and show the in the table the requests that havent been approved successfully. He was saying that multiple requests can be approved simultaneously so some requests may have some issues.
        this.notificationService.warn(':: Error while approving requests!!');
      }
    );
  }

  rejectRequest(){
    //*Here is the approval function
    let tempArray = [];
    let finalData = JSON.parse(JSON.stringify(this.selection.selected));
    //console.log(this.reasons);
    finalData.forEach((data) => {
      delete data.__metadata;
      let dataArr = {
        //AwardType : data.AwardType,
        AwardTypeCode : data.AwardTypeCode,
        //EmpName : data.EmpName,
        //MobileNumber : data.MobileNumber,
        Pernr : data.Pernr,
        ReqNum: data.ReqNum,
        RewardAmount: data.RewardAmount,
        //Status: data.Status,
        StatusCode: data.StatusCode,
        Uname: data.Uname,
        RejectionReason: this.reasons[data.no]
      }
      tempArray.push(dataArr);
    })
    //console.log(tempArray);
    let newPayload = {
      Uname: '',
      Action: 'REJ',
      CnBSubmitHdrToItemNav: tempArray
    }
    //console.log(newPayload);
    this.cabService.approveRequests(newPayload, this.csrfToken).subscribe(
      (response) => {
        //console.log(response);
        //this.getTableData();
        //this.cabService.eDataSource = [];
        this.cabService.eDataSource = response;
        this.openDialogError("Reject");
        //this.notificationService.primary(':: Approved successfully!!');
      },
      (error) => {
        // * Harphool was asking to open a dialog here incase there was error in approving some of the requests.  and show the in the table the requests that havent been approved successfully. He was saying that multiple requests can be approved simultaneously so some requests may have some issues.
        this.notificationService.warn(':: Error while rejecting requests!!');
      }
    );
  }

  openDialogError(value) {
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    // dialogConfig.scrollStrategy.enable()
    dialogConfig.minWidth = '600px';
    if (value=="Approve") {
      //* For opening new request
      const dialogRef = this.dialog.open(ErrordialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.getTableData();
      });
    } else if(value=="Reject"){
      //* For opening delete request
      const dialogRef = this.dialog.open(ErrordialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.getTableData();
      });
    }
  }

  openExcel($val){
    
  }
}


 // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.DataSource.data.length;
  //   return numSelected === numRows;
  // }
  // selectAll() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.DataSource.data.forEach((row) => this.selection.select(row));
  // }