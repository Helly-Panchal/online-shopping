import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userData!: IUser;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    console.log(this.userData);

  }

  public logout(): void {
    this.authenticationService.SignOut();
  }
}
