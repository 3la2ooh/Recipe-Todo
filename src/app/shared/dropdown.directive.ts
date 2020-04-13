import { Directive, HostListener, OnInit, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.isOpen = false;
  }

  @HostListener('click') onToggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
