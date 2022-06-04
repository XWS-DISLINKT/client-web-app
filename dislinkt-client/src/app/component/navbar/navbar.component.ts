import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor() { }

  ngOnInit(): void {
    this.isAuthenticated = isLoggedIn();
  }

  signOut(): void {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

}
