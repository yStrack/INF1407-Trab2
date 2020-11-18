import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
  };

  handleDateClick(arg: any): void {
    alert('date click! ' + arg.dateStr);
  }

  constructor(
    // private modal: NgbModal
  ) { }
}
