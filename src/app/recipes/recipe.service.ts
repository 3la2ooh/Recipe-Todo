import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipes(recipeArray: Recipe[]) {
    this.recipes = recipeArray;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(newIngredients: Ingredient[]) {
    this.shoppingListService.addIngredients(newIngredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
