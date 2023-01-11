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


  /**
   * Gets the current image of the media stream provided in the ngx-webcam library
   */
  public getSnapshot($event: any): void {
    $event.preventDefault();
    this.trigger.next(void 0);
  }
  /**
   * Removes the taken image and resets the webcam preview
   * 
   */
  public deleteSnapshot($event: any): void {
    $event.preventDefault();
    this.sysImage = '';
    this.imgEmitter.emit(this.sysImage)
  }

  /**
   * Saves the Snapshot and transfers it to parent component as base64
   * 
   */
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
