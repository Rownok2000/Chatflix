import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Observable, Subscription } from 'rxjs';
import { Group } from '../group.model';
import { SocketService } from '../socket.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = localStorage.getItem('token');
  results: any;
  obs: Observable<Array<Group>>;
  obsgetgroup: Observable<Object>;
  grouplist: Array<Group>
  subscribe: Subscription = new Subscription();

  constructor(public groupservice: GroupService,  private socketService: SocketService, private api: ApiService) {
    this.groupservice.getGroupList();
    this.obs = this.groupservice.subscribeToSubject();
    this.subscribe = this.obs.subscribe(this.getnewlist);

  }

  ngOnInit() {
    this.grouplist = this.groupservice.getGroupList();

    this.obsgetgroup = this.groupservice.getGroupfromserver();
    this.obsgetgroup.subscribe((data: any[]) => {
      this.grouplist = [];
      let i = 0;
      for (let d of data) {
        let g = new Group(d.name, d.desc, d.partecipanti, i);
        this.grouplist.push(g);
      }
      this.results = data; console.log(this.results);
    });
    this.socketService.getGroup().subscribe((data : Group) => {
      this.grouplist.push(data);
      console.log(data);
    });
  }


  logout(): void {
    localStorage.removeItem("token");
  }

  getnewlist = (lista: Array<Group>) => {
    this.grouplist = lista;
    console.log(this.grouplist);
  }


  setGroupName(name: string){
    this.api.groupName = name;
    this.groupservice.joinwithgroupandusername(this.api.groupName, this.username).subscribe((data) => {
      console.log(data);
    });
  }



  ngOnDestroy() {
    this.subscribe.unsubscribe();
    console.log("unsub");
  }

}

