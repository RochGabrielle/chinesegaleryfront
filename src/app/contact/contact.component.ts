import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,} from '@angular/forms';
import { ContactService } from './../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  FormData: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactService) { }

  ngOnInit(): void {
    /* using validator TO DO
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
      })
      */
      this.FormData = this.builder.group({
        Fullname: new FormControl(''),
        visitorEmail: new FormControl(''),
        visitorMessage: new FormControl('')
        })
  }

  onSubmit(FormData) {
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
    }

}
