import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { AppComponent } from 'src/app/app.component';
import { EventService } from 'src/app/services/event.service';
import { MessageService } from 'src/app/services/message.service';
import { DialogCreateEventComponent } from '../dialog-create-event/dialog-create-event.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    buttonText: {
      today: 'Hoje',
    },
    height: '100%',
    fixedWeekCount: false,
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  handleDateClick(arg: any): void {
    // console.log('date click! ', arg);
    const dialogRef = this.dialog.open(DialogCreateEventComponent, { data: { start: arg.date } });

    dialogRef.afterClosed().subscribe(newEvent => {
      if (newEvent !== undefined) {
        this.eventService.createEvent({ title: newEvent.title, beginDate: newEvent.start, endDate: newEvent.end }).subscribe(e => {
          newEvent.id = e.id;
          // console.log(newEvent);
          this.calendarComponent.getApi().addEvent(newEvent);
        }, error => {
          this.message.show('Erro ao tentar criar evento', 'fechar', 'danger');
        });
      }
    });
  }

  handleEventClick(arg: any): void {
    // console.log('event click! ', arg.event.id);

    const dialogRef = this.dialog.open(DialogCreateEventComponent, { data: arg.event });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result !== undefined) {
        if (result.delete) {
          this.eventService.deleteEvent(arg.event.id).subscribe(e => {
            arg.event.remove();
          }, error => {
            this.message.show('Erro ao tentar deletar evento', 'fechar', 'danger');
          });
        } else {
          this.eventService.editEvent(
            {
              title: result.title,
              beginDate: result.start,
              endDate: result.end ? result.end : undefined,
              id: arg.event.id
            }).subscribe(e => {
              arg.event.setProp('title', result.title);
              arg.event.setStart(result.start);
              arg.event.setEnd(result.end);
            }, error => {
              this.message.show('Erro ao tentar editar evento', 'fechar', 'danger');
            });
        }
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private message: MessageService,
    private app: AppComponent,
  ) {
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      const eventList: EventFront[] = events.map(e => {
        return {
          start: e.beginDate, end: e.endDate === e.beginDate ? undefined : e.endDate,
          title: e.title, id: String(e.id), allDay: true
        };
      });
      // console.log('Lista', events, eventList);
      const apiCalendar = this.calendarComponent.getApi();
      eventList.forEach(e => {
        apiCalendar.addEvent(e);
      });
    });
  }

  logout(): void {
    this.app.logout();
  }
}

interface EventFront {
  start: string;
  end?: string;
  title: string;

  id?: string;
  allDay: boolean;
}
