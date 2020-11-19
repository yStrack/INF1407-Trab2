import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventService } from 'src/app/services/event.service';
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
      // console.log(result);
      if (newEvent !== undefined) {
        this.eventService.createEvent({ title: newEvent.title, beginDate: newEvent.start, endDate: newEvent.end }).subscribe(e => {
          this.calendarComponent.getApi().addEvent(newEvent);
        });
      }
    });
  }

  handleEventClick(arg: any): void {
    const event = {
      start: arg.event.start,
      end: arg.event.end,
      title: arg.event.title
    };
    // console.log('event click! ', event);

    const dialogRef = this.dialog.open(DialogCreateEventComponent, { data: event });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result !== undefined) {
        if (result.delete) {
          arg.event.remove();
        } else {
          arg.event.setProp('title', result.title);
          arg.event.setStart(result.start);
          arg.event.setEnd(result.end);
        }
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
  }
}
