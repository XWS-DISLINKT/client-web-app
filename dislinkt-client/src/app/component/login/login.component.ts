import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/dto/loginDTO';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDTO: LoginDTO = {
    username: "",
    password: ""
  }

  constructor(private _authenticationService: AuthenticationService,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this._authenticationService.login(this.loginDTO).subscribe(
      response => {
        console.log(document.cookie);
        console.log(getCookie("token"));
        this._router.navigate(['/feed'])
        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      error => {
        this._snackBar.open("An error has ocurred. Please try again.", "Close");
      }
    )
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