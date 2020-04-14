import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
            "A Test Recipe", 
            "This is simple a test.", 
            "https://upload.wikimedia.org/wikipedia/commons/8/81/Nigella_Lawson%E2%80%99s_red_kidney_bean_dip.jpg", 
            [{name: "onion", amount: 3}]
        ),
        new Recipe(
            "Another Test Recipe", 
            "This is another simple a test.", 
            "https://upload.wikimedia.org/wikipedia/commons/8/81/Nigella_Lawson%E2%80%99s_red_kidney_bean_dip.jpg",
            [{name: "test ingredient", amount: 3}]
        )
      ];

    getRecipes() {
        return this.recipes.slice();
    }
}