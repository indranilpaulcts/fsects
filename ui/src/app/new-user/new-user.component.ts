import { Component, OnInit } from '@angular/core';
import { NewUserService } from './new-user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  firstName: string;
  lastName: string;
  ssoId: string;
  emailId: string;
  ifAnyError: boolean;
  errorAlertMessage: string;
  ifPostedSuccessfully: boolean;

  constructor(private newUserService: NewUserService) {
    this.firstName = '';
    this.lastName = '';
    this.ssoId = '';
    this.emailId = '';
    this.ifAnyError = false;
    this.errorAlertMessage = '';
    this.ifPostedSuccessfully = false;
  }

  ngOnInit() {
  }

  /**
   * This function reset the alert variables.
   * Invoked from submitUserDetails().
   */
  resetAlerts(): void {
    this.ifAnyError = false;
    this.errorAlertMessage = '';
    this.ifPostedSuccessfully = false;
  }

  /**
   * This function prepares the payload for 
   * user details & then invokes the postUserDetails 
   * service for a POST method.
   */
  submitUserDetails(): void {
    this.resetAlerts();
    const vPayload = {
      fname: this.firstName,
      lname: this.lastName,
      ssoid: this.ssoId,
      email: this.emailId,
    };
    this.newUserService.postUserDetails(vPayload).subscribe(
      (data) => {
        if (data) {
          this.ifPostedSuccessfully = true;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
      }
    );
  }

}
