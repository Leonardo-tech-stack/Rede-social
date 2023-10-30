import { Component, OnInit } from '@angular/core';
import User from 'src/app/shared/interfaces/user.interface';
import { FriendsService } from './friends.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: User[] = [];

  photo: string = '../../../assets/images/avatar.jpg';

  isLoading: boolean = false;
  loadingError: boolean = false;

  constructor(
    private friendsService: FriendsService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.loadingError = false;

    this.friendsService.getUsers()
    .pipe(
      take(1),
      finalize(() => this.isLoading = false)
    )
    .subscribe(
      response => this.onSuccess(response),
      error => this.onError(error),
    )
  }

  onSuccess(response: User[]) {
    this.users = response;
  }

  onError(error: any) {
    this.loadingError = true;
  }
}
