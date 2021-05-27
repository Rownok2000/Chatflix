import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mieigruppi',
  templateUrl: './mieigruppi.component.html',
  styleUrls: ['./mieigruppi.component.css']
})
export class MieigruppiComponent implements OnInit {
  getnewlist(getnewlist: any): any {
    throw new Error("Method not implemented.");
  }
  username = localStorage.getItem('token');
  grouplist: Array<Group>
  obs: Observable<Array<Group>>;
  obsgetmygroup: Observable<Object>;
  subscribe: any;
   results: any;
  constructor(public groupservice: GroupService, private api: ApiService) {
    this.groupservice.getGroupList();
    this.obs = this.groupservice.subscribeToSubject();
    this.subscribe = this.obs.subscribe(this.getnewlist);

  }

  ngOnInit() {
    this.grouplist = this.groupservice.getGroupList();

    this.obsgetmygroup = this.groupservice.getmyGroupsfromserver(this.username);
    this.obsgetmygroup.subscribe((data: any[]) => {
      this.grouplist = [];
      let i = 0;
      for (let d of data) {
        let g = new Group(d.name, d.desc, d.partecipanti, i);
        this.grouplist.push(g);
      }
      this.results = data; console.log(this.results);
    });
  }

  leaveGroup(){
    this.groupservice.leavewithgroupandusername(this.api.groupName, this.username).subscribe((data) => {
      console.log(data);
    });
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
