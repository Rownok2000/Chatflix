import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Observable, Subscription } from 'rxjs';
import { group } from '../group.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = localStorage.getItem('token');
  results: any;
  obs: Observable<Array<group>>;
  obsgetgroup : Observable<Object>;
  grouplist : Array<group>
  subscribe : Subscription = new Subscription();
  constructor(private groupservice: GroupService) {
    this.groupservice.getGroupList();
    this.obs = this.groupservice.subscribeToSubject();
    this.subscribe = this.obs.subscribe(this.getnewlist);
  }

  ngOnInit() {
      this.grouplist = this.groupservice.getGroupList();

    this.obsgetgroup = this.groupservice.getGroupfromserver();
    this.obsgetgroup.subscribe((data: any[]) => {

      let i =0;
      for (let d of data)
      {
        let g = new group(d.name, d.desc,d.partecipanti, i);
        this.grouplist.push(g);

      }
      this.results = data; console.log(this.results);
    });

   }

   getnewlist = (lista : Array<group>) => {
    this.grouplist= lista;
    console.log(this.grouplist);
   }



   ngOnDestroy(){
    this.subscribe.unsubscribe();
    console.log("unsub");
  }
}

