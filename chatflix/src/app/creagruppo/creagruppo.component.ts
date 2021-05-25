import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-creagruppo',
  templateUrl: './creagruppo.component.html',
  styleUrls: ['./creagruppo.component.css']
})
export class CreagruppoComponent implements OnInit {
  username = localStorage.getItem('token');
  obsgroup: Observable<Object>;
  constructor(private groupservice: GroupService, private socketService: SocketService) {
  }

  ngOnInit() {

   }


  onSubmit(nome : HTMLInputElement, desc: HTMLInputElement, num : HTMLInputElement)
  {

    let g = new Group(nome.value, desc.value, Number(num.value), 0);

    this.obsgroup = this.groupservice.group(g);
    if ((nome.value != "") && (desc.value != "") && (num.value != "")){
    this.obsgroup.subscribe((d) => {
        if (d['status'] == 'done') {
          console.log('Registrazione eseguita correttamente');
        let g = new Group(nome.value, desc.value, Number(num.value), 0);
          g.currentNumber += 1
          this.groupservice.addNewGroup(g);
          this.socketService.newGroupcreated(g);
          //window.location.href = "/home";
        } else if (d['status'] == 'existing_group'){
          console.log('Errore! Nome utente già registrato');
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
        }
      });}
  }

}
