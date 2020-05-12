import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { ShoppingListResolverService } from "./shopping-list/shopping-list-resolver.service";

const appRoutes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then((module) => module.RecipesModule),
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
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
