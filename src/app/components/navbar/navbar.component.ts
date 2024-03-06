import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn = false;
  constructor() { }

  ngOnInit(): void {
    let storeData = localStorage.getItem('isLoggedIn');
    if(storeData != null && storeData == "true"){
      this.isUserLoggedIn = true;
      console.log(this.isUserLoggedIn);
    }else {
      this.isUserLoggedIn = false;
    }
  }

}