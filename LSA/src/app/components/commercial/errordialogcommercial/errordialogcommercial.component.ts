import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommercialService } from 'src/app/shared/commercial.service';

@Component({
  selector: 'app-errordialogcommercial',
  templateUrl: './errordialogcommercial.component.html',
  styleUrls: ['./errordialogcommercial.component.css']
})
export class ErrordialogcommercialComponent implements OnInit {

  eTableDisplayedColumns: string[] = [
    'Uname',
    'Amount',
    'Status'
  ];
  eTableDataSource: any = null;
  constructor(
    public dialogRef: MatDialogRef<ErrordialogcommercialComponent>,
    public commercialService: CommercialService
  ) { }

  ngOnInit(): void {
    let dataSource = this.commercialService.eDataSource;
    //this.eTableDataSource = null;
    //console.log(dataSource);
    if(dataSource!=null){
      this.eTableDataSource = dataSource.d.CommSubmitHdrToItemNav.results.map((data,index)=>{
        data['actionFlag'] = dataSource.d.Action;
        return data;
      });
    }
    
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }

}
