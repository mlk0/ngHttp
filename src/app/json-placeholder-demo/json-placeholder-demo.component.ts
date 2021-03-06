import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonPlaceholderService } from "app/services/json-placeholder.service";

import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/do';
import { Post } from "app/services/post";

@Component({
  selector: 'app-json-placeholder-demo',
  templateUrl: './json-placeholder-demo.component.html',
  styleUrls: ['./json-placeholder-demo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JsonPlaceholderDemoComponent implements OnInit {

  constructor(private jsonPlaceholderService: JsonPlaceholderService) { }

  postResults: Post[];
  isBusy: boolean;

  postToBeUpdated: Post;

  ngOnInit() {
    this.postToBeUpdated = new Post(0, 0, 'blab', 'hhhshhhs');
  }

  editSelectedPost(post: Post) {
    console.log(`selected post for editting : ${JSON.stringify(post)}`);
    this.postToBeUpdated = post;
  }

  removeDeletedPost(post: Post) {
    console.log(`JsonPlaceholderDemoComponent.removeDeletedPost - post : ${JSON.stringify(post)}`);
    if (this.postResults) {

      let indexOfTheFoundPost = this.postResults.findIndex((p: Post) => { return p.id == post.id && p.userId == post.userId });
      console.log(`indexOfTheFoundPost : ${indexOfTheFoundPost}`);

      if (indexOfTheFoundPost >= 0) {
        console.log(`deleting the existing post on index : ${indexOfTheFoundPost} with id : ${post.id} and userId : ${post.userId}`)
        //this.postResults[indexOfTheFoundPost] = post;
        this.postResults.splice(indexOfTheFoundPost, 1);

      }
      else {
        console.log(`unable to find the index for the deleted post with id : ${post.id}`)

      }
    }
  }

  displayNewOrUpdatedPost(post: Post) {
    console.log(`JsonPlaceholderDemoComponent.displayNewOrUpdatedPost - post : ${JSON.stringify(post)}`);
    if (this.postResults) {

      let indexOfTheFoundPost = this.postResults.findIndex((p: Post) => { return p.id == post.id && p.userId == post.userId });
      console.log(`indexOfTheFoundPost : ${indexOfTheFoundPost}`);

      if (indexOfTheFoundPost >= 0) {
        console.log(`updating the existing post on index : ${indexOfTheFoundPost} with id : ${post.id} and userId : ${post.userId}`)
        this.postResults[indexOfTheFoundPost] = post;
      }
      else {
        console.log(`adding the new post : with id : ${post.id}`)
        this.postResults.push(post);
      }
    }
    else {
      console.log(`the list of post was empty, adding the first post : with id : ${post.id}`)

      this.postResults = [post];
    }
  }

  getSinglePost(postId: number) {
    console.log(`postId : ${postId}`);
    this.isBusy = true;
    this.jsonPlaceholderService.getPost(postId).subscribe((r: Post[]) => {
      this.isBusy = false;
      this.postResults = r;
    });
  }
  getAllPosts() {

    this.isBusy = true;

    //.do is rxjs operator
    //in the prod builds the runtime exception is indicating that do is unknown operator as if rxjs was not imported
    //when in dev mode, the operator needs to be imported at least somewhere in the module/app but it seems that for prod, 
    //this will need to be specified everywhere if necessary
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
