import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
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
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
  };

  handleDateClick(arg: any): void {
    // alert('date click! ' + arg.dateStr);
    const dialogRef = this.dialog.open(DialogCreateEventComponent, { data: arg.dateStr });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.calendarComponent.getApi().addEvent(result);
    });
  }

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }
}
