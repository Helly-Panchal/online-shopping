import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { IUser } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  public userData!: IUser;
  public welcomeMessage: string = 'Welcome to Online Shopping..!!';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
  }

  public logout(): void {
    this.authenticationService.SignOut();
  }
}
