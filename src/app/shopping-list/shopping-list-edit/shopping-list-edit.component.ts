import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, AfterContentInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  @Output() newIngredient = new EventEmitter<{name: string, amount: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    
  }

  onAddIngredient() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    
    this.newIngredient.emit({
      name: ingredientName,
      amount: ingredientAmount
    });
  }

}
