import { Component, OnInit, Input } from '@angular/core';
import { YouTubeSearchResult } from 'app/youtube-video-browser/search-result';

@Component({
  selector: 'app-video-result',
  templateUrl: './video-result.component.html',
  styleUrls: ['./video-result.component.css']
})
export class VideoResultComponent implements OnInit {
  @Input() videoInfo : YouTubeSearchResult
  constructor() { }

  ngOnInit() {
  }

}
