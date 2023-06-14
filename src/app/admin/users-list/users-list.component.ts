import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  public usersList!: IUser[];
  public isLoading: boolean = true;
  public isError: boolean = false;
  public getUserSubscription!: Subscription;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }

  public trackUser(index: number, element: any) {
    return element.id;
  }

  public getUsers(): void {
    this.isLoading = true;
    this.getUserSubscription = this.userService.getUsers().subscribe({
      next: (res) => {
        this.usersList = res;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      }
    })
  }
}
