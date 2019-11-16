import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  private url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVision}`;

  constructor(private http: HttpClient) { }

  getData(imageBase64) {
    const parsedImage = imageBase64.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    return this.http.post(this.url,
      {
      requests: [{
        image: {
        content: parsedImage
        },
        features: [{
          type: 'TEXT_DETECTION'
        }]
      }]});
  }

}
