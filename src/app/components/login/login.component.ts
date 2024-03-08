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
  constructor(private formBuilder : FormBuilder, public authService : AuthService, private router : Router) { 
    this.userForm = this.formBuilder.group({
      email: [this.authService.getUser().email, [Validators.required, Validators.pattern('[a-zA-Z0-9.@]*')]],
      password: [this.authService.getUser().password, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get email(){
    return this.userForm.get('email');
  }

  get password(){
    return this.userForm.get('password');
  }

  onSaveUser(form : FormGroup){
    if(form.valid){
      const roles = this.authService.getRoleByEmail(form.value.email);
      this.authService.saveUser(new User(form.value.email, form.value.password, roles));
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
