import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar-backend',
  templateUrl: './sidebar-backend.component.html',
  styleUrls: ['./sidebar-backend.component.scss']
})
export class SidebarBackendComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signOut(){
    this.auth.logout()
  }

}
