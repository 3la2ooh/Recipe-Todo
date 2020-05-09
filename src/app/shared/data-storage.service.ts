import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  error = new Subject<string>();

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        "https://angular-httprequests-a6588.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error);
        }
      );
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(
        "https://angular-httprequests-a6588.firebaseio.com/recipes.json",
        {
          params: new HttpParams().append("print", "pretty"),
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
          this.recipeService.updateRecipes(recipes);
        })
      );
  }
}
