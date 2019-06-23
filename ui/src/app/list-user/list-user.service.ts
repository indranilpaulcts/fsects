import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {

  private uriBase: string;
  private apiGetUser: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5050/';
    this.apiGetUser = 'get-user/';
  }

  getAllUserDetails(){
    const fullUrl = this.uriBase + this.apiGetUser;
    return this.httpConnection.get(fullUrl);
  }
}
