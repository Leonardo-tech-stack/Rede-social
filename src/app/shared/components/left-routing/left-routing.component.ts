import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-routing',
  templateUrl: './left-routing.component.html',
  styleUrls: ['./left-routing.component.css']
})
export class LeftRoutingComponent implements OnInit{

  user: any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  userLink: string = "/profile"; 
  friendsLink: string = "/friends"; 
  savedLink: string = "/saved"; 
  likedLink: string = "/liked";

}
