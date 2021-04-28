import { Component, OnInit } from '@angular/core';
import { group } from '../group.model';

@Component({
  selector: 'app-creagruppo',
  templateUrl: './creagruppo.component.html',
  styleUrls: ['./creagruppo.component.css']
})
export class CreagruppoComponent implements OnInit {
  username = localStorage.getItem('token');
  constructor() { }

  ngOnInit(): void {
  }

  /**onSubmit(nome : HTMLInputElement, desc: HTMLInputElement, )
  {
    let g : group = new group(nome.value, desc.value);


  }**/

}
