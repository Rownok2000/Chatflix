import { Component, OnInit } from '@angular/core';
import { group } from '../group.model';

@Component({
  selector: 'app-creagruppo',
  templateUrl: './creagruppo.component.html',
  styleUrls: ['./creagruppo.component.css']
})
export class CreagruppoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**onSubmit(nome : HtmlInputElement, desc)
  {
    let g : group = new group(nome.value);


  }**/

}
