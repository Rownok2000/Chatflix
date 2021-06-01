import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { CreagruppoComponent } from './creagruppo/creagruppo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from './group.service';
import { MieigruppiComponent } from './mieigruppi/mieigruppi.component';

const config: SocketIoConfig = { url: 'https://3100-lime-tern-q6jyna1n.ws-eu08.gitpod.io', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ChatComponent,
    CreagruppoComponent,
    MieigruppiComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NgbModule,
  ],
  providers: [SocketService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
