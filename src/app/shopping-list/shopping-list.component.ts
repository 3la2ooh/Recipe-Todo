import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingSub: Subscription;
  private isLoadingSub: Subscription;
  isLoading: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.dataStorageService.fetchShoppingList().subscribe();

    this.isLoadingSub = this.dataStorageService.isLoading.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );

    this.ingSub = this.shoppingListService.ingredientsChanged.subscribe(
      (newIngredientsArray: Ingredient[]) => {
        this.ingredients = newIngredientsArray;
      }
    );
  }

  ngOnDestroy() {
    this.ingSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }

  onLoadElement(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
