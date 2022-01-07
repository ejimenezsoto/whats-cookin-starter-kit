
class Pantry {
  constructor(ingredients, ingredientsData) {
    this.ingredients = ingredients;
    this.ingredientsData = ingredientsData;
    this.listOfPantryIngredients = [];
    this.listOfMissingIngredients = [];
  }

  listIngredientsNameAndAmount() {
    const ingredientIds = this.ingredients.map(ingredient => [ingredient.ingredient, ingredient.amount]);

    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return [this.ingredientsData.find(({ id }) => id === ingredientId[0]), ingredientId[1]];
    });
    const ingredientNames = ingredientDataObjs.map(ingredient => {
      return this.listOfPantryIngredients.push({name: ingredient[0].name, amount: ingredient[1], id:ingredient[0].id})
    });
   
  }

  checkPantry(recipeIngredients) { 
    this.listOfMissingIngredients = [];
    const filterThroughPantry = this.listOfPantryIngredients.reduce((acc, ingredient)=> {
      if(!acc[ingredient.name]) {
        acc[ingredient.name] = ingredient.amount
      }
        return acc
    }, {})
    
    const filterRecipes = recipeIngredients.reduce((acc, recipe) => {
      if(!acc[recipe.name]) {
        acc[recipe.name] = [recipe.amount,recipe.id]
        
      }
      return acc
    }, {})
    console.log(filterRecipes,'filter recipes')

    const pantryKeys = Object.keys(filterThroughPantry);
    const recipeKeys = Object.keys(filterRecipes);

    recipeKeys.forEach(recipeIngredient => {
      if(!pantryKeys.includes(recipeIngredient)){
        this.listOfMissingIngredients.push({name: recipeIngredient,amount:filterRecipes[recipeIngredient]})
      } 
      pantryKeys.forEach(pantryIngredient => {
        if(recipeIngredient === pantryIngredient && filterThroughPantry[pantryIngredient] < filterRecipes[recipeIngredient]){
          console.log('NOPT ENOUGH')
          this.listOfMissingIngredients.push({name: recipeIngredient,amount: filterRecipes[recipeIngredient] -  filterThroughPantry[pantryIngredient]})
        }
      })
    })
    console.log(this.listOfMissingIngredients,'MISSING INGREDIENTS')
    return this.listOfMissingIngredients
  }

  addMissingIngredients(){

    this.listOfMissingIngredients.forEach(ingredient => {

    })

    let url = 'http://localhost:3001/api/v1/users';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify
    })
  }

  cookRecipe(){
    
  }
}


module.exports = Pantry