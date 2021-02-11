import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/services/contact.service';
import { environment } from 'src/environments/environment';

import * as constants from 'src/app/constants/constants';

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

  okResponse: boolean;
  okMessage = "Merci, votre formulaire a bien été transmis. Nous y répondrons dans les plus brefs délais."

  errorResponse: boolean;
  errorMessage = `Désolé, votre formulaire n'a pu être transmis. Veuillez réessayer ultérieurement ou nous contacter directement à ${constants.emailRegistration}.`;

  ngOnInit(): void {

    this.okResponse = false;
    this.errorResponse = false;

    this.contactForm = this.formBuilder.group({
      "email": new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      "prenom": new FormControl('', [Validators.required]),
      "nom": new FormControl('', [Validators.required]),
      "ville": new FormControl(''),
      "entreprise": new FormControl(''),
      "message": new FormControl('', [Validators.required]),
      "consent": new FormControl(false)
    });
  }

  onSubmit() {
    this.okResponse = false;
    this.errorResponse = false;

    this.contactService.postMessage(this.contactForm.value).subscribe(
      response => {
        console.log(response);
        this.okResponse = true;
      },
      error => {
        console.log(error);
        this.errorResponse = true;
      }
    );

    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });

    this.contactForm.reset();
  }
}
