import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { DataStorageService } from "src/app/shared/data-storage.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  selectedRecipeID: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeID = +params["id"];
      this.selectedRecipe = this.recipeService.getRecipe(this.selectedRecipeID);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedRecipe.ingredients.slice()
    );
    this.dataStorageService.saveShoppingList();
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipeID);
    this.router.navigate(["/recipes"]);
    this.dataStorageService.saveRecipes();
  }
}
