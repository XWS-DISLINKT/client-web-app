import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';
import { isLoggedIn } from 'src/app/service/authentication-service/auth-service';
import { ConnectionService } from 'src/app/service/connection-service/connection.service';
import { RequestDTO } from 'src/app/dto/requestDTO';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public searchText: string = "";
  public profiles: Profile[] = [];
  public results: number = 0;
  isAuthenticated = false;
  private id: any;
  private connections: Profile[] = [];
  private connectionsId: string[];
  private blockedConnectionsId: string[];

  different: Profile[] = [];
  
  private requestDTO: RequestDTO = {
    requestSenderId: "",
    requestReceiverId: ""
  }

  constructor(private _profileService: ProfileService,
              public _router: Router,
              private _connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.isAuthenticated = isLoggedIn();
    this.id = localStorage.getItem("loggedId");
    this.getBlockedConnections(this.id);
    this.getPublicProfiles();
  }

  connect(requestSenderId: string, isPrivate: boolean): void {
    this.requestDTO.requestReceiverId = requestSenderId;
    this.requestDTO.requestSenderId = this.id;
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

  getPublicProfiles(): void {
    this._profileService.getPublicProfiles().subscribe(
      response => {
        if (this.isAuthenticated === true) {
          for (let i = 0; i < response.length; i++) {
            if (this.blockedConnectionsId.length > 0) {
              for (let j = 0; j < this.blockedConnectionsId.length; j++) {
                if (response[i].id !== this.blockedConnectionsId[j]) {
                  this.profiles.push(response[i])
                } 
              }
            } else {
              this.profiles.push(response[i]);
            }
          }
        } else {
          this.profiles = response;
        }
        this.results = this.profiles.length;
      }
    )
  }

  searchProfiles(): void {
    if (this.searchText === "") {
      //this.getPublicProfiles();
    } else {
      this._profileService.searchProfiles(this.searchText).subscribe(
        response => {
          this.profiles = response.profiles;
        }
      )
    }
  }

  undoSearch(): void {
    this.searchText = "";
    this.getPublicProfiles();
  }

  viewFullProfile(id: string): void {
    this._router.navigate(['profile/' + id])
  }

  getBlockedConnections(userId: string): void {
    this._connectionService.getBlockedConnections(userId).subscribe(
      response => {
        this.blockedConnectionsId = response;
      }
    )
  }

  getConnections(userId: string): void {
    this._connectionService.getConnections(userId).subscribe(
      response => {
        this.connectionsId = response;
        this.getConnectionProfiles(response);
        
      }
    )
  }

  getConnectionProfiles(ids: string[]): void {
    for (let i = 0; i < ids.length; i++) {
      this._profileService.getProfile(ids[i]).subscribe(
        response => {
          this.connections.push(response);
        }
      )
    }
  }
}

function removeFromArray(arr: Profile[], value: any) {
  return arr.filter(function(ele) {
    return ele != value;
  });
}