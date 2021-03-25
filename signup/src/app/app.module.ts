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


const config: SocketIoConfig = { url: 'https://3100-jade-dog-9k1p1loc.ws-eu03.gitpod.io', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
