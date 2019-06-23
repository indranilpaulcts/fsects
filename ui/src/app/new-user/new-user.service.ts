import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  private baseUri: string;
  private apiPostUser: string;

  constructor(private httpConnection: HttpClient) {
    this.baseUri = 'http://localhost:5050/';
    this.apiPostUser = 'add-user';
  }

  postUserDetails(pPayload: object) {
    const fullUrl = this.baseUri + this.apiPostUser;
    return this.httpConnection.post(fullUrl, pPayload);
  }
}
