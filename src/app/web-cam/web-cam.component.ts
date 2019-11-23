import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { WebcamImage } from 'ngx-webcam/src/app/modules/webcam/domain/webcam-image';
import { WebcamInitError } from 'ngx-webcam/src/app/modules/webcam/domain/webcam-init-error';

import domtoimage from 'dom-to-image';
import { WebcamService } from '../services/webcam.service';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent implements OnInit, OnDestroy {
  @Output() imageBase64 = new EventEmitter();
  @Output() textDetection = new EventEmitter();
  @Output() loading = new EventEmitter<boolean>();
  loadingPage: boolean;
  subscription: Subscription;

  public webcamImage: WebcamImage = null;    // latest snapshot
  private trigger: Subject<void> = new Subject<void>();   // webcam snapshot trigger
  public errors: WebcamInitError[] = [];

  constructor(private webcamService: WebcamService) { }

  ngOnInit() {
    this.loadingPage = false;
    this.subscription = new Subscription();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy web-cam');
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
    this.errors.push(error);
  }

  convertToBase64() {
    let subscription;
    this.loading.emit(true);
    const imgNode = document.getElementById('image');
    // console.log(imgNode);
    domtoimage.toPng(imgNode)
    .then( (dataUrl: string) => {
      console.log('converting base64...');
      this.imageBase64.emit(dataUrl);
      subscription = this.webcamService.getTextDetection(dataUrl)
      .subscribe(res => {
        this.textDetection.emit(res);
        this.loading.emit(false);
      },
      (err) => {
        console.log(err);
        this.loading.emit(false);
      });

    }).catch( (e: any) => {
      console.log('SELECTED IMAGE BASE64 SOMETHING WENT WRONG');
      // console.log(e);
      this.loading.emit(false);
    });

    this.subscription.add(subscription);
  }

}
