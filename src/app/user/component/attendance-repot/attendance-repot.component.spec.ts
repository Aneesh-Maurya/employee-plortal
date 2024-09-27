import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRepotComponent } from './attendance-repot.component';

describe('AttendanceRepotComponent', () => {
  let component: AttendanceRepotComponent;
  let fixture: ComponentFixture<AttendanceRepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceRepotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceRepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
