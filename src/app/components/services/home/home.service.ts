import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  name: string;
  email: string;
  salary: string;
  age: string;
}

export interface UserList extends Array<User> {}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  // get all users
  getUsers(): Observable<UserList> {
    return this.http.get<UserList>(`${this.apiUrl}users`);
  }
}
