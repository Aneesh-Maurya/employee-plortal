import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor (private router:Router){}
  logout(){
    sessionStorage.removeItem('UserInfo');
    this.router.navigate(['home'])
  }
}
