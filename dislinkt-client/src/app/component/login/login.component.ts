import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(): void {
    this._authenticationService.login(this.loginDTO).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this._snackBar.open("An error has ocurred. Please try again.", "Close");
      }
    )
  }

}
