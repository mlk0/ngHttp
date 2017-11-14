import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { Post } from "app/services/post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit {

  @Input() posts : Post[];
  @Output() selectedPost : EventEmitter<Post> = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {
  }

  // editSelectedItem(id:number, userId:number)
  // {
  //   console.log(`selected Post.id : ${id} from Post.userId : ${userId}`);
  // }

  editSelectedItemX(post:Post){
    console.log(`selected post : ${JSON.stringify(post)}`);
    
    if(post){
      this.selectedPost.emit(post);
    }


  }
}
