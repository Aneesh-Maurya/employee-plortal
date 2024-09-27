import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginService } from '../../../Service/login.service';
@Component({
  selector: 'app-attendance-repot',
  templateUrl: './attendance-repot.component.html',
  styleUrl: './attendance-repot.component.scss'
})
export class AttendanceRepotComponent implements OnInit {
  currentUser: any;
  username: any;
  currentyear: any;
  showspinner:boolean=false;
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  selectedMonth: any;
  constructor(private reportService:LoginService,private ele:ElementRef){
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
    this.selectedMonth = currentMonth;
  }
 

  ngOnInit(): void {
   
    this.currentUser = JSON.parse(sessionStorage.getItem('UserInfo')!);
    this.username = this.currentUser.User_Name;
    this.getData() 
    this.filterDataByMonth()
  }
  attendanceReport: any[] | undefined;
  getData(){
    this.showspinner=true;
    this.reportService.getReportdata(this.currentUser).subscribe((res:any)=>{
      this.attendanceReport=res
      this.showspinner=false;
    })
  }
  filterData(year:any){
    this.currentyear=year.target.value;
    this.showspinner=true;
    this.reportService.getReportdata(this.currentUser).subscribe((res:any)=>{
      const filteredData =  res.filter((item:any) => {
        const daysYear = item.days.split('-')[0];
        const createdYear = item.createddate.split('-')[0];
        return daysYear === this.currentyear || createdYear === this.currentyear;
      });
      
     
      this.attendanceReport=filteredData
      this.showspinner=false;
    })
    
  
  }
  filterDataByMonth(){
    this.showspinner=true;
    this.reportService.getReportdata(this.currentUser).subscribe((res:any)=>{
    const filterbymonthData=   res.filter((item:any) => {
        const date = new Date(item.createddate);
        const month = date.toLocaleString('default', { month: 'short' });
        console.log(this.selectedMonth)
        return month === this.selectedMonth;
      });
      console.log(filterbymonthData)
      this.attendanceReport=filterbymonthData
      this.showspinner=false;
    })
   
  }
  onChangeMonth() {
    this.filterDataByMonth();
  }
}
