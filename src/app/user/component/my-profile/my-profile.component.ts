import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Service/login.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  currentUser: any;
  username: any;
  showspinner: boolean=false;
  userInfo: any;
  empId:any;
  department:any;
  designation:any;
  phone:any
  empname:any
  constructor(private userinfoService:LoginService){}
  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('UserInfo')!);
    this.username = this.currentUser.User_Name;
    this.getdata() 
  }

  getdata(){
    this.showspinner=true;
    this.userinfoService.getuserInfo(this.currentUser).subscribe((res:any)=>{
      this.userInfo=res
      this.phone=this.userInfo[0].phone
      this.department=this.userInfo[0].department
      this.empId=this.userInfo[0].id
      this.designation=this.userInfo[0].role
      this.empname=this.userInfo[0].name
      this.showspinner=false;
    })
  }

}
