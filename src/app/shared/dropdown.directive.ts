import { Directive, HostListener, OnInit, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective implements OnInit {
  @HostBinding("class.open") isOpen: boolean = false;

  constructor() {}

  ngOnInit() {
    this.isOpen = false;
  }

  @HostListener("click") onToggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
