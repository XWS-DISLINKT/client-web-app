import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isPrivate: false
  }

  public passwordConfirm: string = "";

  constructor(private _authenticationService: AuthenticationService,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    if(this.isPasswordValid()) {
      this._authenticationService.signup(this.user).subscribe(
        response => {
          console.log(response);
          this._snackBar.open("Successfull registration!", "Close");
        },
        error => {
          this._snackBar.open("An error has ocurred. Please try again.", "Close");
        }
      )
    } else {
      this._snackBar.open("Passwords do not match! Please try again.", "Close");
    }
    this._router.navigate(['login']);
  }

  isPasswordValid(): boolean {
    return this.user.password === this.passwordConfirm ? true : false;
  }
}
