import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[app-container]',
})
export class ContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
