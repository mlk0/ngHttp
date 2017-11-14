import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PostValidators } from "app/post-management/post-validators";
import { JsonPlaceholderService } from "app/services/json-placeholder.service";
import { Post } from "app/services/post";

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostManagementComponent implements OnInit {

  fg: FormGroup;
  
  @Output() newOrUpdatedPost : EventEmitter<Post> = new EventEmitter<Post>();
  @Output() deletedPost : EventEmitter<Post> = new EventEmitter<Post>();
  
  @Input() postForUpdate : Post;

  constructor(private fb: FormBuilder, private postManagementService : JsonPlaceholderService) { 
   
  }

  formValidationErrors : string[] = [];

  ngOnInit() {
    this.postForUpdate = new Post(0,0,'','');
    var postTitleFormControl = this.fb.control(this.postForUpdate.title, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10), PostValidators.offensiveLanguage]));
    var postBodyFormControl = this.fb.control(this.postForUpdate.body, Validators.compose([Validators.required, PostValidators.offensiveLanguage]));

    this.fg = this.fb.group({
      'title': postTitleFormControl,
      'body': postBodyFormControl
    });


    
    this.fg.valueChanges.subscribe((v: any) => {
      
      this.formValidationErrors = []; //clear any previous info

      console.log(`fg.valid : ${this.fg.valid}`);
      Object.keys(this.fg.controls).forEach(key => {
        if (this.fg.controls[key].errors) {
          Object.keys(this.fg.controls[key].errors).forEach((errorKey) => {
            console.log(`key : ${key}, errorKey : ${errorKey}`);
            this.formValidationErrors.push(`formControlKey : ${key}, errorKey : ${errorKey}`);
          });
        }
      });
    });

  }


  onFormSubmit(fgValue: any) {

    console.log(fgValue);
    console.log(`this.fg.valid : ${this.fg.valid}`);

    let submittedPost : Post;
    
    submittedPost = new Post(this.postForUpdate.userId,this.postForUpdate.id,fgValue.title, fgValue.body);
    
    console.log(`newPost : ${JSON.stringify(submittedPost)}`);

    if(submittedPost.id == 0){
      this.postManagementService.addPost(submittedPost).
      subscribe(
        (post:Post)=>{
        
          console.log(`onFormSubmit added post.id : ${post.id}`);
          submittedPost.id = post.id;
      
          this.newOrUpdatedPost.emit(submittedPost);
          });     
    }
    else{
      
      //call to PUT
      
      this.postManagementService.updatePost(submittedPost)
      .subscribe((p:Post)=>{
        console.log(`onFormSubmit updated post.id : ${p.id}`);

        console.log(`onFormSubmit updated post : ${JSON.stringify(p)}`);

        //refreshing the post instance with the data that came from the server in order to keep the most updated version on the client 
        //submittedPost = p;
        //is a good idea as long as the server is responding with the full resource
        //in this case the response is returning only the id without the remaining set of properties
                
        
        this.newOrUpdatedPost.emit(submittedPost);
      });
      
      
    }

    
    
  }

  deletePost()
  {
    console.log(`deletePost with id : ${this.postForUpdate.id}`);
    this.postManagementService.deletePost(this.postForUpdate)
    .subscribe((postWasDeleted:boolean)=>{
      console.log(`deletePost postWasDelted : ${postWasDeleted}`);
      if(postWasDeleted){
        this.deletedPost.emit(this.postForUpdate);
      }
    })
    ;
  }

}
