import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile = {
    "fullname":"",
    "email":"",
    "username":"",
    "role":"",
    "token":""
  }

  constructor(private route: Router) { }

  sendToken(token:any){
    // บันทึกข้อมูลที่ได้ลง localStorage
    localStorage.setItem("LoggedInEmail", token['email'])
    localStorage.setItem("LoggedInUser", token['username'])
    localStorage.setItem("LoggedInFullname", token['fullname'])
    localStorage.setItem("LoggedInRole", token['role'])
    localStorage.setItem("LoggedInToken", token['token'])
  }

  getUser(){
    this.userProfile.email = localStorage.getItem("LoggedInEmail") ?? ''
    this.userProfile.fullname = localStorage.getItem("LoggedInFullname") ?? ''
    this.userProfile.username = localStorage.getItem("LoggedInUser") ?? ''
    this.userProfile.role = localStorage.getItem("LoggedInRole") ?? ''
    this.userProfile.token = localStorage.getItem("LoggedInToken") ?? ''
    return this.userProfile
  }

  getToken(){
    // อ่านข้อมูล localStorage
    return localStorage.getItem("LoggedInToken")
  }

  isLoggedIn(){
    // console.log(this.getToken());
    return this.getToken() !== null
  }

  logout(){
    // ลบข้อมูล localStorage
    localStorage.removeItem("LoggedInToken")
    this.route.navigate(['/auth/login'])
  }

}
