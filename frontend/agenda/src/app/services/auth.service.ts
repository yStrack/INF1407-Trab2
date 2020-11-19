import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private http: HttpClient) { }

    /**
     * Creates a new user with data provided.
     *
     */
    public register(user: Register): Observable<User> {
        return this.http.post<User>(
            `${BASE_URL}/users/register`, user
        );
    }
}
