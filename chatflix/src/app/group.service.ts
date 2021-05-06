import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { group } from './group.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class GroupService {

  groupList: Array<group> = new Array<group>();

  obsGroup: Observable<Array<group>>

  private subject = new Subject<Array<group>>();

  baseUrl = `https://3000-moccasin-rook-qacfszfe.ws-eu03.gitpod.io/`;

  constructor(private http: HttpClient) { }

  subscribeToSubject() : Observable<Array<group>>
  {
    console.log("sottoscritto");
    return this.subject.asObservable();
  }


  getGroupList() : Array<group>
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
  addNewGroup(newgroup : group): void {
    this.groupList.push(newgroup);
    this.subject.next(this.groupList);
    console.log('ciao');
  }
  group(newgroup : group) {

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

