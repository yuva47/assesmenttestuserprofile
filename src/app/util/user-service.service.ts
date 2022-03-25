import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as data from '../../assets/users.json';

export type user = {
  userId: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  img?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  users: user[] = [];
  defaultImage!: any;

  constructor(private _snackBar: MatSnackBar) {
    this.users = Array.from(data);
    this.defaultImage = this.users[0].img;
  }

  showToastMessage(message: string, type: number) {
    const duration = type ? 5000 : 2500;
    this._snackBar.open(message, 'X', { duration });
  }
}
