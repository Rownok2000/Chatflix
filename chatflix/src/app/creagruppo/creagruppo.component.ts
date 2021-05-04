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

  grouplist : Array<group>
  obs: Observable<Array<group>>;
  constructor(private groupservice: GroupService) {
    this.obs = this.groupservice.subscribeToSubject();
  }

  ngOnInit() {

   }

   getnewlist = (lista : Array<group>) => {
    this.grouplist= lista;
   }

  onSubmit(nome : HTMLInputElement, desc: HTMLInputElement, num : HTMLInputElement)
  {

    let g = new group(nome.value, desc.value, Number(num.value));
    this.groupservice.addNewGroup(g);

  }

}
