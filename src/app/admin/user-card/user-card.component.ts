import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input() user!: IUser;

  public updatedId!: string | null;
  public editUserSubscription!: Subscription;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.editUserSubscription.unsubscribe();
  }

  editUser(user: IUser) {
    const dialogRef = this.dialog.open(EditUserFormComponent, {
      data: user,
    });
    this.editUserSubscription = dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.updatedId = user.id!;
        if (res != undefined) {
          this.userService.updateUser(this.updatedId!, {
            name: res.userName,
            role: res.userRole,
          });
        }
      },
    });
  }

}
