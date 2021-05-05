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

  baseUrl = `https://3000-violet-bug-5nstvae7.ws-eu03.gitpod.io/`;

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
  //fatto dal malizia
  getGroupListFromServer(): void {
    this.obsGroup = this.http.get<Array<group>>('https://3000-violet-bug-5nstvae7.ws-eu03.gitpod.io/');
    this.obsGroup.subscribe(this.saveGroupList);
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
  register(name: string, desc: string,partecipanti:number) {

    let url = `${this.baseUrl}gruppo`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('name', name);
    body = body.set('desc', desc);
    body = body.set('partecipanti', `${partecipanti}`);
    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing_user"
    console.log();

    return content;
  }


}

