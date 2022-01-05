

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags, ingredientsData) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
    this.ingredientsData = ingredientsData;
    this.listOfRecipeIngredients = [];
  }
  listIngredients() {
    const ingredientIds = this.ingredients.map(ingredient => [ingredient.id, ingredient.quantity.amount]);
    
    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return [this.ingredientsData.find( ( { id } ) => id === ingredientId[0]), ingredientId[1]];
    });
    
    const ingredientNames = ingredientDataObjs.map(ingredient => {
      this.listOfRecipeIngredients.push(ingredient[0].name, ingredient[1])
    });
    
    return ingredientNames;
  }

  costOfIngredients() {
    const ingredientAmount = this.ingredients.map(ingredient => ingredient.quantity.amount);

    const ingredientIds = this.ingredients.map(ingredient => ingredient.id);

    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return this.ingredientsData.find( ( { id } ) => id === ingredientId);
    });

    const ingredientCost = ingredientDataObjs.map(ingredient => ingredient.estimatedCostInCents);

    const totalCost = ingredientAmount.reduce( ( acc, amount, i ) => {

      const total = acc + amount * ingredientCost[i];

      return total / 100;

    });

    return totalCost.toFixed(2);
  }


  returnInstructions() {
    const instructions = this.instructions.map(instruction => instruction.instruction);

    return instructions;
        
  }
}

module.exports = Recipe;

