import {Component} from '@angular/core';
import {ContactService} from 'src/app/services/contact/contact.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
  selector: 'app-contact-page',
})
export class ContactPageComponent {
  submitted: boolean;
  loading: boolean;
  error: boolean;
  formModel: any;

  onSubmit() {
    if (this.loading || this.submitted) return;
    this.loading = true;
    this.error = false;

    setTimeout(() => {
      this.contactService
        .contact(
          this.formModel.name,
          this.formModel.email,
          this.formModel.order,
          this.formModel.message
        )
        .subscribe(
          () => {
            this.submitted = true;
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.error = true;
          }
        );
    }, 500);
  }

  constructor(private contactService: ContactService) {
    this.formModel = {name: '', email: '', order: '', message: ''};
    this.submitted = false;
    this.loading = false;
    this.error = false;
  }
}
