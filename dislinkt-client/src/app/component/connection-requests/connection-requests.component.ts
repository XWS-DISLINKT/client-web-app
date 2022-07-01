import { Component, OnInit } from '@angular/core';
import { RequestDTO } from 'src/app/dto/requestDTO';
import { Profile } from 'src/app/model/profile';
import { ConnectionService } from 'src/app/service/connection-service/connection.service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-connection-requests',
  templateUrl: './connection-requests.component.html',
  styleUrls: ['./connection-requests.component.css']
})
export class ConnectionRequestsComponent implements OnInit {
  private id: any;
  connectionsId: string[];
  connectionRequests: Profile[] = [];
  numberOfRequests: number = 0;

  private requestDTO: RequestDTO = {
    requestSenderId: "",
    requestReceiverId: ""
  }

  constructor(private _connectionService: ConnectionService,
              private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this.getConnections(this.id);
  }

  getConnections(userId: string): void {
    this._connectionService.getRequests(userId).subscribe(
      response => {
        this.connectionsId = response;
        this.getConnectionRequestProfiles(response);
      }
    )
  }

  getConnectionRequestProfiles(ids: string[]): void {
    for (let i = 0; i < ids.length; i++) {
      this._profileService.getProfile(ids[i]).subscribe(
        response => {
          this.connectionRequests.push(response);
          this.numberOfRequests = this.connectionRequests.length;
        }
      )
    }
    
  }

  acceptRequest(requestSenderId: string): void {
    this.requestDTO.requestReceiverId = requestSenderId;
    this.requestDTO.requestSenderId = this.id;

    this._connectionService.approveRequest(this.requestDTO).subscribe(
      response => {
        console.log(response);
      }
    )

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  ignoreRequest(requestSenderId: string): void {

  }

}
