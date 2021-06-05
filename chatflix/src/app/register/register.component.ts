import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  apiServiceObs: Observable<Object>;

  registrationForm = this.formBuilder.group({
    username: '',
    password: '',
    confirmPassword: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  result = 0;

  onSubmit(): void {
    let data = this.registrationForm.value;

    console.log(`Trying to register ${data.username}...`);

    if (data.password != data.confirmPassword) {
      console.log('Errore! Le password non corrispondono');
      alert("Errore! Le password non corrispondono");
    } else if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null) || (data.confirmPassword == "") || (data.confirmPassword == null) ) {
      console.log('Errore! Almeno un campo è vuoto');
      alert("Errore! Almeno un campo è vuoto");
    } else {
      this.apiServiceObs = this.api.register(data.username, data.password);
      this.apiServiceObs.subscribe((data) => {
        if (data['status'] == 'done') {
          console.log('Registrazione eseguita correttamente');
          this.router.navigate([`../login`], { relativeTo: this.route });
        } else if (data['status'] == 'existing_user'){
          console.log('Errore! Nome utente già registrato');
          alert("Errore! Nome utente già registrato");
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
          alert("Errore! Risposta non prevista dal server registrazione");
        }
      });

    }

    this.registrationForm.reset();
  }

}
