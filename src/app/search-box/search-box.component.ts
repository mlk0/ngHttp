import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { YoutubeSearchService } from 'app/services/youtube-search.service';
import { YouTubeSearchResult } from 'app/youtube-video-browser/search-result';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor(private searchVideoService: YoutubeSearchService,
    private el: ElementRef) { }


  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>(); //setting the loading event to which the consumer needs to subscribe
  @Output() searchResult: EventEmitter<YouTubeSearchResult[]> = new EventEmitter<YouTubeSearchResult[]>(); //setting the saerchResult event that will emit the array of the YouTubeSearchResult instances

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement,'mousemove')
    .map((e:any)=>{
      //console.log(e);
      // console.log(`e.clientX : ${e.clientX}, e.clientY : ${e.clientY}`)
      // console.log(`e.screenX : ${e.screenX}, e.screenY : ${e.screenY}`)
      //console.log(`e.pageX : ${e.pageX}, e.pageY : ${e.pageY}`)
      return {
        X:e.pageX,
        Y:e.pageY
      }
    })
    .filter((i:any)=>{return ((i.X%2==0) && (i.Y%2==0)); }) //filter only the even coordinates
    .debounceTime(250)
    .subscribe((i:any)=>{console.log(i);});

    //setting the RxJs Observable stream of the 'keyup' event of the input element
    Observable.fromEvent(this.el.nativeElement, 'keyup')  //create an observable array out of the keyup event
      .map(
      (e: any) => {
        console.log(`e : ${e}`); 
        console.log(e); 
        console.log(`e.target : ${e.target}`);  
        console.log(`e.target.value : ${e.target.value}`);  
        return e.target.value
      }
      // e.target.value is shorthand for { return e.target.value; }
      // in typescript arrow functions, when there is a single statement this is an inplcit return
      ) // at this point the stream of events is transformed to a stream of strings
      .filter((searchString: string) => {
                console.log(`searchString : ${searchString} with searchString.length : ${searchString.length}`)
                return searchString.length > 3;}
              ) // at this point the stream of strings is filtered to only have string items with more than 3 characters
      .debounceTime(500) //debounceTime operator will discard any item in the stream that will come sooner than 500 ms
      .do((streamItem: string) => {
        console.log(`streamItem : ${streamItem}`);
        this.loading.emit(true);        

      }) //after each item (which at this point is a debounced, prior filtered stream item of type sting) the do method will emit the loading event


      //now the string will be used as a search argument to the youtube service
      //when invoked the youtube search service with the passed argument each time the response will be an array of youtube serach result items
      //effectively, each stream item of type string needs to be transformed to the array of youtube search result items
      .map((searchStringStreamItem: string) => {
        console.log(`searchStringStreamItem : ${searchStringStreamItem}`);
        return this.searchVideoService.searchVideos(searchStringStreamItem);
      }) //the map effectively returns Observable<YouTubeSearchResult[]>
      //and this is suitable for subscription but before subscribing ...
      .switch() //this has the effect to ignore everything but the last event

      .subscribe(

      //subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
      //the 3 arguments are 3 arrow functions

      (searchResult: YouTubeSearchResult[]) => {
        this.loading.emit(false);
        this.searchResult.emit(searchResult);
      }

      ,
      
      (error: any) => { 
        console.log(`subscribe has error : ${error}`);
        this.loading.emit(false);
      }
      
      ,
      
      () => {
        console.log(`subscribe in complete ...`);
        this.loading.emit(false);
      }

      )

    
  }

}
