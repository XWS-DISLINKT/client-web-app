import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionRequestsComponent } from './component/connection-requests/connection-requests.component';
import { ConnectionsComponent } from './component/connections/connections.component';
import { FeedComponent } from './component/feed/feed.component';
import { JobsComponent } from './component/jobs/jobs.component';
import { LoginComponent } from './component/login/login.component';
import { MessagesComponent } from './component/messages/messages.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'requests', component: ConnectionRequestsComponent },
  { path: 'connections', component: ConnectionsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'messages/id', component: MessagesComponent },
  { path: 'jobs', component: JobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
