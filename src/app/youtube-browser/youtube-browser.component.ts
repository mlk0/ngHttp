import { Component, OnInit } from '@angular/core';
import { YouTubeSearchResult } from 'app/youtube-video-browser/search-result';

@Component({
  selector: 'app-youtube-browser',
  templateUrl: './youtube-browser.component.html',
  styleUrls: ['./youtube-browser.component.css']
})
export class YoutubeBrowserComponent implements OnInit {
  
  isSearching : boolean
  videoResults : any;
  constructor() { }

  ngOnInit() {
     }

  setLoading(isLoading : boolean){
    this.isSearching = isLoading;
  }
}
