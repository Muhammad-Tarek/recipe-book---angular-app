import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'this is a Test',
  //     'https://assets.epicurious.com/photos/5c93ede3e6249a2fe87f23c2/16:9/w_1600%2Cc_limit/Grilled-Marinated-Leg-of-Lamb-118032019.jpg',
  //     [new Ingredient('Meat', 2), new Ingredient('Buns', 3)]
  //   ),
  //   new Recipe(
  //     'Another Test Recipe',
  //     'this is a Test',
  //     'http://images.summitmedia-digital.com/yummyph/images/2016/09/22/Morcon640.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('tomatoes', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}
