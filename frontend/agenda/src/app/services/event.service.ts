import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.constants';
import { Event } from '../interfaces/event';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {

    constructor(private http: HttpClient) {
    }

    /**
     * Create an event with data provided.
     *
     */
    public createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(
            `${BASE_URL}/users/register-event/`, event
        );
    }

}
