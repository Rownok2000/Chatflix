import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
height = window.innerHeight;
messageList:  string[] = [];
groupname : string;
username = localStorage.getItem('token');
@ViewChild("scroll") scroll : any;
routeObs: Observable<any>;
  constructor(private socketService: SocketService, private route: ActivatedRoute, private router: Router) {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  sendMessage(message: HTMLInputElement) {
    if (message.value != ""){
    this.socketService.sendMessage(message.value, this.username, this.groupname);
    console.log("sent: " + message.value)
    message.value="";
    }
  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: any) => {
        this.messageList.push(message.user + " : " + message.message);
        console.log("messagereceived: " + message)
      });
    this.socketService.getMessageroom().subscribe((message: any)=>{
      this.messageList.push(message.user + " si è unito alla chat ");
    })
  }
getRouterParam = (params: ParamMap) =>{
    this.groupname = params.get('group');
    this.socketService.changeGroup(this.groupname, localStorage.getItem("token"))
    console.log (this.groupname);

  }

}
