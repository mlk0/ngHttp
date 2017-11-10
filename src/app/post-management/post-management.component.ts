import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PostValidators } from "app/post-management/post-validators";

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostManagementComponent implements OnInit {
  fg: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    var postTitleFormControl = this.fb.control('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10), PostValidators.offensiveLanguage]));
    var postBodyFormControl = this.fb.control('', Validators.compose([Validators.required, PostValidators.offensiveLanguage]));

    // var postTitleFormControl = this.fb.control('',Validators.compose([Validators.required,  Validators.minLength(3),Validators.maxLength(10)]));
    // var postBodyFormControl = this.fb.control('',Validators.compose([Validators.required,  Validators.minLength(3),Validators.maxLength(10), PostValidators.offensiveLanguage]));


    this.fg = this.fb.group({
      'title': postTitleFormControl,
      'body': postBodyFormControl
    });


    this.fg.valueChanges.subscribe((v: any) => {
      console.log(`fg.valid : ${this.fg.valid}`);
      Object.keys(this.fg.controls).forEach(key => {
        if (this.fg.controls[key].errors) {
          Object.keys(this.fg.controls[key].errors).forEach((errorKey) => {
            console.log(`key : ${key}, errorKey : ${errorKey}`);
          });
        }
      });
    });

  }


  onFormSubmit(fgValue: any): void {
    //console.log(`fgValue : ${JSON.stringify(fgValue) }`);
    console.log(fgValue);
    console.log(`this.fg.valid : ${this.fg.valid}`)



  }

}
