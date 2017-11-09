import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { YouTubeSearchResult } from 'app/youtube-video-browser/search-result';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { YoutubeSearchService } from 'app/services/youtube-search.service';

 



@Component({
  selector: 'app-youtube-video-browser',
  templateUrl: './youtube-video-browser.component.html',
  styleUrls: ['./youtube-video-browser.component.css']
})
export class YoutubeVideoBrowserComponent implements OnInit {

  constructor(private http : Http, private videoSearchService : YoutubeSearchService) { }

  ngOnInit() {
  }

  searchResponse : any;

  searchVideos() : void {
    let searchString = "crazy dog";
    let searchResponse = this.videoSearchService.searchVideos(searchString);
    searchResponse.subscribe(
      (youTubeSearchResults : YouTubeSearchResult[]) => {
        this.searchResponse = youTubeSearchResults;
      }
    
  );
    
  
  }

  searchYouTybeVideos() : Observable<YouTubeSearchResult[]>  {
    let searchString = "crazy cat";
    let myYouTybeBrowserApiKey = "AIzaSyDN2oE5gGU-gb_UkbJw85UhCrC8aRIG-tY";
    
    let youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search"
    
    console.log(searchString);

    let searchParameters : string[];
    searchParameters = [
      `q=${encodeURI(searchString) }`,
      `key=${myYouTybeBrowserApiKey}`,
      'part=snippet',
      'type=video',
      'maxResults=10'
    ]


    console.log(`searchParameters : ${searchParameters}`);

    let searchQueryString = searchParameters.join('&');

    console.log(`searchQueryString : ${searchQueryString}`);


    let searchUrl = `${youtubeSearchUrl}?${searchQueryString}`;
    console.log(`searchUrl : ${searchUrl}`);


    //both of those return Observable<response>
    // let getResponse = this.http.get(searchUrl);
    // let response = this.http.request(searchUrl);


   //  let getResponse = this.http.get(searchUrl).map((r:Response)=>{});


    // let observableResponse = this.http.get(searchUrl);
    // let aa =  observableResponse.map((r:Response)=>{
    //   console.log(r);
    // });

    // console.log('bla');
    // let rrr =  this.http.get(searchUrl).map(
    //   (r:Response)=>
    //   {
    //     return (<any>r.json()).items
    //   });
    
    //   console.log(rrr);
    
    //   console.log('haha');
    
    // this.http.request(searchUrl).subscribe(
    //    (res : Response) => {
    //       this.searchResponse = res.json();

    //       let numberOfResults = (<any>res.json()).items.length;
    //       console.log(`numberOfResults : ${numberOfResults}`)


    //       var resultsInViewModel = (<any>res.json()).items.map(
    //         (item : any) => {

    //           // let mappedItem = new YouTubeSearchResult(
    //           //   item.id.videoId, 
    //           //   item.snippet.title,
    //           //   item.snippet.description,
    //           //   item.snippet.thumbnails.high.url,
    //           //   `https://www.youtube.com/watch?v=${item.id.videoId}`
    //           // );

    //           let mappedItem = new YouTubeSearchResult(
    //             {
    //               id : item.id.videoId,
    //               title : item.snippet.title,
    //               description : item.snippet.description,
    //               thumbnailUrl : item.snippet.thumbnails.high.url
    //             }
    //           );

         
    //         //  console.log(mappedItem);
              

    //           return mappedItem;

    //         } 
    //       );

    //       //console.log(`resultsInViewModel : ${resultsInViewModel}`);
    //       console.log(resultsInViewModel);

    //    }
    // );


    // return this.http.get(searchUrl)
    // .map((response: Response) => {
    //   return (<any>response.json()).items.map(item => {
    //     // console.log("raw item", item); // uncomment if you want to debug
    //     return new YouTubeSearchResult({
    //       id: item.id.videoId,
    //       title: item.snippet.title,
    //       description: item.snippet.description,
    //       thumbnailUrl: item.snippet.thumbnails.high.url
    //     });
    //   });
    // });




   let oo = this.http.get(searchUrl)
    .map((response: Response) => {
      
      // return (<any>response.json()).items.map(item => {
      //   // console.log("raw item", item); // uncomment if you want to debug
      //   return new YouTubeSearchResult({
      //     id: item.id.videoId,
      //     title: item.snippet.title,
      //     description: item.snippet.description,
      //     thumbnailUrl: item.snippet.thumbnails.high.url
      //   });
      // });

      //return response;
      //return response.json(); 

      //this.searchResponse = response;
      //this.searchResponse = response.json().items;

      
      let transformedResponse = (<any>response.json()).items.map(
        i=>{
            let ytubeSearchResponse = new YouTubeSearchResult(
              {
                id : i.id.videoId,
                title : i.snippet.title,
                description : i.snippet.description,
                thumbnailUrl : i.snippet.thumbnails.high.url
              }

            );

            return ytubeSearchResponse;
        }

      );


      return transformedResponse;


    });


    oo.subscribe((i)=>{console.log(i)});
    
return oo;

  }

}
