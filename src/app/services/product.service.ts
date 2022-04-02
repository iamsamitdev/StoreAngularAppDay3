import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

// Constant
import { ConstantService } from './constant.service';

// Product Model 
import { ProductModel } from './../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // กำหนด header สำหรับ API
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer 1315|ptaOpfP5tALLlY980Z8GzhKENC7urgcCu8NSOTik'
    })
  }

  constructor(
    private http: HttpClient, 
    private constant: ConstantService
  ) { }

  // อ่านข้อมูล Product ทั้งหมด (Method GET)
  getProducts(): Observable<ProductModel>{
    return this.http.get<ProductModel>(this.constant.baseAPIURL+'products', this.httpOptions)
  }


}
