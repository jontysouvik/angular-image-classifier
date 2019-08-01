import { Component, OnInit, ElementRef } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  model: any;
  loading: boolean;
  imgSrc: any;
  predictions: any[] ;
  constructor(private elRef:ElementRef) { }
  async  ngOnInit() {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
  }
  async fileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;
        this.predictions = [];
      };
    }
  }
  predict(){
    setTimeout(async () => {
      this.predictions = await this.model.classify(this.elRef.nativeElement.querySelector('.ml-img'));
    });
  }
}
