import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    apiServiceObs: Observable<Object>;

  LoginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit(): void {
    let data = this.LoginForm.value;

    console.log(`Trying to log in ${data.username}...`);

    if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null) ) {
      console.log('Errore! Almeno un campo è vuoto');
    } else {
      this.apiServiceObs = this.api.login(data.username, data.password);
      this.apiServiceObs.subscribe((data) => {
        if (data['status'] == 'done') {
          console.log('accesso eseguito correttamente');
        } else if (data['status'] == 'Utente non registrato'){
          console.log('Errore! Nome utente non registrato');
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
        }
      });

    }

    this.LoginForm.reset();
  }

}
