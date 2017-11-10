import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Post } from "app/services/post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit {

  @Input() posts : Post[];

  constructor() { }

  ngOnInit() {
  }

}
