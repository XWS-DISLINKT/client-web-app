import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/profile';
import { ConnectionService } from 'src/app/service/connection-service/connection.service';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {
  private id: any;
  private connectionsId: string[];
  connections: Profile[] = [];
  numberOfConnections: number = 0;

  constructor(private _connectionService: ConnectionService,
              private _profileService: ProfileService,
              private _router: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this.getConnections(this.id);
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
          this.numberOfConnections = this.connections.length;
        }
      )
    }
  }

  openChat(id: string): void {
    this._router.navigate(['/messages/' + id]);
  }

}
