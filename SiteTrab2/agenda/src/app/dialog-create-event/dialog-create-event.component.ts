import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.scss']
})
export class DialogCreateEventComponent implements OnInit {

  newEvent: {
    title: string,
    start: string,
    end: string,
    allDay: boolean,
  } = {
      title: '',
      start: '',
      end: '',
      allDay: true
    };

  constructor(
    public dialogRef: MatDialogRef<DialogCreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public date: any
  ) { }

  ngOnInit(): void {
    this.newEvent.start = this.date;
    // console.log(this.date);
  }

  close(): void {
    this.dialogRef.close();
  }
}
