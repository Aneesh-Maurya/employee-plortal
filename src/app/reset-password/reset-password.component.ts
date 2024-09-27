import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginService } from '../Service/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  

  constructor(private router:Router,private resetService:LoginService,private activatedRoute: ActivatedRoute){}
  token:any
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    console.log(this.token);
  }
  
  resetPasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  onSubmit(): void {
    // Call the API to reset the password
    // console.log(this.token);
    if(this.resetPasswordForm.invalid){
      this.resetPasswordForm.controls['password'].markAllAsTouched()
      this.resetPasswordForm.controls['confirmPassword'].markAllAsTouched()
    }else{
      this.resetService.resetPassword(this.token, this.resetPasswordForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.msg !='invalid'){
          Swal.fire({text:'Successfully update'})
          this.router.navigate(['login']);
        }else{
          this.clearform()
          Swal.fire({text:'Invalid user.'})
        }
      })
    }
  
  }
  clearform(){
    this.resetPasswordForm.reset();
  }
}
