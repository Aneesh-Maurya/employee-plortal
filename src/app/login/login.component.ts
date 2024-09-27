import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../Service/login.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
   constructor(private loginService:LoginService, private router:Router,private ele:ElementRef){}
  ngOnInit(): void {
    this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
   this.clearform()
  }
  
   loginForm=new FormGroup({
    username:new FormControl('',[Validators.required ,Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}")]),
    password:new FormControl('',Validators.required)
   })

   login(){

    if(this.loginForm.invalid){
      this.loginForm.controls['username'].markAllAsTouched()
      this.loginForm.controls['password'].markAllAsTouched()
    }else{
      this.ele.nativeElement.querySelector('#spinner').style.visibility = 'visible';
      this.loginService.userLogin(this.loginForm.value).subscribe((res:any)=>{
        if(res.data.length!=0){
          // console.log(res)
          this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
          this.router.navigate(['/user']);
          this.clearform()
          sessionStorage.setItem('UserInfo', JSON.stringify(
            { 
              User_Name: res.data[0].myusername, 
              Role: res.data[0].myrole,
              accesskey:res.data[0].token
                                 
            }
          ));
        }else{
          this.clearform()
          this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
          Swal.fire({text:'Incorrect username or password.'})
          
        }
       })

    }
   
   }
   clearform(){
    this.loginForm.value.username=' ',
    this.loginForm.value.password=''
    this.loginForm.reset();
  }
  
}
