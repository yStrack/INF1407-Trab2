import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {

    constructor(
        private snackBar: MatSnackBar) {
    }

    show(message: string, action: string, type: 'warn' | 'danger' | 'default' | 'success'): void {
        this.snackBar.open(message, action, {
            panelClass: type,
            duration: 3000
        });
    }

}
