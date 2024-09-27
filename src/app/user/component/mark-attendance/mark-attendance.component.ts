import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Service/login.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.scss'
})
export class MarkAttendanceComponent implements OnInit {
  showmessage: any;
  constructor(private reportService:LoginService){}
  currentUser: any;
  username: any;
  isOfficeIn:boolean | undefined
  today = new Date();
  buttonHidden: boolean | undefined ;
  loginTime: any;
  logoutTime: any;
  showspinner:boolean=false;
  tableHidden: boolean | undefined;
  ngOnInit(): void {
    
    this.currentUser = JSON.parse(sessionStorage.getItem('UserInfo')!);
    this.username = this.currentUser.User_Name; 
    this.isOfficeIn=true
    this.tableHidden = true;
    this.getData()
  }

  getData(){
    this.showspinner=true;
    this.reportService.getReportdata(this.currentUser).subscribe((res:any)=>{
      if(res.length!=0){
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-CA');
        const filteredArray = res.filter((item: any) => item.days === formattedDate);
        this.showspinner=false;
        if(filteredArray.length!=0){
          const logouttime = filteredArray.map((item: any) => item.logouttime);
          if(logouttime=='undefined'){
            const loginTimes = filteredArray.map((item: any) => item.logintime);
            this.loginTime=loginTimes
            this.isOfficeIn=false
            this.tableHidden = false;
          }else{
            const logouttime = filteredArray.map((item: any) => item.logouttime);
            const loginTimes = filteredArray.map((item: any) => item.logintime);
            this.showmessage='Attendance Mark Sucessfully'
            this.loginTime=loginTimes
            this.logoutTime=logouttime
            this.buttonHidden = true;
            this.tableHidden = false;
          }
        
         
        }
      }
      this.showspinner=false;
    })
  }
 
  markAttend(){
   
    if (!this.isOfficeIn) {
      this.buttonHidden = true;
      this.logoutTime = new Date().toLocaleTimeString();
     
      var data1={
        username:this.username,
        logouttime:this.logoutTime,
       
      }
      this.showspinner=true;
      this.reportService.update_report(data1).subscribe((res:any)=>{
        console.log(res)
        if(res.msg=='success' && res.data.length !=0){
          this.showspinner=false;
          this.showmessage='Attendance Mark Sucessfully'
        }
      })
     
    }else{
      
      this.isOfficeIn = !this.isOfficeIn;
      this.tableHidden = false;
      this.loginTime = new Date().toLocaleTimeString();
      const formattedDate = this.today.toLocaleDateString('en-CA'); // '2024-08-07'
      var data={
        username:this.username,
        logintime:this.loginTime,
        logouttime:this.logoutTime,
        days:formattedDate,
        date:formattedDate
      }
      this.showspinner=true;
      this.reportService.insert_report(data).subscribe((res:any)=>{
        console.log(res.rowCount)
        if(res.rowCount==1){
          this.showspinner=false;
          
        }
      })
    }
    
  }
}
