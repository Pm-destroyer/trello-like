import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Input('elemId') elemId!: string;
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}


  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    const target = document.getElementById(this.elemId);

    if (targetElement.id.split('-')[1] === target?.id.split('-')[1]) {
      return;
    } else {
      this.clickOutside.emit();
    }
  }
}
