import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, delay, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  users : User[] = [];

  constructor(private http : HttpClient) { 
    this.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  login(email : string, password : string): Observable<boolean>{
    console.log(this.users)
    const user = this.users.find(u => u.email === email && u.password === password);
    if(user){
      const isLoggedIn = (email == user.email && password == user.password);
      console.log(isLoggedIn);
      localStorage.setItem('isLoggedIn', isLoggedIn ? "true" : "false");
      return of(isLoggedIn).pipe(delay(1000), tap(isLoggedIn => this.isLoggedIn = isLoggedIn));
    }else {
      return of(false);
    }
  }

  logout(){
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }

  saveUser(user : User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUsers(): Observable<User[]>{
    return this.http.get<any>(environment.host + "/users")
  }
}
