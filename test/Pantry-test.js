import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import User from '../src/classes/User'
import usersTestdata from '../src/data/user-data-test';
import ingredientsData from '../src/data/ingredients.js';
import recipeData from '../src/data/recipes';
import Recipe from '../src/classes/Recipe'



describe('Panrty', () => {
  let pantry;
  const users = usersTestdata.map(user => {
    return new User(user.name, user.id, 
      (pantry = new Pantry(user.pantry, ingredientsData)), ingredientsData )
  });

  const recipe = recipeData.map((recipe) => {
    return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags, ingredientsData);
  });

  const findRecipeId = recipe.find(({ id }) => id === id)
  let currentRecipe = findRecipeId;

  
  it('Should be a function', () => {
    expect(Pantry).to.be.a('function')
  });

  it('Should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should be able to hold ingredients', () => {
    expect(users[0].pantry.ingredients).to.deep.equal(
      [
        { ingredient: 11297, amount: 4 },
        { ingredient: 1082047, amount: 10 },
        { ingredient: 20081, amount: 5 },
        { ingredient: 11215, amount: 5 },
        { ingredient: 2047, amount: 6 },
        { ingredient: 1123, amount: 8 },
        { ingredient: 11282, amount: 4 },
        { ingredient: 6172, amount: 2 },
        { ingredient: 2044, amount: 2 },
        { ingredient: 2050, amount: 4 },
        { ingredient: 1032009, amount: 3 },
        { ingredient: 5114, amount: 3 },
        { ingredient: 1017, amount: 2 },
        { ingredient: 18371, amount: 7 },
        { ingredient: 1001, amount: 6 },
        { ingredient: 99223, amount: 2 },
        { ingredient: 1230, amount: 2 },
        { ingredient: 9152, amount: 4 },
        { ingredient: 10611282, amount: 2 },
        { ingredient: 93607, amount: 2 },
        { ingredient: 14106, amount: 4 },
        { ingredient: 1077, amount: 4 },
        { ingredient: 6150, amount: 2 },
        { ingredient: 1124, amount: 2 },
        { ingredient: 10011693, amount: 4 },
        { ingredient: 1102047, amount: 2 },
        { ingredient: 19206, amount: 2 },
        { ingredient: 1145, amount: 4 },
        { ingredient: 1002030, amount: 4 },
        { ingredient: 12061, amount: 2 },
        { ingredient: 19335, amount: 4 },
        { ingredient: 15152, amount: 3 },
        { ingredient: 9003, amount: 2 },
        { ingredient: 18372, amount: 3 },
        { ingredient: 2027, amount: 2 }
      ]);
  })

  it('Should hold the ingredients data', () => {
    expect(users[0].pantry.ingredientsData).to.deep.equal([
      { id: 20081, name: 'wheat flour', estimatedCostInCents: 142 },
      { id: 18372, name: 'bicarbonate of soda', estimatedCostInCents: 582 },
      { id: 1123, name: 'eggs', estimatedCostInCents: 472 },
      { id: 19335, name: 'sucrose', estimatedCostInCents: 902 },
      {
        id: 19206,
        name: 'instant vanilla pudding',
        estimatedCostInCents: 660
      },
      { id: 19334, name: 'brown sugar', estimatedCostInCents: 559 },
      { id: 2047, name: 'salt', estimatedCostInCents: 280 }
    ]);
  });

  it('Should be able hold a list of missing, pantry, and recipe ingredients', () => {
    expect(users[0].pantry.listOfPantryIngredients).to.deep.equal([])
    expect(users[0].pantry.listOfMissingIngredients).to.deep.equal([])
    expect(users[0].pantry.listOfRecipeIngredients).to.deep.equal([])

  });

  it('should hold the list of recipe ingredients name and amount ', () => {
    users[0].pantry.listIngredientsNameAndAmount()
    expect(users[0].pantry.listOfPantryIngredients).to.deep.equal([
      { name: 'flat leaf parsley leaves', amount: 4, id: 11297 },
      { name: 'kosher salt', amount: 10, id: 1082047 },
      { name: 'wheat flour', amount: 5, id: 20081 },
      { name: 'whole garlic clove', amount: 5, id: 11215 },
      { name: 'salt', amount: 6, id: 2047 },
      { name: 'eggs', amount: 8, id: 1123 },
      { name: 'onions', amount: 4, id: 11282 },
      { name: 'chicken stock', amount: 2, id: 6172 },
      { name: 'basil', amount: 2, id: 2044 },
      { name: 'vanilla', amount: 4, id: 2050 },
      { name: 'dried red chili', amount: 3, id: 1032009 },
      { name: 'roasted chicken', amount: 3, id: 5114 },
      { name: 'cream cheese', amount: 2, id: 1017 },
      { name: 'baking powder', amount: 7, id: 18371 },
      { name: 'butter', amount: 6, id: 1001 },
      { name: 'canned chipotle chilies in adobo', amount: 2, id: 99223 },
      { name: 'buttermilk', amount: 2, id: 1230 },
      { name: 'lemon juice', amount: 4, id: 9152 },
      { name: 'white onions', amount: 2, id: 10611282 },
      { name: 'almondmilk', amount: 2, id: 93607 },
      { name: 'white wine', amount: 4, id: 14106 },
      { name: 'full-fat milk', amount: 4, id: 1077 },
      { name: 'bar b que sauce', amount: 2, id: 6150 },
      { name: 'egg albumen', amount: 2, id: 1124 },
      { name: 'canned tomato', amount: 4, id: 10011693 },
      { name: 's&p', amount: 2, id: 1102047 },
      { name: 'instant vanilla pudding', amount: 2, id: 19206 },
      { name: 'unsalted butter', amount: 4, id: 1145 },
      { name: 'black pepper', amount: 4, id: 1002030 },
      { name: 'whole almonds', amount: 2, id: 12061 },
      { name: 'sucrose', amount: 4, id: 19335 },
      { name: 'jumbo shrimp', amount: 3, id: 15152 },
      { name: 'apple', amount: 2, id: 9003 },
      { name: 'bicarbonate of soda', amount: 3, id: 18372 },
      { name: 'oregano', amount: 2, id: 2027 }
    ])
  })  
})