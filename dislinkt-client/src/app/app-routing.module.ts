import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionRequestsComponent } from './component/connection-requests/connection-requests.component';
import { ConnectionsComponent } from './component/connections/connections.component';
import { FeedComponent } from './component/feed/feed.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'profile/id', component: ProfileComponent },
  { path: 'requests', component: ConnectionRequestsComponent },
  { path: 'connections', component: ConnectionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
