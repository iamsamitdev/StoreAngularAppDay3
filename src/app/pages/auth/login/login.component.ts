import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

// เรียกใช้งาน User Service
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  // For Focus Input
  @ViewChild('emailInput') emailInputElement!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.emailInputElement.nativeElement.focus();
  }

  // สร้าง Object FormGroup
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  // สร้างตัวแปรไว้เช็คว่ามีการ Submit form
  submitted = false;
  msgStatus:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: UserService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [ 
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32)
          ]
        ]
      }
    )
  }

  // สร้างฟังก์ชันสำหรับผูกกับฟอร์ม
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

    // ฟังก์ชัน Submit
    submitLogin(){
      // console.log("Submitted");
      this.submitted = true;

      // ถ้ายัง Validate ไม่ผ่าน
      if(this.loginForm.invalid){
        return;
      }else{

      console.log(this.loginForm.value);

        // เรียกใช้งาน API Register
      this.http.Login(this.loginForm.value).subscribe((data: {}) => {
          this.msgStatus='<p class="alert alert-success text-center">เข้าสู่ระบบเรียบร้อย</p>'
          // Redirect ไปหน้า backend
          this.route.navigate(['backend'])
      },error => {
        // You can access status:
        // console.log(error.status);
        if(error.status == 401){
          this.msgStatus='<p class="alert alert-danger text-center">มีข้อผิดพลาด ข้อมูลเข้าระบบไม่ถูกต้อง</p>'
        }else{
          this.msgStatus='<p class="alert alert-danger text-center">มีข้อผิดพลาดบางอย่าง</p>'
        }
      });
    }
  }

}
