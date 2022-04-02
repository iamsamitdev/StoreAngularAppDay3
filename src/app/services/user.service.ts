import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

// Constant
import { ConstantService } from './constant.service';

// Model
import { UserModel } from './../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // กำหนด header สำหรับ API
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  constructor(
    private http: HttpClient, 
    private constant: ConstantService
  ) { }

  // Method สำหรับการ Register
  Register(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(this.constant.baseAPIURL+'register', JSON.stringify(data), this.httpOptions)
  }

  // Method สำหรับการ Login
  Login(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(this.constant.baseAPIURL+'login', JSON.stringify(data), this.httpOptions)
  }

}
