import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FeedComponent } from './component/feed/feed.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ConnectionRequestsComponent } from './component/connection-requests/connection-requests.component';
import { ConnectionsComponent } from './component/connections/connections.component';
import { AddExperienceComponent } from './modal/add-experience/add-experience.component';
import { AddEducationComponent } from './modal/add-education/add-education.component';
import { AddSkillComponent } from './modal/add-skill/add-skill.component';
import { AddInterestComponent } from './modal/add-interest/add-interest.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddBiographyComponent } from './modal/add-biography/add-biography.component';
import { EditExperienceComponent } from './modal/edit-experience/edit-experience.component';
import { EditEducationComponent } from './modal/edit-education/edit-education.component';
import { JobsComponent } from './component/jobs/jobs.component';
import { AddJobComponent } from './modal/add-job/add-job.component';
import { DisplayConnectionTokenComponent } from './modal/display-connection-token/display-connection-token.component'; 
import { LinkyModule } from 'angular-linky';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { NotificationSettingsComponent } from './modal/notification-settings/notification-settings.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MessagesComponent } from './component/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    FeedComponent,
    ProfilesComponent,
    ProfileComponent,
    ConnectionRequestsComponent,
    ConnectionsComponent,
    AddExperienceComponent,
    AddEducationComponent,
    AddSkillComponent,
    AddInterestComponent,
    AddBiographyComponent,
    EditExperienceComponent,
    EditEducationComponent,
    JobsComponent,
    AddJobComponent,
    DisplayConnectionTokenComponent,
    NotificationsComponent,
    NotificationSettingsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSlideToggleModule,
    LinkyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddExperienceComponent]
})
export class AppModule { }
