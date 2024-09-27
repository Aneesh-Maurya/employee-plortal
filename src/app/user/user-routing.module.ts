import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AttendanceRepotComponent } from './component/attendance-repot/attendance-repot.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { MarkAttendanceComponent } from './component/mark-attendance/mark-attendance.component';

const routes: Routes = [
  {path:'',component:UserComponent,

  children:[
    {path:'', component:DashboardComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'my-profile',component:MyProfileComponent},
    {path:'mark-attendance',component:MarkAttendanceComponent},
    {path:'report',component:AttendanceRepotComponent}
  
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
