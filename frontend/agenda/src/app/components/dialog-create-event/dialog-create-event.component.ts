import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message.service';

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

  newEvent = new FormGroup({
    title: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', []),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.newEvent.setValue({
      title: this.event.title ? this.event.title : '',
      start: this.event.start ? this.event.start : '',
      end: this.event.end ? this.event.end : '',
    });
    this.editing = this.event.title !== undefined;
    // console.log(this.newEvent);

    const s = this.newEvent.get('start');
    if (s) {
      s.valueChanges.subscribe(val => {
        this.dateValidator(this.newEvent);
      });
    }
    const e = this.newEvent.get('end');
    if (e) {
      e.valueChanges.subscribe(val => {
        this.dateValidator(this.newEvent);
      });
    }
  }

  dateValidator(g: FormGroup): void {
    const start = new Date(g.get('start')?.value);
    const endV = g.get('end');
    const end = new Date(endV?.value);
    if (start > end) {
      endV?.setErrors({ date: true });
    } else {
      endV?.setErrors(null);
    }
  }

  getErrorMessage(formGroup: FormGroup, formControlName: string): string {
    const form = formGroup.controls[formControlName];
    if (form.hasError('required')) {
      return 'Campo obrigatório';
    } else if (form.hasError('date')) {
      return 'Data de fim precisa ser maior que data de início';
    } else {
      return '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.newEvent.valid) {
      const newEvent: Event = {
        title: this.newEvent.value.title,
        start: this.newEvent.value.start,
        end: this.newEvent.value.end,
        allDay: true
      };
      this.dialogRef.close(newEvent);
    } else {
      this.message.show('Conserte os erros', 'fechar', 'warn');
    }
  }
}
