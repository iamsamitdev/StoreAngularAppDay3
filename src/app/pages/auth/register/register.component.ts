import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Validation from './../../../utils/validation'

// เรียกใช้งาน User Service
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  // For Focus Input
  @ViewChild('fullnameInput') fullnameInputElement!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.fullnameInputElement.nativeElement.focus();
  }

  // สร้าง Object FormGroup
  registerForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    tel: new FormControl(''),
    role: new FormControl(),
    acceptTerms: new FormControl(false),
  })

  // สร้างตัวแปรไว้เช็คว่ามีการ Submit form
  submitted = false;
  msgStatus:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [ 
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [ 
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32)
          ]
        ],
        password_confirmation: ['', Validators.required],
        tel: ['', Validators.required],
        role: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password','password_confirmation')]
      }
    )
  }

  // สร้างฟังก์ชันสำหรับผูกกับฟอร์ม
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // ฟังก์ชัน Submit
  submitRegister(){
    // console.log("Submitted");
    this.submitted = true;

    // ถ้ายัง Validate ไม่ผ่าน
    if(this.registerForm.invalid){
      return;
    }else{

      console.log(this.registerForm.value);

      // เรียกใช้งาน API Register
      this.http.Register(this.registerForm.value).subscribe((data: {}) => {
        if(data != ""){
          this.msgStatus='<p class="alert alert-success text-center">ลงทะเบียนเรียบร้อยแล้ว</p>'
          this.registerForm.reset({role: ''});
          this.fullnameInputElement.nativeElement.focus();
          this.submitted = false;
        }else{
          this.msgStatus='<p class="alert alert-danger text-center">มีข้อผิดพลาด ลงทะเบียนไม่สำเร็จ</p>'
        }
      })

    }
    
  }

  // ฟังก์ชันสำหรับ Reset Form
  onReset() {
    this.submitted = false;
    this.registerForm.reset({role:''});
    this.msgStatus = ''
    this.fullnameInputElement.nativeElement.focus();
  }

}
