import { Component, OnInit } from '@angular/core';
import { group } from '../group.model';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-creagruppo',
  templateUrl: './creagruppo.component.html',
  styleUrls: ['./creagruppo.component.css']
})
export class CreagruppoComponent implements OnInit {
  username = localStorage.getItem('token');
  obsgroup: Observable<Object>;
  constructor(private groupservice: GroupService) {
  }

  ngOnInit() {

   }


  onSubmit(nome : HTMLInputElement, desc: HTMLInputElement, num : HTMLInputElement)
  {

    let g = new group(nome.value, desc.value, Number(num.value));
    this.groupservice.addNewGroup(g);
    this.obsgroup = this.groupservice.group(nome.value, desc.value, Number(num.value));
      this.obsgroup.subscribe((g) => {
        if (g['status'] == 'done') {
          console.log('Registrazione eseguita correttamente');
        } else if (g['status'] == 'existing_group'){
          console.log('Errore! Nome utente già registrato');
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
        }
      });
  }

}
