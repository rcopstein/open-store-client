import {Component, ViewChild, ElementRef, Input} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: './image-frame.component.html',
  styleUrls: ['./image-frame.component.sass'],
  selector: 'app-image-frame',
})
export class ImageFrameComponent {
  @ViewChild('img', {static: false}) image: ElementRef<HTMLImageElement>;
  @Input() external: boolean;
  @Input() src: string;

  get url(): string {
    if (this.external) {
      return environment.server_assets_url + this.src;
    }
    return this.src;
  }

  onLoad() {
    this.image.nativeElement.classList.add('animation');
  }

  constructor() {}
}
