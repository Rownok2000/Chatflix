import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  apiServiceObs: Observable<Object>;

  LoginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  login(): void {
    let data = this.LoginForm.value;
    console.log(data);
    console.log(`Trying to log in ${data.username}...`);

    if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null)) {
      console.log('Errore! Almeno un campo è vuoto');
      alert("Errore! Almeno un campo è vuoto");
    } else {
      this.apiServiceObs = this.api.login(data.username, data.password);
      this.apiServiceObs.subscribe(this.checkLogin,);
      localStorage.setItem('token', data.username);
    }

    this.LoginForm.reset();
  }


  checkLogin = (data: any) => {

    if (data['logged'] == true) {
      console.log('accesso eseguito correttamente');
      window.location.href = "/home";
    } else if (data['logged'] == false) {
      console.log('Errore! Nome utente non registrato o username/password errata');
      alert("Errore! Nome utente non registrato o username/password errata");
    }

  }

}
