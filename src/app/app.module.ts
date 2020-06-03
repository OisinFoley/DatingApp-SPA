import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { TimeAgoPipe } from 'time-ago-pipe';

import { appRoutes } from './routes';
import { NavComponent } from './nav/nav/nav.component';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error-interceptor';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './register/register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChangesGuard } from './_guard/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { ResolverHelper } from './_resolvers/resolver-helper';
import { RegisterKnownAsComponent } from './register/register/form/known-as/known-as.component';
import { RegisterDateOfBirthComponent } from './register/register/form/date-of-birth/date-of-birth.component';
import { RegisterGenderComponent } from './register/register/form/gender/gender.component';
import { RegisterCityComponent } from './register/register/form/city/city.component';
import { RegisterCountryComponent } from './register/register/form/country/country.component';
import { RegisterUsernameComponent } from './register/register/form/username/username.component';
import { RegisterPasswordComponent } from './register/register/form/password/password.component';
import { RegisterConfirmPasswordComponent } from './register/register/form/confirm-password/confirm-password.component';
import { MembersHelper } from './members/members-helper';
import { LearnMoreComponent } from './learn-more/learn-more.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

/*
   Needed to resolve an issue related to using NgxGallery in Angular 8+
   Issue still exists as of April 2020: https://github.com/lukasz-galka/ngx-gallery/issues/242
*/
export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      LearnMoreComponent,
      RegisterComponent,
      RegisterKnownAsComponent,
      RegisterDateOfBirthComponent,
      RegisterGenderComponent,
      RegisterCityComponent,
      RegisterCountryComponent,
      RegisterUsernameComponent,
      RegisterPasswordComponent,
      RegisterConfirmPasswordComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      MemberMessagesComponent,
      PhotoEditorComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthGuard,
      PreventUnsavedChangesGuard,
      AuthService,
      ResolverHelper,
      MembersHelper,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListsResolver,
      MessagesResolver,
      ErrorInterceptorProvider,
      /*
         Needed to resolve an issue related to using NgxGallery in Angular 8+
         Issue still exists as of April 2020: https://github.com/lukasz-galka/ngx-gallery/issues/242
      */
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
