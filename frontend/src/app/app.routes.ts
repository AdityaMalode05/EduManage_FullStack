import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './dashboards/admin/admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './dashboards/trainer/trainer-dashboard/trainer-dashboard.component';
import { StudentDashboardComponent } from './dashboards/student/student-dashboard/student-dashboard.component';
import { CoursesComponent } from './dashboards/admin/courses/courses.component';
import { BatchesComponent } from './dashboards/admin/batches/batches.component';
import { StudentsComponent } from './dashboards/admin/students/students.component';
import { TrainersComponent } from './dashboards/admin/trainers/trainers.component';
import { AuthGuard } from './services/auth.guard';
import { MyBatchesComponent } from './dashboards/trainer/my-batches/my-batches.component';
import { StudentAttendanceComponent } from './dashboards/trainer/student-attendance/student-attendance.component';
import { AttendanceRecordsComponent } from './dashboards/trainer/attendance-records/attendance-records.component';
import { AssignTaskComponent } from './dashboards/trainer/assign-task/assign-task.component';
import { ViewTasksComponent } from './dashboards/trainer/view-tasks/view-tasks.component';
import { TrainerProfileComponent } from './dashboards/trainer/trainer-profile/trainer-profile.component';
import { MyTasksComponent } from './dashboards/student/my-tasks/my-tasks.component';
import { SubmitTaskComponent } from './dashboards/student/submit-task/submit-task.component';
import { GradeSubmissionsComponent } from './dashboards/trainer/grade-submissions/grade-submissions.component';
import { ViewSubmissionsComponent } from './dashboards/trainer/view-submissions/view-submissions.component';
import { StudentProfileComponent } from './dashboards/student/student-profile/student-profile.component';
import { AttendenceComponent } from './dashboards/student/attendence/attendence.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path : 'Admin-Dashboard', component : AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'Trainer-Dashboard', component : TrainerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'Student-Dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path:'Students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path:'Trainers', component: TrainersComponent, canActivate: [AuthGuard] },
  { path: 'Courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'Batches', component: BatchesComponent, canActivate: [AuthGuard] },
  { path: 'My-Batches', component: MyBatchesComponent, canActivate: [AuthGuard] },
  { path: 'Mark-Attendance', component: StudentAttendanceComponent, canActivate: [AuthGuard] },
  { path: 'View-Attendance', component: AttendanceRecordsComponent, canActivate: [AuthGuard] },
  { path: 'Assign-Tasks', component: AssignTaskComponent, canActivate: [AuthGuard] },
  { path: 'View-Tasks', component: ViewTasksComponent, canActivate: [AuthGuard] },
  { path: 'Trainer-Profile', component: TrainerProfileComponent, canActivate: [AuthGuard] },
  { path: 'My-Tasks', component: MyTasksComponent, canActivate: [AuthGuard] },
  { path: 'Submit-Tasks', component: SubmitTaskComponent, canActivate: [AuthGuard] },
  { path: 'Grade-Tasks', component: GradeSubmissionsComponent, canActivate: [AuthGuard] },
  { path: 'View-Submissions', component: ViewSubmissionsComponent, canActivate: [AuthGuard] },
  { path: 'Student-Attendence', component: AttendenceComponent, canActivate: [AuthGuard] },
  { path: 'Student-Profile', component: StudentProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' } // fallback
];
