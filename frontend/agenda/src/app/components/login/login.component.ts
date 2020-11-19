import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

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
  }, passwordMatchValidator);

  hide: {
    hidePassword: boolean,
    hideConfirm: boolean,
  } = {
      hidePassword: true,
      hideConfirm: true,
    };

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
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
      return 'Precisa ser igual a senha original';
    } else {
      return '';
    }
  }

  register(user: FormGroup): void {
    console.log(user, user.value);
    if (user.valid) {
      const newUser: Register = {
        username: user.value.username,
        email: user.value.email,
        password: user.value.password,
      };

      this.authService.register(newUser).subscribe(res => {
        console.log('Sucesso', res);
      });
    }

  }

}

function passwordMatchValidator(g: FormGroup): null {
  const confirm = g.get('confirmPassword');
  const password = g.get('password');
  if (password !== null && confirm !== null && password.value !== confirm.value && confirm.errors === null) {
    confirm.setErrors({ equals: true });
  }
  return null;
}
