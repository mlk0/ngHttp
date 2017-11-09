import { Injectable, Inject } from '@angular/core';
import { YouTubeSearchResult } from 'app/youtube-video-browser/search-result';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class YoutubeSearchService {

  constructor(
    @Inject('YOUTUBE_BROWSER_API_KEY') private apiKey : string,
    @Inject('YOUTUBE_SEARCH_URL') private searchUrl :string,
    private http : Http
    ) 
    { 

    }

    searchVideos(searchString : string) : Observable<YouTubeSearchResult[]>{
      let response : Observable<YouTubeSearchResult[]>;



      let searchStringParameters : string[];
      searchStringParameters = [
        `q=${encodeURI(searchString)}`,
        `key=${this.apiKey}`,
        'part=snippet',
        'type=video',
        'maxResults=10'
      ];
      
      let urlQueryString : string = searchStringParameters.join('&');
      console.log(`urlQueryString : ${urlQueryString}`);

      let fullUrl = `${this.searchUrl}?${urlQueryString}`;
      console.log(`fullUrl : ${fullUrl}`);

      let getResponse = this.http.get(fullUrl).map(
        (r:Response) => {
           let transformedArrayOfSearchResponses = (<any>r.json()).items.map(
             (item:any) => {
                let singleYouTubeSearchResponse = new YouTubeSearchResult(
                  {
                    id : item.id.videoId,
                    title : item.snippet.title,
                    description : item.snippet.description,
                    thumbnailUrl : item.snippet.thumbnails.high.url  
                  }
                );
                return singleYouTubeSearchResponse;
             }
           );
           return transformedArrayOfSearchResponses;
        }
      );
      
      response = getResponse;

      return response;
    }

}
