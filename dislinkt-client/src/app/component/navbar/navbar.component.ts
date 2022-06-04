import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor() { }

  ngOnInit(): void {
    if (getCookie("token") !== "") this.isAuthenticated = true;
  }

  signOut(): void {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

}

function getCookie(cookieName: string) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
