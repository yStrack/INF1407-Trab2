import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Register } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  signUp = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  hide: {
    login: boolean,
    password: boolean,
    confirm: boolean,
  } = {
      login: true,
      password: true,
      confirm: true,
    };

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: MessageService,
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/agenda']);
    }
  }

  ngOnInit(): void {
    const p = this.signUp.get('password');
    if (p) {
      p.valueChanges.subscribe(val => {
        this.passwordMatchValidator(this.signUp);
      });
    }
    const c = this.signUp.get('confirmPassword');
    if (c) {
      c.valueChanges.subscribe(val => {
        this.passwordMatchValidator(this.signUp);
      });
    }
  }

  passwordMatchValidator(g: FormGroup): void {
    const confirm = g.get('confirmPassword');
    const password = g.get('password');
    if (password !== null && confirm !== null && password.value !== confirm.value && confirm.errors === null) {
      confirm.setErrors({ equals: true });
    } else {
      confirm?.setErrors(null);
    }
  }

  getErrorMessage(formGroup: FormGroup, formControlName: string): string {
    const form = formGroup.controls[formControlName];
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
    // console.log(user, user.value);
    if (user.valid) {
      const newUser: Register = {
        username: user.value.username,
        email: user.value.email,
        password: user.value.password,
      };

      this.authService.register(newUser).subscribe(res => {
        console.log('Sucesso', res);
        this.message.show('Usuário criado com sucesso', 'fechar', 'success');
      }, error => {
        this.message.show('Erro ao tentar cadastrar', 'fechar', 'danger');
      });
    } else {
      this.message.show('Conserte os erros', 'fechar', 'warn');
    }
  }

  login(user: FormGroup): void {
    // console.log(user, user.value);
    if (user.valid) {
      const userLogged: Login = {
        username: user.value.username,
        password: user.value.password,
      };

      this.authService.login(userLogged).subscribe(res => {
        console.log('Sucesso', res);
        this.router.navigate(['/agenda']);
      }, error => {
        this.message.show('Erro ao tentar logar', 'fechar', 'danger');
      });
    } else {
      this.message.show('Conserte os erros', 'fechar', 'warn');
    }
  }

}
