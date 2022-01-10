class Pantry {
  constructor(ingredients, ingredientsData) {
    this.ingredients = ingredients;
    this.ingredientsData = ingredientsData;
    this.listOfPantryIngredients = [];
    this.listOfMissingIngredients = [];
    this.listOfRecipeIngredients = [];
  }

  listIngredientsNameAndAmount() {
    this.listOfPantryIngredients = [];
    const ingredientIds = this.ingredients.map(ingredient => [ingredient.ingredient, ingredient.amount]);
    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return [this.ingredientsData.find(({ id }) => id === ingredientId[0]), ingredientId[1]]
    });
    
    const ingredientNames = ingredientDataObjs.map(ingredient => {
      return this.listOfPantryIngredients.push({name: ingredient[0].name, amount: ingredient[1], id:ingredient[0].id})
    });

  }

  checkPantry(recipeIngredients) { 
    this.listOfMissingIngredients = [];
    this.listOfRecipeIngredients = recipeIngredients
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
          this.listOfMissingIngredients.push({name: recipeIngredient,amount: filterRecipes[recipeIngredient] -  filterThroughPantry[pantryIngredient],id:filterThroughPantry[pantryIngredient.id]})
        }
      })
    })
    console.log(this.listOfRecipeIngredients,'RECIPE INGRE')
    return this.listOfMissingIngredients
  }

  addMissingIngredients(currentUser) {
    this.listOfMissingIngredients.forEach(ingredient => {
      let ingredientData = {"userID": currentUser.id,
                            "ingredientID": ingredient.amount[1],
                            "ingredientModification": ingredient.amount[0]
                            }
      fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(ingredientData),
        headers: {
                'Content-Type': 'application/json'
        }
      })
        .then(response => console.log(response.json()))
        .catch(err => console.log(err))
    })
    this.getNewIngredients(currentUser)
  }

  getNewIngredients(currentUser){
    const userData =
      fetch('http://localhost:3001/api/v1/users')
        .then(response => response.json());
    Promise.all([userData])
      .then(data => {
        let users = data[0]
        users.forEach(user => {
          if(user.id === currentUser.id){
            currentUser.pantry.ingredients = user.pantry
          }
        })
        this.listIngredientsNameAndAmount()
      })
  }

  cookRecipe(currentUser){
    this.listOfRecipeIngredients.forEach(ingredient => {
      ingredient.amount *= -1
      let ingredientData = {"userID": currentUser.id,
                            "ingredientID": ingredient.id,
                            "ingredientModification": ingredient.amount
                            }
                            console.log(ingredientData)
      fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(ingredientData),
        headers: {
                'Content-Type': 'application/json'
        }
      })
        .then(response => console.log(response.json()))
        .catch(err => console.log(err))
    })
    this.getNewIngredients(currentUser)
    console.log(this.listOfPantryIngredients,'AFTER')
  }
};



export default Pantry