import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: {
    email: string,
    password: string,
    hidePassword: boolean,
  } = {
      email: '',
      password: '',
      hidePassword: true,
    };

  signup: {
    email: string,
    password: string,
    hidePassword: boolean,
    confirmPassword: string
    hideConfirm: boolean,
  } = {
      email: '',
      password: '',
      hidePassword: true,
      confirmPassword: '',
      hideConfirm: true,
    };

  constructor() { }

  ngOnInit(): void {
  }

}
