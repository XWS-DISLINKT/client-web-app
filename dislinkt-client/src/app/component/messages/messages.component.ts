import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/model/message';
import { ProfileService } from 'src/app/service/profile-service/profile.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private otherUserId: string;
  private currentUserId: any;
  name: string;
  lastName: string;

  message: Message = {
    id: "",
    text: "",
    date: new Date,
    seen: false,
    senderUsername: "",
    senderId: "",
    receiverUsername: "",
    receiverId: ""
  }

  messagesFromChat: Message[];

  constructor(private _activatedRoute: ActivatedRoute, 
              private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.otherUserId = this._activatedRoute.snapshot.url[1].path;
    this.currentUserId = localStorage.getItem("loggedId");
    this.loadNameAndLastName();
    this.loadChatMessages();
  }

  loadNameAndLastName(): void {
    this._profileService.getProfile(this.otherUserId).subscribe(
      response => {
        this.name = response.name;
        this.lastName = response.lastName;
      }
    )
  }

  SendMessage(): void {
    this.message.receiverId = this.otherUserId;
    this.message.senderId = this.currentUserId;
    this._profileService.sendMessage(this.message).subscribe(
      response => {
        console.log(response);
      }
    )
    window.location.reload();
  }

  loadChatMessages(): void {
    this._profileService.getChatMessages(this.currentUserId, this.otherUserId).subscribe(
      response => {
        console.log(response);
        this.messagesFromChat = response.messages;
      }
    )
  }

  determineMessageClass(index: number) {
    if (index === 0) {
      if (this.messagesFromChat[index].senderId === this.currentUserId) {
        return "current-user-first-message";
      } else {
        return "other-user-first-message";
      }
    } else {
      if (this.messagesFromChat[index].senderId === this.currentUserId) {
        if (this.messagesFromChat[index - 1].senderId === this.currentUserId) {
          return "current-user-message";
        } else {
          return "current-user-first-message";
        }
      } else {
        if (this.messagesFromChat[index - 1].senderId === this.currentUserId) {
          return "other-user-first-message";
        } else {
          return "other-user-message";
        }
      }
    }
  }

}
