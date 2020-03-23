import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "This is simple a test.", "https://upload.wikimedia.org/wikipedia/commons/8/81/Nigella_Lawson%E2%80%99s_red_kidney_bean_dip.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
