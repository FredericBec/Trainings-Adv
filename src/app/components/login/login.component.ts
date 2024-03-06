import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm : FormGroup
  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router) { 
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.@]*')]]
    });
  }

  ngOnInit(): void {
  }

  onSaveUser(form : FormGroup){
    if(form.valid){
      this.authService.saveUser(new User(form.value.email, form.value.password, []));
    }
  }

  onLogin(){
    this.onSaveUser(this.userForm);
    const val = this.userForm.value;

    if(val.email && val.password){
      this.authService.login(val.email, val.password).subscribe(() => {
        this.router.navigateByUrl('');
      });
    }
  }
}
