import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    for (const ingredient of this.ingredients) {
      if (ingredient.name === newIngredient.name) {
        ingredient.amount += newIngredient.amount;
        return;
      }
    }
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    let indexes = [];
    for (const [index1, newIngredient] of newIngredients.entries()) {
      for (const ingredient of this.ingredients) {
        console.log(index1);
        console.log(newIngredient);
        console.log(ingredient);
        if (newIngredient.name === ingredient.name) {
          indexes.push(+index1);
          ingredient.amount += +newIngredients[index1].amount;
        }
      }
    }

    if (indexes) {
      for (let i = indexes.length - 1; i >= 0; i--) {
        newIngredients.splice(i, 1);
      }
    }

    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredients(ingredientArray: Ingredient[]) {
    if (ingredientArray) {
      this.ingredients = ingredientArray;
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
