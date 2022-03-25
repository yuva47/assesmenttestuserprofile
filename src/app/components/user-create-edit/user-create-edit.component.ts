import { UserServiceService } from './../../util/user-service.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.sass'],
})
export class UserCreateEditComponent implements OnInit {
  form!: FormGroup;
  title: string = 'New User';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      userId: [this.userService.users.length + 1],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      lastName: ['', [Validators.minLength(1), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      cpassword: ['', [Validators.required, cPassword()]],
      img: [this.userService.defaultImage],
    });

    if (userId) {
      this.title = 'Edit User';
      const user = this.userService.users.find((x: any) => x.userId == userId);
      if (user) {
        this.form.patchValue({ ...user, cpassword: user.password });
      }
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.form.value.userId) {
      const user: any = this.userService.users.find(
        (x: any) => x.userId == this.form.value.userId
      );
      if (user) {
        for (let key in user) {
          user[key] = this.form.value[key];
        }
      } else {
        this.userService.users.push(this.form.value);
      }
    }

    this.userService.showToastMessage('Succesfully Created or Updated', 0);
    this.router.navigate(['/']);
  }

  onFileSelected(event: any) {
    var re = /(\.jpg|\.jpeg|\.png)$/i;
    const file = event.target.files[0];
    const size = file.size / 1000;
    if (size > 500) {
      this.userService.showToastMessage('Max Size 500 KB', 0);
      return;
    }

    if (!re.exec(file.name)) {
      this.userService.showToastMessage('Invalid Extension', 0);
      return;
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        const img = reader.result;
        this.form.patchValue({ img });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getError(controlName: string) {
    if (this.form.controls[controlName].errors?.['required']) {
      return 'Required';
    }

    if (this.form.controls[controlName].errors?.['maxlength']) {
      return (
        'Max Length' +
        this.form.controls[controlName].errors?.['maxlength'].requiredLength
      );
    }

    if (this.form.controls[controlName].errors?.['minlength']) {
      return (
        'Min Length' +
        this.form.controls[controlName].errors?.['minlength'].requiredLength
      );
    }

    if (this.form.controls[controlName].errors?.['password']) {
      return 'Password Mismatch';
    }
    if (this.form.controls[controlName].errors?.['email']) {
      return 'Invalid Email';
    }

    return '';
  }
}

function cPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.parent?.value.password != control.value);
    return control.parent?.value.password != control.value
      ? { password: { msg: 'Password doesnt Match' } }
      : null;
  };
}
