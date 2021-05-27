import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mieigruppi',
  templateUrl: './mieigruppi.component.html',
  styleUrls: ['./mieigruppi.component.css']
})
export class MieigruppiComponent implements OnInit {
  username = localStorage.getItem('token');
  constructor() { }

  ngOnInit(): void {
  }
  logout(): void {
    localStorage.removeItem("token");
  }
}
