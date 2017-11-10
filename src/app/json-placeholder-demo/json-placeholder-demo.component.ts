import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonPlaceholderService } from "app/services/json-placeholder.service";

import 'rxjs/add/operator/switch';
import { Post } from "app/services/post";

@Component({
  selector: 'app-json-placeholder-demo',
  templateUrl: './json-placeholder-demo.component.html',
  styleUrls: ['./json-placeholder-demo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JsonPlaceholderDemoComponent implements OnInit {

  constructor(private jsonPlaceholderService: JsonPlaceholderService) { }

  postResults: any;
  isBusy: boolean;
  ngOnInit() {
  }

  getSinglePost(postId : number){
    console.log(`postId : ${postId}`);
    this.isBusy = true;
    this.jsonPlaceholderService.getPost(postId).subscribe((r:Post[])=>{
      this.isBusy = false;
      this.postResults = r;
    });
  }
  getAllPosts() {

    this.isBusy = true;

    let rest = this.jsonPlaceholderService.getPost().do((i: any) => { console.log(i) }).subscribe(
      (posts: Post[]) => {
        this.postResults = posts;
        this.isBusy = false;
      },
      (e: any) => {
        this.isBusy = false;
        console.log(`error : ${e}`)
      },
      () => { 
        this.isBusy = false;
        console.log(`just completed but this is not ok`)
      }
    );
  }

}
