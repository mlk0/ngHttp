import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-simple-sample-http',
  templateUrl: './simple-sample-http.component.html',
  styleUrls: ['./simple-sample-http.component.css']
})
export class SimpleSampleHttpComponent implements OnInit {

  serviceResponse: any;
  isLoading: boolean;

  constructor(private http: Http,
    @Inject('SERVICE_URL') private serviceUrl
  ) { }

  ngOnInit() {
    this.isLoading = false;
  }

  callSingleItemResponse() {
    this.isLoading = true;

    let singleItemInResponseUrl = this.serviceUrl + 'posts/2';
    console.log(singleItemInResponseUrl);

    this.http.request(singleItemInResponseUrl).subscribe(
      (rsp: Response) => {

        this.serviceResponse = rsp.json();
        this.isLoading = false;

      }
    );


  }
  callService() {

    this.isLoading = true;

    this.http.request('http://jsonplaceholder.typicode.com/photos').subscribe(
      (res: Response) => {
        this.serviceResponse = res.json();
        this.isLoading = false;
      }
    );
  }


  getRandomPost(){

    this.isLoading = true;

    let randomNumber = Math.random();
    console.log(randomNumber);

    let randomNumberTimes100 = randomNumber * 100;
    console.log(randomNumberTimes100);

    let randomNumberTimes100WithoutDecimal = Math.trunc(randomNumberTimes100);
    console.log(randomNumberTimes100WithoutDecimal);
    
    
    let url = this.serviceUrl + `posts/${randomNumberTimes100WithoutDecimal}`
    console.log(url);
    
    this.http.request(url).subscribe(
      (rsp : Response) => {
        this.serviceResponse = rsp.json();
        this.isLoading = false;
      }
    );
  }



getUsers(){
  this.isLoading = true;
  let usersUrl = this.serviceUrl + 'users'
  this.http.request(usersUrl).subscribe(
    (response : Response) => {
      this.serviceResponse = response.json();
      this.isLoading = false;
    }
  );


}




getRandomUser(){
  this.isLoading = true;

  let randomUserId = Math.trunc(Math.random() * 10);
  while (randomUserId == 0) {
    console.log(`randomUserId was ZERO, we will have to retry this ... `)
    randomUserId = Math.trunc(Math.random() * 10);
  }

  console.log(`randomUserId : ${randomUserId}`)
  let url = this.serviceUrl + `users/${randomUserId}`
  console.log(`url : ${url}`);
  this.http.request(url).subscribe(
    (rsp : Response) => {
      
      this.isLoading = false;
      this.serviceResponse = rsp.json();
    
    }
  );

}


}
