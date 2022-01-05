
class Pantry {
  constructor(ingredients, ingredientsData, ) {
    this.ingredients = ingredients;
    this.ingredientsData = ingredientsData;
    this.listOfPantryIngredients = [];
  }

  listIngredients() {
    const ingredientIds = this.ingredients.map(ingredient => [ingredient.ingredient, ingredient.amount]);

    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return [this.ingredientsData.find(({ id }) => id === ingredientId[0]), ingredientId[1]];
    });

    const ingredientNames = ingredientDataObjs.map(ingredient => {
      return this.listOfPantryIngredients.push(ingredient[0].name, ingredient[1])
    });
    return ingredientNames;
  }


  checkPantry() {
    const pantryArray = [].concat.apply([], this.listOfIngredients)

    const checkRecipesToCook = this.recipesToCook.forEach(recipe => {
      console.log('This is the recipe', recipe)
      for (let i = 0; i < recipe.listOfRecipeIngredients.length; i += 2) {
        if (!pantryArray.includes(recipe.listOfRecipeIngredients[i])) {
          this.missingIngredients.push([recipe.listOfRecipeIngredients[i], recipe.listOfRecipeIngredients[i + 1]])
          console.log('It hit')
        }

        for (let j = 0; j < pantryArray.length; j += 2) {
          if (pantryArray[j] === recipe.listOfRecipeIngredients[j] && pantryArray[j + 1] < recipe.listOfRecipeIngredients[i + 1]) {
            this.missingIngredients.push([pantryArray[j], recipe.listOfRecipeIngredients[i + 1] - pantryArray[j + 1], 'I DONT HAVE ENOUGH'])
          }
        }
      }
    })


    console.log(pantryArray, 'List of Pantry Ingredients')
    console.log(this.recipesToCook[0].listOfRecipeIngredients, 'recipe List')
    console.log(this.missingIngredients, 'Missing Ingredients')

  }
}

module.exports = Pantry