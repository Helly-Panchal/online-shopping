import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor() { }

  @HostBinding('style.transform') scale = 'scale(1)';
  @HostBinding('style.background-color') background!: string;


  @HostListener('mouseover')
  onMouseOver() {
    this.scale = 'scale(1.05)';
    // this.background = '#dee2ff'
    this.background = '#edf2fb';
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.scale = 'scale(1)';
    this.background = 'white';
  }

}
