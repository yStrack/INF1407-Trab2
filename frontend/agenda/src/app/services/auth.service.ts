import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.constants';
import { Register, User, Login } from '../interfaces/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private http: HttpClient) { }

    /**
     * Login with the provided user.
     *
     */
    public login(user: Login): Observable<User> {
        return this.http.post<User>(
            `${BASE_URL}/users/login/`, user
        );
    }

    /**
     * Creates a new user with data provided.
     */
    public register(user: Register): Observable<User> {
        return this.http.post<User>(
            `${BASE_URL}/users/register/`, user
        );
    }
}
