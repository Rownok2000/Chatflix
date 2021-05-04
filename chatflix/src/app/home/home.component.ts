import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';
import { group } from '../group.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = localStorage.getItem('token');
  obs: Observable<Array<group>>;
  grouplist : Array<group>
  constructor(private groupservice: GroupService) {
    this.groupservice.getGroupList();
    this.obs = this.groupservice.subscribeToSubject();
    this.obs.subscribe(this.getnewlist);
  }

  ngOnInit() {

   }

   getnewlist = (lista : Array<group>) => {
    this.grouplist= lista;
    console.log(this.grouplist);
   }
}

