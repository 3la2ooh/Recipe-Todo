import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slEditForm: NgForm;
  private editSub: Subscription;
  editMode: boolean = false;
  private editingItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSub = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editingItemIndex = index;

        const selectedItem = this.shoppingListService.getIngredient(index);
        this.slEditForm.setValue({
          'name': selectedItem["name"], 
          'amount': selectedItem["amount"]
        });
      }
    );
  }

  onAddIngredient() {
    const ingredientName = this.slEditForm.value.name;
    const ingredientAmount = +this.slEditForm.value.amount;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editingItemIndex, newIngredient);
    }
    this.slEditForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.slEditForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.slEditForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.editSub.unsubscribe();
  }
}
