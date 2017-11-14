import { Injectable, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Post } from "app/services/post";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JsonPlaceholderService {

  serviceUrlPosts: string;

  constructor(private http: Http,
    @Inject('SERVICE_URL') private serviceUrl
  ) {

    this.serviceUrlPosts = `${this.serviceUrl}posts`;

  }


  getPost(postId?: number): Observable<Post[]> {

    let response: Observable<Post[]>;

    console.log(`getPostsUrl : ${this.serviceUrlPosts}`)

    let getResponse = this.http.get(this.serviceUrlPosts)
      .map((r: Response) => {

        let responsePosts = r.json();  //this has list of josons that represent individual posts
        console.log(`responsePosts :  ${responsePosts}`);

        let listOfPostInstnces: Post[];
        if (postId) {
          let p = responsePosts;
          let post = new Post(p.id, p.userId, p.title, p.body);
          listOfPostInstnces = [];
          listOfPostInstnces.push(post);
        }
        else {

          // that list of json posts needs to be transformed to Post[]
          listOfPostInstnces = responsePosts.map((p: any) => {
            let post = new Post(p.id, p.userId, p.title, p.body);
            return post;
          })

        }


        console.log(`listOfPostInstnce : ${listOfPostInstnces}`);
        return listOfPostInstnces;
      })

    response = getResponse;
    return response;
  }


  addPost(newPost: Post): Observable<Post> {

    let stringifiedReqPayload = JSON.stringify(newPost);

    let postResponse = this.http.post(
      this.serviceUrlPosts,
      JSON.stringify(newPost)
    ).map((r: Response) => {
      let post: Post;
      //console.log(r);
      console.log(`addPost Response.status : ${r.status}`);

      if (r.status == 201) {
        let responseJson = r.json();
        console.log(`addPost Response.json() : ${JSON.stringify(responseJson)}`);
        if (responseJson) {
          let addedPost: Post = new Post(responseJson.userId, responseJson.id, responseJson.title, responseJson.body);
          if (addedPost) {
            console.log(`addedPost : ${JSON.stringify(addedPost)} `)
            post = addedPost;
          }
        }
      }
      return post;
    })
    return postResponse;
  }

  updatePost(updatedPost: Post): Observable<Post> {
    let result: Observable<Post>;

    let stringifiedReqPayload = JSON.stringify(updatedPost);


    let serviceUrlPost = `${this.serviceUrlPosts}/${updatedPost.id}`

    let putResponse = this.http.put(serviceUrlPost,stringifiedReqPayload)
    .map((r:Response)=>{
      let post : Post;
      if(r.status == 200){
        let responseJson = r.json();
        console.log(`updatePost Response.json() : ${JSON.stringify(r.json()) }`)
        post = new Post(responseJson.userId, responseJson.id, responseJson.title, responseJson.body);
      }

      return post;
    });

    result = putResponse;
    return result;
  }


  deletePost(postToBeDeleted : Post) : Observable<boolean> {
    let result : Observable<boolean>;

    let serviceUrlPost = `${this.serviceUrlPosts}/${postToBeDeleted.id}`
    let deleteResponse = this.http.delete(serviceUrlPost).map((r:Response)=>{
        if(r.status == 200)
        {
          let responseJson = r.json();
          if(responseJson){
            console.log(`deletePost Response.json() : ${JSON.stringify(responseJson)}`);
          }
          return true;
        }
        return false;
    })

    result = deleteResponse;
    return result;
  }

}
