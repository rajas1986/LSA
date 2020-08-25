import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhoneService } from "../shared/phone.service";
import { Router,ActivatedRoute } from '@angular/router';
import {HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hideVerify:boolean=true;
  form= new FormGroup({
    mobileNo: new FormControl('',Validators.required)
  }
  );
  phone_no=[];
  tac_link="https://en.wikipedia.org/wiki/Main_Page";
  justasq_link="http://rconnect.ril.com";
  yearOfService="";
  header:string="Long Service Gift";
  minutes;
  seconds;
  timeLeft:number=60;
  timerId;
  btnDisabled=true;
  enteredOTP;
  backendOTP;
  payLoad = {
    ImAppid: "ZLSA",
    ImAppname: "specialAward"
  };
  csrfToken = '';
  errorMessage='';
  isLSA:boolean=true;
  awardType="";
  selectedNo;
  isAccepted:boolean=false;
  disableOtpBtn:boolean=false;
  reqNo='';
  Uname;

  constructor(
    private router: Router,private route:ActivatedRoute,public phoneService:PhoneService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((parameters)=>{
      
      if(parameters['id']=='spa'){
        this.populateNo(false);
       
      }
      else{
        this.populateNo(true);
        
      }
    })
    
    
  }
  populateNo(val){
    this.phoneService.getPhoneNo().subscribe((res:HttpResponse<any>)=>{
      this.csrfToken = res.headers.get('X-CSRF-Token');
      this.phone_no = res.body['d'].results;
      this.Uname = res.body['d'].results[0].Uname;
      if(val){
        this.phoneService.getYearOfService("LSA",this.Uname).subscribe(res=>{
          this.yearOfService = res.body.d.Years;
          this.reqNo = res.body.d.ReqNum;
        },err=>{
          this.isAccepted=true;
        })
      }
      else{
        this.header = "Special Award";
        this.isLSA=false;
        this.phoneService.getYearOfService("SPA",this.Uname).subscribe(res=>{
          this.awardType = res.body.d.SpecialAwardDesc;
          this.reqNo = res.body.d.ReqNum;
        },err=>{
          this.isAccepted=true;
        })
      }
      
    })
  }
  onNumberChange(){
    this.hideVerify=true;
  }

  sendOtp(selectedNo){
    this.selectedNo=selectedNo;
    this.errorMessage='';
    this.enteredOTP="";
    this.payLoad['ImMobileno']='+91'+selectedNo;
    this.payLoad['Mode']="CREATE";
    this.phoneService.sendOtp(this.payLoad,this.csrfToken).subscribe((res)=>{
    this.hideVerify=false;
    this.disableOtpBtn=true;
    },error=>{
      alert("Error while sending OTP. Kindly try again.");
      this.hideVerify=true;
    })
    if(this.timerId){
      clearTimeout(this.timerId);
      this.timeLeft=60;
      this.btnDisabled= true;
      }
    this.startTimer();
  }
  verifyOtp(){
    if(this.enteredOTP.length==6)   {
    this.payLoad['Mode']="VALIDATE";
    this.payLoad['ImOtp']=this.enteredOTP;
    this.phoneService.verifyOtp(this.payLoad,this.csrfToken).subscribe(res=>{
      this.btnDisabled= false;
      this.disableOtpBtn=false;
    },err=>{
      this.errorMessage= err.error.error.message.value;  
      clearTimeout(this.timerId); 
      this.disableOtpBtn=false;   
    })
    }
  }
  onSubmit(){
    if(this.timeLeft<=1){
      alert("Time Up. Kindly verify OTP again.");
      this.hideVerify=true;
    }
    else{
      let data = {
        MobileNumber:this.selectedNo,
        Action:"SUBMIT",
      }
      if(this.isLSA){
        data['AwardType']="LSA";        
        data['Years']=this.yearOfService;
        data['ReqNum']=this.reqNo;
        this.submitData(data);
      }
      else{
        data['AwardType']="SPA";
        data['Years']=this.yearOfService;
        data['ReqNum']=this.reqNo;
        this.submitData(data);
      }
    clearTimeout(this.timerId);
    }
  }
  submitData(data){
    console.log(data);
    this.phoneService.employeeAccept(data,this.csrfToken).subscribe(res=>{
      this.isAccepted = true;
      setInterval(()=>{
        window.location.reload() 
      },3000)
    },err=>{
      alert("Problem in submitting!!")
    })
  }

  startTimer(){
      this.timer(this.timeLeft);
      this.timerId= setInterval(()=>{
        if(this.timeLeft<=1){
        clearTimeout(this.timerId);
        this.disableOtpBtn=false;
        }
        this.timeLeft--
        this.timer(this.timeLeft);
      },1000)
  }
  timer(remaining){
    let minute1 = Math.floor(remaining/60);
    let second1 = remaining % 60;
    this.minutes = minute1 < 10 ? '0' + minute1 : new String(minute1);
    this.seconds = second1 < 10 ? '0' + second1 : new String(second1);
  }
}
