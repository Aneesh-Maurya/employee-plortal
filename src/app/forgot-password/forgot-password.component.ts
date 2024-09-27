import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { LoginService } from '../Service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private forgotService:LoginService,private router:Router, private ele:ElementRef){}
  ngOnInit(): void {
    this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
  }
   forgotForm=new FormGroup({
    username:new FormControl('',[Validators.required ,Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}")]),
   })
  
   forgotPass(){
    if(this.forgotForm.invalid){
      this.forgotForm.controls['username'].markAllAsTouched()
    }else{
      this.ele.nativeElement.querySelector('#spinner').style.visibility = 'visible';
      this.forgotService.forgotpassword(this.forgotForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.data.length!=0){
          //  window.localStorage.setItem('token',res.token)  
          this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
          Swal.fire({text:'Please Check Email.'})
          this.router.navigate(['login'])
        }else{
          this.clearform()
          this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
          Swal.fire({text:'Username not Exist.'})
        }
      })
    }
   }
   
   clearform(){
    this.forgotForm.reset();
  }
}
