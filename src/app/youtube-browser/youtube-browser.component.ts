import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-browser',
  templateUrl: './youtube-browser.component.html',
  styleUrls: ['./youtube-browser.component.css']
})
export class YoutubeBrowserComponent implements OnInit {
  
  isSearching : boolean

  constructor() { }

  ngOnInit() {
     }

  setLoading(isLoading : boolean){
    this.isSearching = isLoading;
  }
}
