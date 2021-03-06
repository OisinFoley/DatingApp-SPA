import { Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChangesGuard } from './_guard/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { HomeGuard } from './_guard/home.guard';

export const appRoutes: Routes = [
  { path: 'home', canActivate: [HomeGuard], component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent,
          resolve: { users: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent,
          resolve: { user: MemberDetailResolver } },
      { path: 'member/edit', component: MemberEditComponent,
          resolve: { user: MemberEditResolver },
          canDeactivate: [PreventUnsavedChangesGuard] },
      { path: 'messages', component: MessagesComponent,
          resolve: { messages: MessagesResolver }},
      { path: 'lists', component: ListsComponent,
          resolve: { users: ListsResolver } }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
