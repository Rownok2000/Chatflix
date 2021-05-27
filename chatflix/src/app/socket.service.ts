import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Group } from './group.model';

@Injectable()
export class SocketService {

    constructor(private socket: Socket) { }

    sendMessage(msg: string, username: string, groupName){
        this.socket.emit("new-message", {message:msg, user:username, groupName: groupName});
    }

    changeGroup(groupName : string, username: string)
    {
       this.socket.emit("change-group", {groupName:groupName,  user:username});
    }

    leaveGroup(groupName : string, username: string)
    {
       this.socket.emit("leave-group", {groupName:groupName,  user:username});
    }

    newGroupcreated(newgroup : Group)
    {
       this.socket.emit("new-group-created", newgroup);
    }

     getMessage() : Observable<unknown> {
         return this.socket.fromEvent("resp-message");
    }
    getMessageroom() : Observable<unknown> {
         return this.socket.fromEvent("join-message");
    }
    leaveroom() : Observable<unknown> {
         return this.socket.fromEvent("leave-message");
    }
    getGroup() : Observable<unknown> {
         return this.socket.fromEvent("newGroup");
    }
}
