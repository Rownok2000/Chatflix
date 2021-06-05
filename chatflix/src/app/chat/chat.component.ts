import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ApiService } from '../api.service';
import { GroupService } from '../group.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageList:  string[] = [];
  groupname : string;
  username = localStorage.getItem('token');
 lastmessage;
  routeObs: Observable<any>;
  constructor(public groupservice: GroupService, private socketService: SocketService, private route: ActivatedRoute, private router: Router, private api: ApiService) {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  sendMessage(message: HTMLInputElement) {
    if (message.value != ""){
      this.api.sendMessage(this.groupname, message.value).subscribe((data) => {
        console.log('Message saved on DB');
      });
      this.socketService.sendMessage(message.value, this.username, this.groupname);
      console.log("sent: " + message.value)
      message.value="";
    }
  }
  ngOnInit() {
    this.socketService.getMessageroom().subscribe((message: any)=>{
      this.messageList.push(message.user + " si è unito alla chat ");
    });

    this.api.getChatArchive(this.groupname).subscribe((data) => {
      let chat = data[0]['chat'];
      for(let i in chat){
        console.log(chat);
        this.messageList.push(chat[i].split('~')[0] + " : " + chat[i].split('~')[1]);
      }
    });

    this.socketService.getMessage()
      .subscribe((message: any) => {
        this.messageList.push(message.user + " : " + message.message);
        this.lastmessage = message;
        console.log("messagereceived: " + message)
      });

    this.api.groupName = this.groupname;
  }
   //leaveChat(){
     //this.socketService.leaveroom().subscribe((message: any)=>{
      //this.messageList.push(message.user + " ha lasciato la chat ");
    //});
   //}
   leaveGroup(){
    this.groupservice.leavewithgroupandusername(this.api.groupName, this.username).subscribe((data) => {
      console.log(data);
    });
  }
getRouterParam = (params: ParamMap) =>{
    this.groupname = params.get('group');
    this.socketService.changeGroup(this.groupname, localStorage.getItem("token"))
    //this.socketService.leaveGroup(this.groupname, localStorage.getItem("token"))
    console.log (this.groupname);
  }

}
