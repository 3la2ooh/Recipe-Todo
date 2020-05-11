import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  error = new Subject<string>();
  isLoading = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.isLoading.next(true);
    this.http
      .put<Recipe[]>(
        "https://angular-httprequests-a6588.firebaseio.com/" +
          JSON.parse(localStorage.getItem("userData")).id +
          "/recipes.json",
        recipes
      )
      .subscribe(
        (responseData) => {
          this.isLoading.next(false);
          console.log(responseData);
        },
        (error) => {
          this.isLoading.next(false);
          this.error.next(error);
        }
      );
  }

  fetchRecipes() {
    this.isLoading.next(true);
    return this.http
      .get<Recipe[]>(
        "https://angular-httprequests-a6588.firebaseio.com/" +
          JSON.parse(localStorage.getItem("userData")).id +
          "/recipes.json",
        {
          params: new HttpParams().set("print", "pretty"),
        }
      )
      .pipe(
        map(
          (recipes) => {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          },
          catchError((errorResponse) => {
            // Send to Analytics
            return throwError(errorResponse);
          })
        ),
        tap((recipes) => {
          this.isLoading.next(false);
          this.recipeService.updateRecipes(recipes);
        })
      );
  }

  saveShoppingList() {
    this.isLoading.next(true);
    const shoppingList = this.shoppingListService.getIngredients();
    this.http
      .put<Ingredient[]>(
        "https://angular-httprequests-a6588.firebaseio.com/" +
          JSON.parse(localStorage.getItem("userData")).id +
          "/shoppingList.json",
        shoppingList
      )
      .subscribe(
        (responseData) => {
          this.isLoading.next(false);
          console.log(responseData);
        },
        (error) => {
          this.error.next(error);
        }
      );
  }

  fetchShoppingList() {
    this.isLoading.next(true);
    return this.http
      .get<Ingredient[]>(
        "https://angular-httprequests-a6588.firebaseio.com/" +
          JSON.parse(localStorage.getItem("userData")).id +
          "/shoppingList.json",
        {
          params: new HttpParams().set("print", "pretty"),
        }
      )
      .pipe(
        map(
          (ingredients) => {
            return ingredients;
          },
          catchError((errorResponse) => {
            // Send to Analytics
            return throwError(errorResponse);
          })
        ),
        tap((ingredients) => {
          this.isLoading.next(false);
          this.shoppingListService.updateIngredients(ingredients);
        })
      );
  }
}
