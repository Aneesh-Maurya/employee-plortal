import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='http://localhost:3060/service'
  constructor(private http:HttpClient) { }

  userLogin(data:any){
    return this.http.post(this.url+'/Ws_login',data)
  }

  forgotpassword(data:any){
    return this.http.post(this.url+'/Ws_forgot',data)
  }

  resetPassword(token:any,data:any){
    return this.http.post(this.url+'/Ws_reset/'+token,data)
  }

  insert_report(data:any){
    return this.http.post(this.url+'/Ws_report',data)
  }
  
  update_report(data:any){
    return this.http.post(this.url+'/Ws_reportUpdate',data)
  }
  getReportdata(data:any){
    return this.http.post(this.url+'/Ws_reportData',data)
  }
  getuserInfo(data:any){
    return this.http.post(this.url+'/Ws_getuserInfo',data)
  }
}
