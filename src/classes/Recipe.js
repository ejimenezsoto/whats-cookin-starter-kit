

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
    this.listOfRecipeIngredients = [];
    const ingredientIds = this.ingredients.map(ingredient => [ingredient.id, ingredient.quantity.amount]);
    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return [this.ingredientsData.find(({ id }) => id === ingredientId[0]), ingredientId[1]];
    });
    const ingredientNames = ingredientDataObjs.map(ingredient => {
      return this.listOfRecipeIngredients.push({ name: ingredient[0].name, amount: ingredient[1], id:ingredient[0].id }) 
    });
  };

  listIngredientsNames()  {
    const ingredientIds = this.ingredients.map(ingredient => ingredient.id);
    const ingredientDataObjs = ingredientIds.map(ingredientId => {
      return this.ingredientsData.find(({ id }) => id === ingredientId);
    });
    const ingredientNames = ingredientDataObjs.map(ingredient => ingredient.name);
    return ingredientNames;
  };

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
  };

  returnInstructions() {
    const instructions = this.instructions.map(instruction => instruction.instruction);
    return instructions;
  };
};

export default Recipe;

