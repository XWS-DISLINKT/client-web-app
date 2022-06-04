import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = isLoggedIn();
  }

  signOut(): void {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  openProfile(): void {
    this._router.navigate(['profile/' + localStorage.getItem("loggedId")]);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

}
