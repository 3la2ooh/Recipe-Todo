import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import { RecipeHomeComponent } from "./recipes/recipe-home/recipe-home.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

const appRoutes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      { path: "", component: RecipeHomeComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent,
    children: [{ path: "edit", component: ShoppingListEditComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
