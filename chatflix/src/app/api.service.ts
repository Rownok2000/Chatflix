import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  salt: string;
  groupName: string = '';

  baseUrl = `https://3000-cyan-cat-w2jp6t6q.ws-eu08.gitpod.io/`;

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    let pwd = shajs('sha256').update(password).digest('hex')
    let url = `${this.baseUrl}register`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('pwd', pwd);

    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing_user"
    console.log(pwd);

    return content;
  }

  login(username: string, password: string) {
    let pwd = shajs('sha256').update(password).digest('hex');
    console.log(pwd);
    let url = `${this.baseUrl}login`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    let body = new HttpParams();
    body = body.set('username', username);
    body= body.set('password', pwd);
    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing_user"

    return content;
  }

  sendMessage(groupname: string, message: string) {
    message = `${localStorage.getItem('token')}~${message}`;
    const url = `${this.baseUrl}chat/addMessage/${groupname}/${message}`;
    let obsTracks = this.http.get(url);
    return obsTracks;
  }

  getChatArchive(groupname: string) {
    const url = `${this.baseUrl}chat/get/${groupname}`;
    let obsTracks = this.http.get(url);
    return obsTracks;
  }

}
