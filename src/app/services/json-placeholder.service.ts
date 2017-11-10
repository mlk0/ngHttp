import { Injectable, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Post } from "app/services/post";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

@Injectable()
export class JsonPlaceholderService {

  constructor(private http: Http,
    @Inject('SERVICE_URL') private serviceUrl
  ) { }


  getPost(postId?: number): Observable<Post[]> {
    let response: Observable<Post[]>;

    let getPostsUrl = `${this.serviceUrl}posts`;
    if (postId) {
      getPostsUrl = `${getPostsUrl}/${postId}`
    }


    console.log(`getPostsUrl : ${getPostsUrl}`)
    let getResponse = this.http.get(getPostsUrl)
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

}
