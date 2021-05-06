import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
height = window.innerHeight;
messageList:  string[] = [];
username = localStorage.getItem('token');
@ViewChild("scroll") scroll : any;
  constructor(private socketService: SocketService) {
  }

  sendMessage(message: HTMLInputElement) {
    this.socketService.sendMessage(message.value, this.username);
    console.log("sent: " + message.value)
    message.value="";

  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: any) => {
        this.messageList.push(message.user + " : " + message.message);
        console.log("messagereceived: " + message)
        //this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
      });
  }
}
