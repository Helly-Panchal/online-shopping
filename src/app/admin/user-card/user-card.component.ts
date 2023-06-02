import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user!: IUser;
  public updatedId!: string | null;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  editUser(user: IUser) {
    const dialogRef = this.dialog.open(EditUserFormComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.updatedId = user.id;
        if (res != undefined) {
          this.userService.updateUser(this.updatedId, {
            name: res.userName,
            role: res.userRole,
          });
        }
      },
    });
  }

}
