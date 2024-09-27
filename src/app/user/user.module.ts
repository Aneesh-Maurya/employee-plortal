import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { AttendanceRepotComponent } from './component/attendance-repot/attendance-repot.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { MarkAttendanceComponent } from './component/mark-attendance/mark-attendance.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    AttendanceRepotComponent,
    MyProfileComponent,
    MarkAttendanceComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
