import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-backend',
  templateUrl: './header-backend.component.html',
  styleUrls: ['./header-backend.component.scss']
})
export class HeaderBackendComponent implements OnInit {

  // ตัวแปรเก็บข้อมูล profile
  userProfile = {
    "fullname":"",
    "username":"",
    "role":""
  }

  constructor(private auth: AuthService) {
    this.userProfile.fullname = this.auth.getUser()['fullname']
    this.userProfile.username = this.auth.getUser()['username']
    this.userProfile.role = this.auth.getUser()['role']
  }

  ngOnInit(): void {
  }

  signOut(){
    this.auth.logout()
  }

}
