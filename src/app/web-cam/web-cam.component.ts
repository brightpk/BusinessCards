import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam/src/app/modules/webcam/domain/webcam-image';
import { WebcamInitError } from 'ngx-webcam/src/app/modules/webcam/domain/webcam-init-error';

import domtoimage from 'dom-to-image';
import { WebcamService } from '../services/webcam.service';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent implements OnInit {
  @Output() imageBase64 = new EventEmitter();
  @Output() textDetection = new EventEmitter();

  public webcamImage: WebcamImage = null;    // latest snapshot
  private trigger: Subject<void> = new Subject<void>();   // webcam snapshot trigger
  public errors: WebcamInitError[] = [];

  constructor(private webcamService: WebcamService) { }

  ngOnInit() {
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
    const imgNode = document.getElementById('image');
    console.log(imgNode);
    domtoimage.toPng(imgNode)
    .then( (dataUrl: string) => {
      console.log('converting base64...');
      this.imageBase64.emit(dataUrl);
      this.webcamService.getData(dataUrl)
      .subscribe(res => {
        this.textDetection.emit(res);
      },
      (err) => {
        console.log(err);
      });

    }).catch( (e: any) => {
      console.log('SELECTED IMAGE BASE64 SOMETHING WENT WRONG');
      console.log(e);
    });
  }

}
