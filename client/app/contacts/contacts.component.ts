import { ToastComponent } from './../shared/toast/toast.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    contacts = [];
    isLoading = true;

    addContactForm: FormGroup;

    firstName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
    lastName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
    phoneNumber = new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\d\\s]*')]);
    emailAddress = new FormControl('', Validators.required);

    constructor(private contactService: ContactService,
        private http: Http,
        private formBuilder: FormBuilder,
        private toast: ToastComponent
    ) {

    }

    ngOnInit() {
        this.getContacts();
        this.addContactForm = this.formBuilder.group({
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress
        });
    }

    getContacts() {
        this.contactService.getContacts().subscribe(
            data => this.contacts = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addContact() {
        console.log(this.addContactForm.value);
        this.contactService.addContact(this.addContactForm.value).subscribe(
            res => {
                const newContact = res.json();
                this.contacts.push(newContact);
                this.addContactForm.reset();
                this.toast.setMessage('Contact added successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    addContactThroughDialog() {

    }

}
