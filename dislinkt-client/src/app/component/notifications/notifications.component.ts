import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationSettingsComponent } from 'src/app/modal/notification-settings/notification-settings.component';
import { Notification } from 'src/app/model/notification';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private id: any;
  numberOfUnreadNotifications: number = 0;
  notifications: Notification[] = [];
  constructor(private _profileService: ProfileService,  public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("loggedId");
    this.getNotifications(this.id);
  }

  getNotifications(userId: string): void {
    this._profileService.getNotificationsByUser(userId).subscribe(
      response => {
        this.notifications = response.notifications.reverse();
        this.markNotificationAsRead(this.id);
        for (let notification of this.notifications){
          if(notification.seen == false){
            this.numberOfUnreadNotifications++;
          }
        }
      }
    )
  }
  markNotificationAsRead(userId: string): void {
    this._profileService.SeeNotificationsByUser(userId).subscribe(
      response => {
        //this.notifications = response;
      }
    )
  }
  getColor(seen: boolean){
    if(seen){
      return "background-color: #FFFFFF;";
    }
    return "background-color: #EEF3F8;"
  }
  openSettingsDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "notification-settings-modal";
    dialogConfig.height = "350px";
    dialogConfig.width = "30%";
    const modalDialog = this.matDialog.open(NotificationSettingsComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      location.reload()
    })
    
  }

}
