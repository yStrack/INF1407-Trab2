import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Event {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}
@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.scss']
})
export class DialogCreateEventComponent implements OnInit {

  editing = false;

  newEvent: Event = {
    title: '',
    start: '',
    end: '',
    allDay: true
  };

  constructor(
    public dialogRef: MatDialogRef<DialogCreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event
  ) { }

  ngOnInit(): void {
    this.newEvent.title = this.event.title;
    this.newEvent.start = this.event.start;
    this.newEvent.end = this.event.end;
    this.editing = this.event.title !== undefined;
    // console.log(this.newEvent);
  }

  close(): void {
    this.dialogRef.close();
  }
}
