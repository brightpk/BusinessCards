import { Businesscard } from './../models/businesscard.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  private url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVision}`;
  businessCard = new Businesscard();

  constructor(private http: HttpClient) { }

  getTextDetection(imageBase64) {
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

  getDataFields(textDetection): Businesscard {
    const obj = textDetection.responses[0].textAnnotations;
    const len = obj.length;
    const numbers = /\d/;
    const upperCase = /^[A-Z]/;
    const lowerCase = /^[a-z]/;
    let indexCom = 0;
    let indexFname = 0;
    // console.log(obj);

    if (obj[0].description.includes('Company') || obj[0].description.includes('company') ||
        obj[0].description.includes('Organization') || obj[0].description.includes('organization') ||
        obj[0].description.includes('University') || obj[0].description.includes('university')) {
          for (let i = 1; i < len; i++) {
            const info = obj[i].description;
            if (info.includes('@')) {
              this.businessCard.email = info;
            } else if (numbers.test(info)) {
              this.businessCard.phoneNumber = info;
            } else if (info.includes('Company') || info.includes('company') ||
                        info.includes('Organization') || info.includes('organization') ||
                        info.includes('University') || info.includes('university')) {
                          this.businessCard.company = `${obj[i - 1].description} ${info}`;
                          indexCom = i;
                          // console.log(indexCom);
            } else if (upperCase.test(info.charAt(0)) && i > 1 && i === indexCom + 1) {
              // console.log(`i = ${i} indexCom = ${indexCom}`);
              this.businessCard.firstname = info;
              indexFname = i;
            } else if (upperCase.test(info.charAt(0)) && i === indexFname + 1) {
              this.businessCard.lastname = info;
            }
          }
    } else {
      for (let i = 1; i < len; i++) {
        const info = obj[i].description;
        if (info.includes('@')) {
          this.businessCard.email = info;
        } else if (numbers.test(info)) {
          this.businessCard.phoneNumber = info;
        } else if (i === 1) {
          this.businessCard.firstname = info;
          indexFname = i;
        } else if (i === indexFname + 1) {
          this.businessCard.lastname = info;
        }
      }
    }

    return this.businessCard;

  }

}
