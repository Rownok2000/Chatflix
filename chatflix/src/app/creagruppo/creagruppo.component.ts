import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert = {type: 'info', message: "In questa sezione puoi creare il tuo gruppo" };

@Component({
  selector: 'app-creagruppo',
  templateUrl: './creagruppo.component.html',
  styleUrls: ['./creagruppo.component.css']
})
export class CreagruppoComponent implements OnInit {
  alert: Alert;

  username = localStorage.getItem('token');
  obsgroup: Observable<Object>;
  constructor(private groupservice: GroupService, private socketService: SocketService) {
    this.reset();
  }

  ngOnInit() {

   }
  close(alert: Alert) {
    (this.alert, 1);
  }

  reset() {
    this.alert = ALERTS;
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
          this.groupservice.joinwithgroupandusername(nome.value, this.username).subscribe((data) => {
            console.log(data);
          });
          window.location.href = "/home";
        } else if (d['status'] == 'existing_group'){
          console.log('Errore! gruppo già esistente');
          alert("Errore! Gruppo già esistente");
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
          alert("Errore! Risposta non prevista dal server registrazione");
        }
      });}
  }
  logout(): void {
    localStorage.removeItem("token");
  }

}
