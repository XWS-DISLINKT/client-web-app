import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationSettingsDto } from 'src/app/model/notification-settings-dto';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {
  private id: any;
  profile: Profile = {
    id: "",
    name: "",
    lastName: "",
    email: "",
    username: "",
    biography: "",
    isPrivate: false,
    education: [],
    skills: [],
    interests: [],
    experience: [],
    receivesMessageNotifications: false,
    receivesPostNotifications: false,
    receivesConnectionNotifications: false,
    isAdmin: false
  }
  public message: boolean = true;
  public post: boolean = true;
  public connection: boolean = true;
  
  constructor(private _profileService: ProfileService, public dialogRef: MatDialogRef<NotificationSettingsComponent>) {

  }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this._profileService.getProfile(this.id).subscribe(
      response => {
        this.profile = response;
        
      }
    )
  }


  onSubmit() {
    let nsd :  NotificationSettingsDto = {id: this.id, receivesConnectionNotifications: this.connection, receivesMessageNotifications: this.message, receivesPostNotifications: this.post}
    this._profileService.changeNotificationSettings(nsd).subscribe(
      response => {
        console.log(response);
      }
      
    )
    
    this.dialogRef.close()
  }
}
