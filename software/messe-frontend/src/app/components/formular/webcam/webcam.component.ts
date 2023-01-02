import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'its-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  private trigger: Subject<any> = new Subject();
  webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  @Output("image") imgEmitter = new EventEmitter<string>();

  ngOnInit() {

  }
  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public deleteSnapshot(): void {
    this.sysImage = '';
    this.imgEmitter.emit(this.sysImage)
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    this.imgEmitter.emit(this.sysImage)
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}