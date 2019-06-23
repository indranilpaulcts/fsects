import { Component, OnInit } from '@angular/core';
import { ListUserService } from './list-user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  ifAnyError: boolean;
  errorAlertMessage: string;
  fetchedRecords: any;

  constructor(private listUserService: ListUserService) {
    this.ifAnyError = false;
    this.errorAlertMessage = '';
  }

  ngOnInit() {
    this.listUserService.getAllUserDetails().subscribe(
      (data) => {
        if (data !== undefined) {
          this.fetchedRecords = data;
        } else {
          this.fetchedRecords = [];
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
      }
    );
  }

}
