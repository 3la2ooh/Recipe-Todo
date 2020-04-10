import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    collapsed = true;

    @Output() clickedButton = new EventEmitter<string>();

    onSelect(selected: string) {
        this.clickedButton.emit(selected);
    }
}