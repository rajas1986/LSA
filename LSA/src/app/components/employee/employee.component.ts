import { Component, OnInit, ViewChild, TemplateRef,
  AfterViewInit,ElementRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from "../../shared/employee.service";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,AfterViewInit {
  DataSource:any = null;
  transVal=2;
  DisplayedColumns=['sno','awardtype','ecode','ename','certMobile','status','remarks'];
  csrfToken;
  constructor(public employeeService: EmployeeService){}

  ngOnInit(){
    //this.DataSource = new MatTableDataSource(this.employeeService.getEmployeeData());
    this.employeeService.getOdataEmployee().subscribe((response) => {
      //this.csrfToken = response.headers.get('X-CSRF-Token');
      this.DataSource = new MatTableDataSource(response.body.d.results);
      console.log(response.body.d.results);
    });
  }
  ngAfterViewInit(){
    
  }
}


  // @ViewChild('loading') loading: ElementRef;
// console.log(this.loading);
    // setInterval(()=>{
    //   if(this.transVal==1){
    //   this.loading.nativeElement.style.transform = "translate(10%)";
    //   this.transVal++
    //   }
    //   else{
    //   this.loading.nativeElement.style.transform = "translate(50%)";
    //   this.transVal=1
    //   }
    // },400)