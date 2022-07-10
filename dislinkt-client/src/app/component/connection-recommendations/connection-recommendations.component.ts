import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/profile';
import { ConnectionService } from 'src/app/service/connection-service/connection.service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';
import { RequestDTO } from 'src/app/dto/requestDTO';

@Component({
  selector: 'app-connection-recommendations',
  templateUrl: './connection-recommendations.component.html',
  styleUrls: ['./connection-recommendations.component.css']
})
export class ConnectionRecommendationsComponent implements OnInit {
  
  public searchText: string = "";
  public profiles: Profile[] = [];
  public results: number = 0;
  isAuthenticated = false;
  private userId: any;
  
  private requestDTO: RequestDTO = {
    requestSenderId: "",
    requestReceiverId: ""
  }

  constructor(private _profileService: ProfileService,
              public _router: Router,
              private _connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.isAuthenticated = isLoggedIn();
    this.userId = localStorage.getItem("loggedId");
  }
  viewFullProfile(id: string): void {
    this._router.navigate(['profile/' + id])
  }
  connect(requestSenderId: string, isPrivate: boolean): void {
    this.requestDTO.requestReceiverId = requestSenderId;
    this.requestDTO.requestSenderId = this.userId;
    if (isPrivate) {
      this._connectionService.makeConnectionRequest(this.requestDTO).subscribe(
        response => {
          console.log(response);
        }
      )
    } else {
      this._connectionService.makeConnection(this.requestDTO).subscribe(
        response => {
          console.log(response);
        }
      )
    }
  }

}
