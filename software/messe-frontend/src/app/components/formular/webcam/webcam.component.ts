import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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

  width: number = 368;
  height: number = 208;

  @Output("image") imgEmitter = new EventEmitter<string>();

  ngOnInit() {

  }


  public getSnapshot($event: any): void {
    $event.preventDefault();
    this.trigger.next(void 0);
  }
  public deleteSnapshot($event: any): void {
    $event.preventDefault();
    this.sysImage = '';
    this.imgEmitter.emit(this.sysImage)
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    this.imgEmitter.emit(this.sysImage)
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}
