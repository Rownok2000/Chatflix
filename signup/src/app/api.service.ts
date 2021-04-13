import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  salt: string;
  loggedin: boolean = false;

  baseUrl = `https://3000-magenta-wildcat-qmibeni5.ws-eu03.gitpod.io/`;

  constructor(private http: HttpClient) { }

  getSalt(): void {
   this.http.get('assets/salt.txt', { responseType: 'text' }).subscribe(data => this.salt = data);
  }

  register(username: string, password: string) {
    let pwd = bcrypt.hashSync(password, this.salt);

    let url = `${this.baseUrl}register`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('pwd', pwd);

    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing_user"
    console.log(content);

    return content;
  }

  login(username: string, password: string) {
    let url = `${this.baseUrl}login`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body1 = new HttpParams();
    body1 = body1.set('username', username);
    body1 = body1.set('pwd', password);

    let content = this.http.post(url, body1, { headers: myheader }); // result can be "done" or "existing_user"
    console.log(content);

    return content;
  }
}
