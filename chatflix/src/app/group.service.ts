import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Group } from './group.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SocketService } from './socket.service';

@Injectable()
export class GroupService {

  groupList: Array<Group> = new Array<Group>();

  obsGroup: Observable<Array<Group>>

  private subject = new Subject<Array<Group>>();

  baseUrl = `https://3000-lavender-shrimp-2fpygce6.ws-eu07.gitpod.io/`;

  constructor(private http: HttpClient, private socketService: SocketService) {
    this.socketService.getGroup().subscribe((data : Group) => {
      this.groupList.push(data);
      console.log(data);
    })
   }

  subscribeToSubject() : Observable<Array<Group>>
  {
    console.log("sottoscritto");
    return this.subject.asObservable();
  }


  getGroupList() : Array<Group>
  {
    return this.groupList;
  }
  //provvisorio
  //getGroupListFromServer(): void {
    //this.obsGroup = this.http.get<Array<group>>('https://3000-blush-marlin-pe4or2ed.ws-eu04.gitpod.io/');
    //this.obsGroup.subscribe(this.saveGroupList);
  //}

  getGroupfromserver() {
    const url = `${this.baseUrl}gruppo`;
    let obsTracks = this.http.get(url);
    console.log(obsTracks);
    return obsTracks;
  }


  saveGroupList(saveGroupList: any) {
    this.groupList = saveGroupList;
    this.subject.next(this.groupList);
  }
  addNewGroup(newgroup : Group): void {
    this.groupList.push(newgroup);
    this.subject.next(this.groupList);
    console.log('ciao');
  }
  group(newgroup : Group) {

    let url = `${this.baseUrl}gruppo`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('name', newgroup.name);
    body = body.set('desc', newgroup.desc);
    body = body.set('partecipanti', `${newgroup.number}`);
    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }


}

