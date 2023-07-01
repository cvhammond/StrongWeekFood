// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={ScaffoldLayout} title="ShoppingLists" titleTo="shoppingLists" buttonLabel="New ShoppingList" buttonTo="newShoppingList">
        <Route path="/shopping-lists/new" page={ShoppingListNewShoppingListPage} name="newShoppingList" />
        <Route path="/shopping-lists/{id:Int}/edit" page={ShoppingListEditShoppingListPage} name="editShoppingList" />
        <Route path="/shopping-lists/{id:Int}" page={ShoppingListShoppingListPage} name="shoppingList" />
        <Route path="/shopping-lists" page={ShoppingListShoppingListsPage} name="shoppingLists" />
      </Set>
      <Set wrap={ScaffoldLayout} title="ShoppingListItems" titleTo="shoppingListItems" buttonLabel="New ShoppingListItem" buttonTo="newShoppingListItem">
        <Route path="/shopping-list-items/new" page={ShoppingListItemNewShoppingListItemPage} name="newShoppingListItem" />
        <Route path="/shopping-list-items/{id:Int}/edit" page={ShoppingListItemEditShoppingListItemPage} name="editShoppingListItem" />
        <Route path="/shopping-list-items/{id:Int}" page={ShoppingListItemShoppingListItemPage} name="shoppingListItem" />
        <Route path="/shopping-list-items" page={ShoppingListItemShoppingListItemsPage} name="shoppingListItems" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Ingredients" titleTo="ingredients" buttonLabel="New Ingredient" buttonTo="newIngredient">
        <Route path="/ingredients/new" page={IngredientNewIngredientPage} name="newIngredient" />
        <Route path="/ingredients/{id:Int}/edit" page={IngredientEditIngredientPage} name="editIngredient" />
        <Route path="/ingredients/{id:Int}" page={IngredientIngredientPage} name="ingredient" />
        <Route path="/ingredients" page={IngredientIngredientsPage} name="ingredients" />
      </Set>
      <Set wrap={ScaffoldLayout} title="RecipeIngredients" titleTo="recipeIngredients" buttonLabel="New RecipeIngredient" buttonTo="newRecipeIngredient">
        <Route path="/recipe-ingredients/new" page={RecipeIngredientNewRecipeIngredientPage} name="newRecipeIngredient" />
        <Route path="/recipe-ingredients/{id:Int}/edit" page={RecipeIngredientEditRecipeIngredientPage} name="editRecipeIngredient" />
        <Route path="/recipe-ingredients/{id:Int}" page={RecipeIngredientRecipeIngredientPage} name="recipeIngredient" />
        <Route path="/recipe-ingredients" page={RecipeIngredientRecipeIngredientsPage} name="recipeIngredients" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Recipes" titleTo="recipes" buttonLabel="New Recipe" buttonTo="newRecipe">
        <Route path="/recipes/new" page={RecipeNewRecipePage} name="newRecipe" />
        <Route path="/recipes/{id:Int}/edit" page={RecipeEditRecipePage} name="editRecipe" />
        <Route path="/recipes/{id:Int}" page={RecipeRecipePage} name="recipe" />
        <Route path="/recipes" page={RecipeRecipesPage} name="recipes" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Meals" titleTo="meals" buttonLabel="New Meal" buttonTo="newMeal">
        <Route path="/meals/new" page={MealNewMealPage} name="newMeal" />
        <Route path="/meals/{id:Int}/edit" page={MealEditMealPage} name="editMeal" />
        <Route path="/meals/{id:Int}" page={MealMealPage} name="meal" />
        <Route path="/meals" page={MealMealsPage} name="meals" />
      </Set>
      <Set wrap={ScaffoldLayout} title="MealTypes" titleTo="mealTypes" buttonLabel="New MealType" buttonTo="newMealType">
        <Route path="/meal-types/new" page={MealTypeNewMealTypePage} name="newMealType" />
        <Route path="/meal-types/{id:Int}/edit" page={MealTypeEditMealTypePage} name="editMealType" />
        <Route path="/meal-types/{id:Int}" page={MealTypeMealTypePage} name="mealType" />
        <Route path="/meal-types" page={MealTypeMealTypesPage} name="mealTypes" />
      </Set>
      <Set wrap={ScaffoldLayout} title="" titleTo="" buttonLabel="" buttonTo="">
        <Route path="/shopping-list" page={ShoppingListPage} name="weekShoppingList" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
