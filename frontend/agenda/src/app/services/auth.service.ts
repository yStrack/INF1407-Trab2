import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../app.constants';
import { Register, User, Login } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const localUser = localStorage.getItem('currentUser');
        if (localUser !== null) {
            this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localUser));
        } else {
            this.currentUserSubject = new BehaviorSubject<User | null>(null);
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    /**
     * Login with the provided user.
     *
     */
    public login(user: Login): Observable<User> {
        return this.http.post<User>(
            `${BASE_URL}/users/login/`, user
        ).pipe(map(u => {
            localStorage.setItem('currentUser', JSON.stringify(u));
            this.currentUserSubject.next(u);
            return u;
        }));
    }

    public logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
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
