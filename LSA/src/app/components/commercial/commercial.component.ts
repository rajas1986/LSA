import { Component, OnInit, ViewChild, TemplateRef,
  AfterViewInit,ElementRef} from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { CommercialService } from "../../shared/commercial.service";
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogComponent } from "../cab/dialog/dialog.component";
import { NotificationService } from 'src/app/shared/notification.service';
import { ErrordialogcommercialComponent } from './errordialogcommercial/errordialogcommercial.component';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {
  csrfToken;
  DataSource:any = null;
  selection = new SelectionModel(true, []);
  DisplayedColumns=['sno','awardtype','ecode','ename','certMobile','status'];
  constructor(public commercialService:CommercialService,
    private dialog: MatDialog,
    private notificationService:NotificationService){

  }
  /*ngOnInit(){
    this.DataSource = new MatTableDataSource(this.commercialService.getCommercialData())
  }*/

  ngOnInit(){
    this.getTableData();
  }

  getTableData(){
    this.commercialService.getOdataCommercial().subscribe((response:any) => {
      this.csrfToken = response.headers.get('X-CSRF-Token');
      this.selection.clear();
      //console.log(response.body.d.results);
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
  openDialog(){
    
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data= {
      action:"Process",
      class:"text-success",
      key:true
    };
    dialogConfig.minWidth = 'fit-content';
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.postRequest()
        : this.notificationService.success(':: Transaction Cancelled');
    });
  }
  postRequest(){
    this.processRequest();
      //this.notificationService.primary("Processed Successfully!!");
  }

  processRequest(){
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
        //Uname: data.Uname,
        //RejectionReason: '',
        Flag:''
      }
      tempArray.push(dataArr);
    })
    //console.log(tempArray);
    let newPayload = {
      Uname: '',
      Action: 'PRC',
      CommSubmitHdrToItemNav: tempArray
    }
    //console.log(newPayload);
    this.commercialService.processRequests(newPayload, this.csrfToken).subscribe(
      (response) => {
        //console.log(response);
        //this.getTableData();
        //this.commercialService.eDataSource = [];
        this.commercialService.eDataSource = response;
        this.openDialogError("Process");
        //this.notificationService.primary(':: Approved successfully!!');
      },
      (error) => {
        // * Harphool was asking to open a dialog here incase there was error in approving some of the requests.  and show the in the table the requests that havent been approved successfully. He was saying that multiple requests can be approved simultaneously so some requests may have some issues.
        this.notificationService.warn(':: Error while approving requests!!');
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
    if (value=="Process") {
      //* For opening new request
      const dialogRef = this.dialog.open(ErrordialogcommercialComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.getTableData();
      });
    } 
  }

}
