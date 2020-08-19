import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.sass'],
  selector: 'app-loading-button',
})
export class LoadingButtonComponent {
  @Input() loading: boolean = false;
  @Input() enabled: boolean = true;
  @Input() content: string;

  @Output() onPress: EventEmitter<void>;

  handleOnPress() {
    if (this.enabled && !this.loading) {
      this.onPress.emit();
    }
  }

  constructor() {
    this.onPress = new EventEmitter();
  }
}
