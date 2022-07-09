import { Component, OnInit } from '@angular/core';
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
  constructor(private _profileService: ProfileService) { }

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

}
