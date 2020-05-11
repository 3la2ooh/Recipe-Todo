import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private isLoadingSub: Subscription;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.isLoadingSub = this.dataStorageService.isLoading.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.dataStorageService.fetchRecipes().subscribe();
    this.dataStorageService.fetchShoppingList().subscribe();
  }

  ngOnDestroy() {
    this.isLoadingSub.unsubscribe();
  }
}
