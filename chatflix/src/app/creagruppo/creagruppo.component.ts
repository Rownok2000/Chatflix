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

    let g = new group(nome.value, desc.value, Number(num.value), 0);

    this.obsgroup = this.groupservice.group(g);
      this.obsgroup.subscribe((d) => {
        if (d['status'] == 'done') {
          console.log('Registrazione eseguita correttamente');
        let g = new group(nome.value, desc.value, Number(num.value), 0);
          g.currentNumber += 1
          this.groupservice.addNewGroup(g);
          window.location.href = "/home";
        } else if (d['status'] == 'existing_group'){
          console.log('Errore! Nome utente già registrato');
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
        }
      });
  }

}
