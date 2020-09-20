import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/services/contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  contactForm: FormGroup;

  faPaperPlane = faPaperPlane;
  apiUrl: string = environment.apiUrl;
  photoUrl: string = this.apiUrl + "/uploads/contact_e684a6c3eb.jpg";

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      "email": new FormControl(null, [Validators.compose([Validators.required, Validators.email])]),
      "prenom": new FormControl(null, [Validators.required]),
      "nom": new FormControl(null, [Validators.required]),
      "ville": new FormControl(null, [Validators.required]),
      "entreprise": new FormControl(null),
      "message": new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.contactForm.value);

    this.contactService.postMessage(this.contactForm.value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
