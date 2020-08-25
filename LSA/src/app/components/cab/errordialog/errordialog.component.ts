import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CabService } from 'src/app/shared/cab.service';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {
  eTableDisplayedColumns: string[] = [
    'Uname',
    'Amount',
    'Status'
  ];
  eTableDataSource: any = null;
  constructor(
    public dialogRef: MatDialogRef<ErrordialogComponent>,
    public cabService: CabService
  ) { }

  ngOnInit(): void {
    let dataSource = this.cabService.eDataSource;
    //this.eTableDataSource = null;
    console.log(dataSource);
    if(dataSource!=null){
      this.eTableDataSource = dataSource.d.CnBSubmitHdrToItemNav.results.map((data,index)=>{
        data['actionFlag'] = dataSource.d.Action;
        return data;
      });
    }
    
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
