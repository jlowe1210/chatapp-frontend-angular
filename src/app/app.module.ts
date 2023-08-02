import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './Pages/Chat/Chat.component';
import { HomeComponent } from './Pages/Home/Home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatRouteGuard } from './Services/ChatRouteGuard';
import { SideBarComponent } from './Components/SideBar/SideBar.component';
import { TextAreaComponent } from './Components/TextArea/TextArea.component';
import { ChatDisplayComponent } from './Components/ChatDisplay/ChatDisplay.component';

const routes: Routes = [
  {
    path: 'angular',
    children: [
      { path: '', component: HomeComponent },
      { path: 'chat', component: ChatComponent, canActivate: [ChatRouteGuard] },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'angular' },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    SideBarComponent,
    TextAreaComponent,
    ChatDisplayComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [ChatRouteGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
