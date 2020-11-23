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
     * Get the list os events of the current user.
     *
     */
    public getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(
            `${BASE_URL}/users/events/`
        );
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

    /**
     * Edit an event with data provided.
     *
     */
    public editEvent(event: Event): Observable<Event> {
        return this.http.put<Event>(
            `${BASE_URL}/users/events/${event.id}/`, event
        );
    }

    /**
     * Delete the event.
     *
     */
    public deleteEvent(eventId: string): Observable<void> {
        return this.http.delete<void>(
            `${BASE_URL}/users/events/${eventId}`
        );
    }

}
