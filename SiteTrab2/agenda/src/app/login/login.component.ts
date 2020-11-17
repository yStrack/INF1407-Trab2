import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: {
    email: string,
    password: string
  } = {
      email: '',
      password: ''
    };

  signup: {
    email: string,
    password: string,
    confirmPassword: string
  } = {
      email: '',
      password: '',
      confirmPassword: ''
    };

  constructor() { }

  ngOnInit(): void {
  }

}
