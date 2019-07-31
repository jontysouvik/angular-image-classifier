import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
  model: any;
  loading: boolean;
  imgSrc;
  title = 'angular-ml';
  predictions;
  constructor(private elRef:ElementRef) { }
  async  ngOnInit() {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
  }
  async fileChange(event) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        console.log(res)
        this.imgSrc = res.target.result;
        this.predictions = [];
      };
    }
  }
  ngAfterViewInit() {
    // var div = this.elRef.nativeElement.querySelector('.ml-img');
    // console.log(div);
  }
  ngAfterContentInit() {
    // var div = this.elRef.nativeElement.querySelector('div');
    // console.log(div);
  }
  predict(){
    console.log('Predict Clicked');
    setTimeout(async () => {
      this.predictions = await this.model.classify(this.elRef.nativeElement.querySelector('.ml-img'));
      console.log(this.predictions);
    });
  }
}
