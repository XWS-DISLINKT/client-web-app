import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/model/message';
import { Notification } from 'src/app/model/notification';
import { Profile } from 'src/app/model/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private applicationURL = environment.applicationURL;
  
  constructor(private _http: HttpClient) { }

  getPublicProfiles(): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/profile");
  }

  searchProfiles(param: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/profile/search/" + param);
  }

  getProfile(id: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/profile/" + id);
  }

  updateProfile(id: string, updatedProfile: Profile): Observable<any> {
    return this._http.put<any>(this.applicationURL + "/profile/" + id, updatedProfile);
  }

  getNotificationsByUser(id: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/notification/user/" + id);
  }

  SeeNotificationsByUser(id: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/notification/see/user/" + id);
  }

  getChatMessages(senderId: string, receiverId: string): Observable<any> {
    return this._http.get<any>(this.applicationURL + "/message/" + senderId + "/" + receiverId);
  }

  sendMessage(messageDto: Message): Observable<any> {
    return this._http.post<any>(this.applicationURL + "/message", messageDto);
  }
}
