import { Component } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  constructor(private authenticationService: AuthenticationService) { }

  public logout(): void {
    this.authenticationService.SignOut();
  }
}
