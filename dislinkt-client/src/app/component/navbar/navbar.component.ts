import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;

  constructor(private _router: Router, private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.isAuthenticated = isLoggedIn();
    this.checkIsAdmin();
  }

  signOut(): void {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("loggedId");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  openProfile(): void {
    this._router.navigate(['profile/' + localStorage.getItem("loggedId")]);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  checkIsAdmin(): void {
    const id = localStorage.getItem("loggedId");
    if (id) {
      this._profileService.getProfile(id).subscribe(
        response => this.isAdmin = response.isAdmin
      )
    }
  }

}
