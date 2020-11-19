import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: {
    username: string,
    password: string,
    hidePassword: boolean,
  } = {
      username: '',
      password: '',
      hidePassword: true,
    };


  signUp = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  hide: {
    hidePassword: boolean,
    hideConfirm: boolean,
  } = {
      hidePassword: true,
      hideConfirm: true,
    };

  constructor() { }

  ngOnInit(): void {
  }

  passwordMatchValidator(g: FormGroup): ValidationErrors | null {
    const confirm = g.get('confirmPassword');
    const password = g.get('password');
    if (password !== null && confirm !== null) {
      return password.value === confirm.value
        ? null : { equals: true };
    }
    return null;
  }

  getErrorMessage(formControlName: string): string {
    const form = this.signUp.controls[formControlName];
    if (form.hasError('required')) {
      return 'Campo obrigatório';
    } else if (form.hasError('email')) {
      return 'Não é um email válido';
    } else if (form.hasError('minlength')) {
      return 'Senha tem que ter no mínimo 8 caracteres';
    } else if (form.hasError('equals')) {
      return 'Senha tem que ser igual';
    } else {
      return '';
    }
  }

}
