import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FrontendLayoutComponent } from './layouts/frontend-layout/frontend-layout.component';
import { BackendLayoutComponent } from './layouts/backend-layout/backend-layout.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { AboutComponent } from './pages/frontend/about/about.component';
import { ContactComponent } from './pages/frontend/contact/contact.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotpassComponent } from './pages/auth/forgotpass/forgotpass.component';
import { DashboardComponent } from './pages/backend/dashboard/dashboard.component';
import { StockComponent } from './pages/backend/stock/stock.component';
import { SettingComponent } from './pages/backend/setting/setting.component';
import { UsersComponent } from './pages/backend/users/users.component';
import { ReportComponent } from './pages/backend/report/report.component';

// Auth Guard
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // Route สำหรับเรียกหน้า Frontend Layout
  {
    path: '',
    component: FrontendLayoutComponent,
    children: [
      {
        path:'',
        component: HomeComponent,
        pathMatch: 'full',
        data: {
          title: 'หน้าหลัก',
          keywords: 'หน้าหลัก, Store, Angular, App',
          description: 'This is home store angular app'
        }
      },
      {
        path:'about',
        component: AboutComponent,
        data: {
          title: 'เกี่ยวกับเรา',
          keywords: 'เกี่ยวกับเรา, Store, Angular, App',
          description: 'This is about store angular app'
        }
      },
      {
        path:'contact',
        component: ContactComponent,
        data: {
          title: 'ติดต่อเรา',
          keywords: 'ติดต่อเรา, Store, Angular, App',
          description: 'This is contact store angular app'
        }
      },
    ]
  },
  // Route สำหรับเรียกหน้า Auth Layout
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path:'register',
        component: RegisterComponent,
        data: {
          title: 'ลงทะเบียน',
          keywords: 'ลงทะเบียน, Store, Angular, App',
          description: 'This is register store angular app'
        }
      },
      {
        path:'login',
        component: LoginComponent,
        data: {
          title: 'เข้าสู่ระบบ',
          keywords: 'เข้าสู่ระบบ, Store, Angular, App',
          description: 'This is login store angular app'
        }
      },
      {
        path:'forgotpass',
        component: ForgotpassComponent,
        data: {
          title: 'ลืมรหัสผ่าน',
          keywords: 'ลืมรหัสผ่าน, Store, Angular, App',
          description: 'This is forgot pasword store angular app'
        }
      },
    ]
  },
  // Route สำหรับเรียกหน้า Backend Layout
  {
    path: 'backend',
    component: BackendLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'แดชบอร์ด',
          keywords: 'แดชบอร์ด, Store, Angular, App',
          description: 'This is dashboard pasword store angular app'
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'แดชบอร์ด',
          keywords: 'แดชบอร์ด, Store, Angular, App',
          description: 'This is dashboard store angular app'
        }
      },
      {
        path: 'stock',
        component: StockComponent,
        data: {
          title: 'สต็อก',
          keywords: 'สต็อก, Store, Angular, App',
          description: 'This is stock angular app'
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'รายงาน',
          keywords: 'รายงาน, Store, Angular, App',
          description: 'This is report angular app'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'ผู้ใช้งาน',
          keywords: 'ผู้ใช้งาน, Store, Angular, App',
          description: 'This is users angular app'
        }
      },
      {
        path: 'setting',
        component: SettingComponent,
        data: {
          title: 'ตั้งค่าระบบ',
          keywords: 'ตั้งค่าระบบ, Store, Angular, App',
          description: 'This is setting angular app'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
