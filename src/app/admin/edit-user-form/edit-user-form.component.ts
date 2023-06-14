import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserFormComponent implements OnInit {
  public editUserForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser, public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.editUserForm = new FormGroup({
      id: new FormControl(this.data.id, Validators.required),
      userName: new FormControl(this.data.name, Validators.required),
      userRole: new FormControl(this.data.role, Validators.required)
    });
  }

  public editUser() {
    console.log(this.editUserForm.value);
    this.dialogRef.close(this.editUserForm.value);
  }

  public close() {
    this.dialogRef.close();
  }
}
