import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import { RecipeHomeComponent } from "./recipes/recipe-home/recipe-home.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { ShoppingListResolverService } from "./shopping-list/shopping-list-resolver.service";

const appRoutes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
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
    resolve: [ShoppingListResolverService],
    canActivate: [AuthGuard],
    children: [{ path: "edit", component: ShoppingListEditComponent }],
  },
  { path: "auth", component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
