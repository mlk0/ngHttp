import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleSampleHttpComponent } from './simple-sample-http/simple-sample-http.component';
import { Constants } from 'app/services/constants';
import { YoutubeVideoBrowserComponent } from './youtube-video-browser/youtube-video-browser.component';
import { YoutubeSearchService } from 'app/services/youtube-search.service';
import { SearchBoxComponent } from './search-box/search-box.component';
import { YoutubeBrowserComponent } from './youtube-browser/youtube-browser.component';
import { VideoResultComponent } from './video-result/video-result.component';
import { JsonPlaceholderDemoComponent } from './json-placeholder-demo/json-placeholder-demo.component';
import { JsonPlaceholderService } from "app/services/json-placeholder.service";
import { PostListComponent } from './post-list/post-list.component';
import { PostManagementComponent } from './post-management/post-management.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleSampleHttpComponent,
    YoutubeVideoBrowserComponent,
    SearchBoxComponent,
    YoutubeBrowserComponent,
    VideoResultComponent,
    JsonPlaceholderDemoComponent,
    PostListComponent,
    PostManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: 'SERVICE_URL', useValue: Constants.jsonPlaceholderUrl },
    { provide: 'YOUTUBE_BROWSER_API_KEY', useValue: Constants.youTubeBrowserApiKey },
    { provide: 'YOUTUBE_SEARCH_URL', useValue: Constants.youtubeSearchUrl }
    ,YoutubeSearchService,
    JsonPlaceholderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
