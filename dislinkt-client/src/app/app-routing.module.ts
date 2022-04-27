import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './component/feed/feed.component';
import { LoginComponent } from './component/login/login.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'profiles', component: ProfilesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
