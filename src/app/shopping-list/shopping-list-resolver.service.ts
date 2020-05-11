import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import { ShoppingListService } from "./shopping-list.service";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingListResolverService implements Resolve<Ingredient[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Ingredient[] | Observable<Ingredient[]> | Promise<Ingredient[]> {
    if (this.shoppingListService.getIngredients().length === 0) {
      return this.dataStorageService.fetchShoppingList();
    } else {
      return this.shoppingListService.getIngredients();
    }
  }
}
